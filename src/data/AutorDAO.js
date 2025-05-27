import BaseDAO from './BaseDAO.js';
import Autor from '../models/Autor.js';

class AutorDAO extends BaseDAO {
    constructor() {
        super("autores");
    }

    static getInstance() {
      return BaseDAO.getInstance(AutorDAO);
    }    

    mapRowToEntity(row) {
        return new Autor(row.id, row.nome, row.nacionalidade, row.data_nascimento, row.biografia, row.ativo, row.data_criacao, row.data_alteracao);
    }     
}

export default AutorDAO.getInstance();