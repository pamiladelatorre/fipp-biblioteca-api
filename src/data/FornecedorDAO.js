import BaseDAO from './BaseDAO.js';
import Fornecedor from '../models/Fornecedor.js';
import MetodoPagamento from '../models/MetodoPagamento.js';
import { transaction, query } from '../infra/database.js';

class FornecedorDAO extends BaseDAO {
    constructor() {
        if (FornecedorDAO.#instance) return FornecedorDAO.#instance;
        super("fornecedores");
        FornecedorDAO.#instance = this;
    }

    static #instance;

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
            row.incricao_estadual, 
            row.representante, 
            row.ativo, 
            row.data_criacao, 
            row.data_alteracao
        );
    }

    mapRowToEntityMetodoPagamento(row) {
        return new MetodoPagamento(
            row.id, 
            row.fornecedorId, 
            row.tipo_pagamento, 
            row.prazo, 
            row.tipo_desconto, 
            row.chave_pix, 
            row.banco, 
            row.agencia, 
            row.conta, 
            row.ativo, 
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
        fornecedor.definirMetodosPagamento(metodos.map(m => mapRowToEntityMetodoPagamento(m)));

        // Buscar gêneros
        const generos = await query(`SELECT genero_id FROM fornecedores_generos WHERE fornecedor_id = ?`, [id]);
        fornecedor.definirGenerosIds(generos.map(g => g.genero_id));

        return fornecedor;
    }

    async inserir(fornecedor) {
        if (!(fornecedor instanceof Fornecedor)) throw new Error("Instância de modelo inválida.");

        await transaction(async (conn) => {
            // Inserir fornecedor
            await super.inserir(fornecedor, conn);

            // Inserir métodos de pagamento
            for (const metodo of fornecedor.metodosPagamento) {
                await conn.execute(`
                    INSERT INTO metodos_pagamentos 
                        (fornecedor_id, tipo_pagamento, prazo, tipo_desconto, chave_pix, banco, agencia, conta, data_criacao, data_alteracao) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                    [
                        fornecedor.id, metodo.tipoPagamento, metodo.prazo,  metodo.tipoDesconto,  metodo.chavePix,  metodo.banco,  
                        metodo.agencia, metodo.conta,  metodo.dataCriacao,  metodo.dataAlteracao
                    ]
                );
            };

            // Inserir gêneros
            for (const generoId of fornecedor.generos) {
                await conn.execute(
                    'INSERT INTO fornecedores_generos (fornecedor_id, genero_id) VALUES (?, ?)',
                    [fornecedor.id, generoId]
                );
            }
        });

        return fornecedor;
    }

    async atualizar(fornecedor) {
        if (!(fornecedor instanceof Fornecedor)) throw new Error("Instância inválida.");

        await transaction(async (conn) => {
            // Atualiza o fornecedor
            await super.atualizar(fornecedor, conn);

            // Buscar os IDs dos métodos de pagamento
            const [rows] = await conn.execute('SELECT id FROM metodos_pagamentos WHERE fornecedor_id = ?', [fornecedor.id]);
            // Extrai os IDs existentes no banco
            const metodosExistentesIds = rows.map(row => row.id);
            // Extrai os IDs dos métodos recebidos no objeto fornecedor
            const metodosFornecedorIds = fornecedor.metodosPagamento.map(m => m.id);
            // Filtra os IDs que existem no banco, mas não no fornecedor
            const metodosParaRemover = metodosExistentesIds.filter(id => !metodosFornecedorIds.includes(id));

            // Limpar os métodos de pagamento
            if (metodosParaRemover.length > 0) {
                const placeholders = metodosParaRemover.map(() => '?').join(', ');
                await conn.execute(
                  `DELETE FROM metodos_pagamentos WHERE id IN (${placeholders})`,
                  metodosParaRemover
                );
            }

            // Atualiza os metodos pagamentos
            for (const metodo of fornecedor.metodosPagamento) {
                metodo.setFornecedorId(fornecedor.id);
                await conn.execute(`
                    UPDATE  metodos_pagamentos 
                        SET tipo_pagamento = ?, prazo = ?, tipo_desconto = ?, chave_pix = ?, banco = ?, agencia = ?, conta = ?, 
                            data_alteracao = ? 
                    WHERE  id = ?`,
                    [
                        metodo.tipoPagamento, metodo.prazo,  metodo.tipoDesconto,  metodo.chavePix,  metodo.banco,  
                        metodo.agencia, metodo.conta, metodo.dataAlteracao
                    ]
                );
            }

            // Limpar e inserir gêneros novamente
            await conn.execute('DELETE FROM fornecedores_generos WHERE fornecedor_id = ?', [fornecedor.id]);

            if (fornecedor.generos.length > 0) {
                const placeholders = fornecedor.generos.map(() => `(?, ?)`).join(', ');
                const values = fornecedor.generos.flatMap(generoId => [fornecedor.id, generoId]);
            
                const sql = `INSERT INTO fornecedores_generos (fornecedor_id, genero_id) VALUES ${placeholders}`;
                await conn.execute(sql, values);
            }
        });

        return fornecedor;
    }

    async atualizarAtivo(fornecedor) {
        if (!(fornecedor instanceof Fornecedor)) throw new Error("Instância inválida.");

        return super.atualizar(fornecedor);
    }

    async buscarMetodosPagamentoComCompra(fornecedorId){
        const [row] = await query(`
            SELECT DISTINCT 
                mp.*
            FROM metodos_pagamentos mp
                JOIN comprar c ON c.metodo_pagamento_id = mp.id
            WHERE mp.fornecedor_id = ?`,
            [fornecedorId]
        );
        return row ? this.mapRowToEntityMetodoPagamento(row) : null
    }
}

export default FornecedorDAO.getInstance();