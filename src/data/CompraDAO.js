import BaseDAO from './BaseDAO.js';
import { query } from '../infra/database.js';
import { camelToSnake } from '../utils/stringUtils.js';
import Compra from '../models/Compra.js';
import Fornecedor from '../models/Fornecedor.js';
import MetodoPagamento from '../models/MetodoPagamento.js';

class CompraDAO extends BaseDAO {
    constructor() {
        super("compras"); // Nome da tabela
    }

    static getInstance() {
      return BaseDAO.getInstance(CompraDAO);
    }

    mapRowToEntity(row) {
        return new Compra(
            row.id, 
            row.fornecedor_id, 
            row.metodo_pagamento_id, 
            row.tipo_produto, 
            row.numero_empenho, 
            row.status, 
            row.data_criacao, 
            row.data_alteracao,
            new Fornecedor(row.fornecedor_id, row.cnpj, row.razao_social),
            new MetodoPagamento(row.metodo_pagamento_id, row.fornecedor_id, row.tipo_pagamento)
        );
    } 

     async buscarPorFiltro(filtro = {}) {
        let sql = `
            SELECT 
                c.*,
                f.cnpj,
                f.razao_social,
                mp.tipo_pagamento
            FROM ${this.tabela} c
            INNER JOIN fornecedores f ON f.id = c.fornecedor_id
            INNER JOIN metodos_pagamentos mp ON mp.id = c.metodo_pagamento_id`;

        const valores = [];
    
        const condicoes = [];
    
        for (const [campoCamel, config] of Object.entries(filtro)) {
            const campo = camelToSnake(campoCamel);
            const { valor, like = false } = 
                (typeof config === 'object' && config !== null)
                ? config
                : { valor: config };
    
            condicoes.push(`${campo} ${like ? 'LIKE' : '='} ?`);
            valores.push(like ? `%${valor}%` : valor);
        }
    
        if (condicoes.length > 0) {
            sql += ` WHERE ${condicoes.join(' AND ')}`;
        }
    
        const rows = await query(sql, valores);
        return rows.map(row => this.mapRowToEntity(row));
    }
}

// Exporta instância padrão
export default CompraDAO.getInstance();