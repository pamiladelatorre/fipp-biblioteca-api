import BaseDAO from './BaseDAO.js';
import { query } from '../infra/database.js';
import { camelToSnake } from '../utils/stringUtils.js';
import Exemplar from '../models/Exemplar.js';
import Acervo from '../models/Acervo.js';

class ExemplarDAO  extends BaseDAO {
    constructor() {
        super("exemplares");
    }

    static getInstance() {
      return BaseDAO.getInstance(ExemplarDAO);
    }    

    mapRowToEntity(row) {
        return new Exemplar(
            row.id, 
            row.entrada_acervo_id, 
            row.acervo_id, 
            row.tombo,
            row.status,
            row.estado,
            row.data_criacao, 
            row.data_alteracao,
            new Acervo(row.acervo_id, undefined, undefined, undefined, row.titulo)
        );
    }

    async listarParaRelatorio() {
  const sql = `
    SELECT 
      e.id,
      e.tombo,
      e.status,
      e.estado,
      a.titulo AS titulo_acervo
    FROM exemplares e
    INNER JOIN acervos a ON a.id = e.acervo_id
  `;
  const rows = await query(sql);
  return rows;
}


    async buscarPorFiltro(filtro = {}) {
        let sql = `
            SELECT 
                e.*,
                a.titulo
            FROM ${this.tabela} e
            INNER JOIN acervos a ON a.id = e.acervo_id`;

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

export default ExemplarDAO.getInstance();