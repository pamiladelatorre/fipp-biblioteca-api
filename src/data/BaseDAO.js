import { query, execute } from '../infra/database.js';
import Entity from '../models/Entity.js';
import { extractEntityDataForDb } from "../utils/extractEntityDataForDb.js";
import { camelToSnake } from '../utils/stringUtils.js';

export default class BaseDAO {
    constructor(tabela) {
        if (new.target === BaseDAO) throw new Error(`Classe abstrata 'BaseDAO' não pode ser instanciada diretamente.`);
        if (!tabela) throw new Error("Nome da tabela é obrigatório.");
        this.tabela = tabela;
    }
  
    async buscarPorId(id) {
        const sql = `SELECT * FROM ${this.tabela} WHERE id = ?`;
        const [row] = await query(sql, [id]);

        return row ? this.mapRowToEntity(row) : null;
    }

    /**
     * @param {Object} filtro - Ex: { nome: { valor: 'joão', like: true }, ativo: { valor: true } }
     */
    async buscarPorFiltro(filtro = {}) {
        let sql = `SELECT * FROM ${this.tabela}`;
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
  
    async inserir(model, conn = null, excluirCampos = ['id']) {
        if (!(model instanceof Entity)) {
            throw new Error("Instância de entidade inválida.");
        }
        

        const dados = extractEntityDataForDb(model, excluirCampos, true);
         console.log('[BaseDAO][inserir] Dados para INSERT:', dados);

        const campos = Object.keys(dados);
        const valores = Object.values(dados);
        const placeholders = campos.map(() => '?').join(', ');

        const sql = `INSERT INTO ${this.tabela} (${campos.join(', ')}) VALUES (${placeholders})`;


        const resultado = await execute(sql, valores, conn);

        if (!resultado.insertId) throw new Error('Falha ao inserir modelo. ID não retornado.');
        
        model.setIdFromDB(resultado.insertId); // Método da modelo
        return model;
    }

    async atualizar(model, conn = null, excluirCampos = ['dataCriacao']) {
        if (!(model instanceof Entity)) {
            throw new Error("Instância de entidade inválida.");
        }

        const dados = extractEntityDataForDb(model, excluirCampos, true);
        
        const { id, ...resto } = dados;
        if (!id) throw new Error("Modelo precisa de ID para atualizar.");

        const campos = Object.keys(resto);
        const valores = Object.values(resto);
        const updates = campos.map(campo => `${campo} = ?`).join(', ');

        const sql = `UPDATE ${this.tabela} SET ${updates} WHERE id = ?`;
        const resultado = await execute(sql, [...valores, id], conn);

        if (resultado.affectedRows === 0) return null;

        return model;
    }
      
    /**
     * Método que deve ser implementado pela subclasse
     */
    mapRowToEntity(_row) {
        throw new Error("A subclasse deve implementar mapRowToEntity(row).");
    }

    // Suporte para singleton por subclasse
    static #instances = new Map();

    static getInstance(Subclass) {
        if (!this.#instances.has(Subclass)) {
        this.#instances.set(Subclass, new Subclass());
        }
        return this.#instances.get(Subclass);
    }    
}
  