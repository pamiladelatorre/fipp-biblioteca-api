import BaseDAO from './BaseDAO.js';
import Autor from '../models/Autor.js';

class AutorDAO extends BaseDAO {
    constructor() {
        if (AutorDAO.#instance) return AutorDAO.#instance;
        super("autores");
        AutorDAO.#instance = this;
    }

    static #instance;

    static getInstance() {
      return BaseDAO.getInstance(AutorDAO);
    }    

    mapRowToEntity(row) {
        return new Autor(row.id, row.nome, row.nacionalidade, row.dataNascimento, row.biografia, row.ativo, row.data_criacao, row.data_alteracao);
    }     
}

export default AutorDAO.getInstance();