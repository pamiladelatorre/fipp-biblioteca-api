import BaseDAO from './BaseDAO.js';
import Genero from '../models/Genero.js';

class GeneroDAO  extends BaseDAO {
    constructor() {
        super("generos");
    }

    static getInstance() {
      return BaseDAO.getInstance(GeneroDAO);
    }    

    mapRowToEntity(row) {
        return new Genero(row.id, row.descricao, row.ativo, row.data_criacao, row.data_alteracao);
    }
}

export default GeneroDAO.getInstance();