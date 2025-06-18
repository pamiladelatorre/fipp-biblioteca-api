import BaseDAO from './BaseDAO.js';
import { query } from '../infra/database.js';
import { camelToSnake } from '../utils/stringUtils.js';
import Infracao from '../models/Infracao.js';
import Usuario from '../models/Usuario.js';

class InfracaoDAO extends BaseDAO {
    constructor() {
        super("infracoes"); // Nome da tabela
    }

    static getInstance() {
      return BaseDAO.getInstance(InfracaoDAO);
    }

    mapRowToEntity(row) {
        return new Infracao(
            row.id, 
            row.usuario_id, 
            row.tipo_infracao, 
            row.grau_infracao, 
            row.status, 
            row.motivo, 
            row.data_inicio, 
            row.data_fim, 
            row.data_criacao, 
            row.data_alteracao,
            new Usuario(row.usuario_id, undefined, row.nome)
        );
    } 
    async inserir(infracao) {
    const sql = `
        INSERT INTO infracoes (usuario_id, tipo_infracao, grau_infracao, status, motivo, data_inicio, data_fim, data_criacao, data_alteracao) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const valores = [
       infracao.usuarioId,
        infracao.tipoInfracao,
        infracao.grauInfracao,
        infracao.status,
        infracao.motivo,
        new Date(infracao.dataInicio).toISOString().split("T")[0], // Converte antes do INSERT
        infracao.dataFim ? new Date(infracao.dataFim).toISOString().split("T")[0] : null, 
        new Date(),
        null
    ];

    

    return await query(sql, valores);
}

     async buscarPorFiltro(filtro = {}) {
        let sql = `
            SELECT 
                i.*,
                u.nome
            FROM ${this.tabela} i
                INNER JOIN usuarios u ON u.id = i.usuario_id`;

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
export default InfracaoDAO.getInstance();