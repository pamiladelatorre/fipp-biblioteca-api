import BaseDAO from './BaseDAO.js';
import { query } from '../infra/database.js';
import { camelToSnake } from '../utils/stringUtils.js';
import MovimetacaoExemplar from '../models/MovimetacaoExemplar.js';
import Exemplar from '../models/Exemplar.js'
import Acervo from '../models/Acervo.js'
import Usuario from '../models/Usuario.js'

class MovimetacaoExemplarDAO extends BaseDAO {
    constructor() {
        super("movimentacoes_exemplares"); // Nome da tabela
    }

    static getInstance() {
      return BaseDAO.getInstance(MovimetacaoExemplarDAO);
    }    

    mapRowToEntity(row) {
        return new MovimetacaoExemplar(
            row.id, 
            row.exemplar_id, 
            row.usuario_id, 
            row.etapa, 
            row.status,
            row.grupo_id, 
            row.referencia_id, 
            row.data_inicio, 
            row.data_prevista, 
            row.data_fim,
            row.numero_renovacao,
            row.data_criacao,
            row.data_alteracao,
            new Exemplar(
                row.exemplar_id, 
                undefined, 
                row.acervo_id, 
                row.tombo, 
                undefined, 
                undefined, 
                undefined, 
                undefined, 
                new Acervo(row.acervo_id, undefined, undefined, undefined, row.titulo)
            ),
            new Usuario(row.usuario_id, undefined, row.nome)
        );
    }

    async buscarPorFiltro(filtro = {}) {
        let sql = `
            SELECT 
                me.*,
                u.nome,
                e.tombo,
                e.acervo_id,
                a.titulo 
            FROM ${this.tabela} me
            INNER JOIN usuarios u ON u.id = me.usuario_id
            INNER JOIN exemplares e ON e.id = me.exemplar_id
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

// Exporta instância padrão
export default MovimetacaoExemplarDAO.getInstance();