import BaseDAO from './BaseDAO.js';
import Categoria from '../models/Categoria.js';

class CategoriaDAO extends BaseDAO {
    constructor() {
        if (CategoriaDAO.#instance) return CategoriaDAO.#instance; // Singleton interno: impede múltiplas instâncias mesmo com "new"
        super("categorias"); // Passando nome da tabela para o construtor do BaseDAO
        CategoriaDAO.#instance = this; // Armazena a instância
    }

    static #instance;

    static getInstance() {
      return BaseDAO.getInstance(CategoriaDAO);
    }    

    mapRowToEntity(row) {
        return new Categoria(row.id, row.descricao, row.ativo, row.data_criacao, row.data_alteracao);
    }    
}

// Exporta instância padrão
export default CategoriaDAO.getInstance();
