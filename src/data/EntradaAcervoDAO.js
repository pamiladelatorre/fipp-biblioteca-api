import BaseDAO from './BaseDAO.js';
import { query } from '../infra/database.js';
import { camelToSnake } from '../utils/stringUtils.js';
import EntradaAcervo from '../models/EntradaAcervo.js';
import Acervo from '../models/Acervo.js';
import Assinatura from '../models/Assinatura.js';
import Compra from '../models/Compra.js';
import Doador from '../models/Doador.js';

class EntradaAcervoDAO extends BaseDAO {
    constructor() {
        super("entradas_acervos"); // Nome da tabela
    }

    static getInstance() {
      return BaseDAO.getInstance(EntradaAcervoDAO);
    }
    
    mapRowToEntity(row) {
        return new EntradaAcervo(
            row.id, 
            row.acervo_id, 
            row.tipo_origem, 
            row.origem_id, 
            row.quantidade, 
            row.data_entrada, 
            row.data_criacao, 
            row.data_alteracao,
            new Acervo(row.acervo_id, undefined, undefined, undefined, row.titulo),
            this.#mapRowToEntityOrigem(row)
        );
    } 

     async buscarPorFiltro(filtro = {}) {
        let sql = `
            SELECT 
                ea.*,
                a.titulo,
                ass.numero_contrato,
                c.numero_empenho,
                d.nome
            FROM ${this.tabela} ea
            INNER JOIN acervos a ON a.id = ea.acervo_id
            LEFT JOIN assinaturas ass ON ass.id = ea.origem_id AND ea.tipo_origem = 'assinatura'
            LEFT JOIN compras c ON c.id = ea.origem_id AND ea.tipo_origem = 'compra'
            LEFT JOIN doadores d ON d.id = ea.origem_id AND ea.tipo_origem = 'doacao'`;

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

    #mapRowToEntityOrigem(row){
        const map = {
            assinatura: () => new Assinatura(row.origem_id, undefined, row.numero_contrato),
            compra: () => new Compra(row.origem_id, undefined, undefined, undefined, row.numero_empenho),
            doacao: () => new Doador(row.origem_id, undefined, row.nome)
        }

          const factory = map[row.tipo_origem];
  
        if (!factory) {
            console.warn(`Tipo de origem desconhecido: ${row.tipo_origem}`);
            return undefined;
        }

        return factory();
    }
}

// Exporta instância padrão
export default EntradaAcervoDAO.getInstance();