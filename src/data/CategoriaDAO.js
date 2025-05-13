import BaseDAO from './BaseDAO.js';
import Categoria from '../models/Categoria.js';

class CategoriaDAO extends BaseDAO {
    constructor() {
        super("categorias"); // Nome da tabela
    }

    static getInstance() {
      return BaseDAO.getInstance(CategoriaDAO);
    }    

    mapRowToEntity(row) {
        return new Categoria(row.id, row.descricao, row.ativo, row.data_criacao, row.data_alteracao);
    }    
}

// Exporta instância padrão
export default CategoriaDAO.getInstance();
