import BaseDAO from './BaseDAO.js';
import Fornecedor from '../models/Fornecedor.js';
import MetodoPagamento from '../models/MetodoPagamento.js';
import { transaction, query, execute } from '../infra/database.js';

class FornecedorDAO extends BaseDAO {
    constructor() {
        super("fornecedores");
    }

    static getInstance() {
      return BaseDAO.getInstance(FornecedorDAO);
    }    

    mapRowToEntity(row) {
        return new Fornecedor(
            row.id, 
            row.cnpj, 
            row.razao_social, 
            row.telefone, 
            row.email, 
            row.endereco, 
            row.inscricao_estadual, 
            row.representante, 
            row.ativo, 
            row.data_criacao, 
            row.data_alteracao
        );
    }

    mapRowToEntityMetodoPagamento(row) {
        return new MetodoPagamento(
            row.id, 
            row.fornecedor_id, 
            row.tipo_pagamento, 
            row.prazo, 
            row.parcela_maxima, 
            row.chave_pix, 
            row.tipo_desconto, 
            row.data_criacao, 
            row.data_alteracao
        );
    }

    async buscarPorId(id) {
        const [row] = await query(`SELECT * FROM fornecedores WHERE id = ?`, [id]);
        if (!row) return null;

        const fornecedor = this.mapRowToEntity(row);
        // Buscar métodos de pagamento
        const metodos = await query(`SELECT * FROM metodos_pagamentos WHERE fornecedor_id = ?`, [id]);
        metodos.forEach(item => fornecedor.metodosPagamento.push(this.mapRowToEntityMetodoPagamento(item)));

        // Buscar gêneros
        const generos = await query(`SELECT genero_id FROM fornecedores_generos WHERE fornecedor_id = ?`, [id]);
        fornecedor.definirGeneros(generos.map(g => g.genero_id));

        return fornecedor;
    }

    async buscarPorCnpj(cnpj){
        const [row]  = await query(`SELECT * FROM fornecedores WHERE cnpj = ?`, [cnpj]);
        return row ? this.mapRowToEntity(row) : null;
    }

    async inserir(fornecedor) {
        if (!(fornecedor instanceof Fornecedor)) throw new Error("Instância de modelo inválida.");

        await transaction(async (conn) => {
            // Inserir fornecedor
            await super.inserir(fornecedor, conn, ['id', 'metodosPagamento', 'generos']);
        
            // Inserir métodos de pagamento
            for (const metodo of fornecedor.metodosPagamento) {
                const result = await execute(`
                    INSERT INTO metodos_pagamentos 
                        (fornecedor_id, tipo_pagamento, prazo, parcela_maxima, chave_pix, tipo_desconto, data_criacao, data_alteracao) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                    [
                        fornecedor.id, metodo.tipoPagamento, metodo.prazo,  metodo.parcelaMaxima,  metodo.chavePix,  metodo.tipoDesconto,  
                        metodo.dataCriacao,  metodo.dataAlteracao
                    ],
                    conn
                );
                metodo.setIdFromDB(result.insertId);
            };

            // Inserir gêneros
            for (const generoId of fornecedor.generos) {
                await execute(
                    'INSERT INTO fornecedores_generos (fornecedor_id, genero_id) VALUES (?, ?)',
                    [fornecedor.id, generoId],
                    conn
                );
            }
        });

        return fornecedor;
    }

    async atualizar(fornecedor) {
        if (!(fornecedor instanceof Fornecedor)) throw new Error("Instância inválida.");

        await transaction(async (conn) => {
            // Atualiza o fornecedor
            await super.atualizar(fornecedor, conn, ['dataCriacao', 'metodosPagamento', 'generos']);

            // Buscar os IDs dos métodos de pagamento existentes no banco
            const rows = await query('SELECT id FROM metodos_pagamentos WHERE fornecedor_id = ?', [fornecedor.id], conn);
            // Extrai os IDs existentes no banco
            const metodosExistentesIds = rows.map(row => row.id);
            // Extrai os IDs dos métodos recebidos no objeto fornecedor
            const metodosFornecedorIds = fornecedor.metodosPagamento.filter(m => m.id).map(m => m.id);

            // Filtra os IDs que existem no banco, mas não no fornecedor
            const metodosParaRemover = metodosExistentesIds.filter(id => !metodosFornecedorIds.includes(id));
            if (metodosParaRemover.length > 0) {
                const placeholders = metodosParaRemover.map(() => '?').join(', ');
                await execute(
                  `DELETE FROM metodos_pagamentos WHERE id IN (${placeholders})`,
                  metodosParaRemover,
                  conn
                );
            }

            // Inserir novos métodos de pagamento (sem ID)
            for (const metodo of fornecedor.metodosPagamento.filter(m => !m.id)) {
                const result = await execute(`
                    INSERT INTO metodos_pagamentos 
                        (fornecedor_id, tipo_pagamento, prazo, parcela_maxima, chave_pix, tipo_desconto, data_criacao, data_alteracao) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                    [
                        fornecedor.id, metodo.tipoPagamento, metodo.prazo,  metodo.parcelaMaxima,  metodo.chavePix,  metodo.tipoDesconto,  
                        metodo.dataCriacao,  metodo.dataAlteracao
                    ],
                    conn
                );
                metodo.setIdFromDB(result.insertId);
            }            

            // Atualiza os metodos pagamentos
            for (const metodo of fornecedor.metodosPagamento.filter(m => m.id)) {
                await execute(`
                    UPDATE  metodos_pagamentos 
                        SET tipo_pagamento = ?, prazo = ?, parcela_maxima = ?, chave_pix = ?, tipo_desconto = ?, data_alteracao = ?
                    WHERE  id = ?`,
                    [
                        metodo.tipoPagamento, metodo.prazo,  metodo.parcelaMaxima,  metodo.chavePix,  metodo.tipoDesconto,  
                        metodo.dataAlteracao, metodo.id
                    ],
                    conn
                );
            }

            // Limpar e inserir gêneros novamente
            await execute('DELETE FROM fornecedores_generos WHERE fornecedor_id = ?', [fornecedor.id], conn);

            if (fornecedor.generos.length > 0) {
                const placeholders = fornecedor.generos.map(() => `(?, ?)`).join(', ');
                const values = fornecedor.generos.flatMap(generoId => [fornecedor.id, generoId]);
            
                const sql = `INSERT INTO fornecedores_generos (fornecedor_id, genero_id) VALUES ${placeholders}`;
                await execute(sql, values, conn);
            }
        });

        return fornecedor;
    }

    async atualizarAtivo(fornecedor) {
        if (!(fornecedor instanceof Fornecedor)) throw new Error("Instância inválida.");

        return super.atualizar(fornecedor);
    }

    async buscarMetodosPagamentoComCompra(fornecedorId){
        const rows = await query(`
            SELECT DISTINCT 
                mp.*
            FROM metodos_pagamentos mp
                JOIN compras c ON c.metodo_pagamento_id = mp.id
            WHERE mp.fornecedor_id = ?`,
            [fornecedorId]
        );
        return rows.map(row => this.mapRowToEntityMetodoPagamento(row));
    }
}

export default FornecedorDAO.getInstance();