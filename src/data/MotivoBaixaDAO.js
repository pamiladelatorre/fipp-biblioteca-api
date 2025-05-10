import BaseDAO from './BaseDAO.js';
import MotivoBaixa from '../models/MotivoBaixa.js';

class MotivoBaixaDAO extends BaseDAO  {
    constructor() {
        if (MotivoBaixaDAO.#instance) return MotivoBaixaDAO.#instance;
        super("motivos_baixas");
        MotivoBaixaDAO.#instance = this;
    }

    static #instance;

    static getInstance() {
      return BaseDAO.getInstance(MotivoBaixaDAO);
    }    

    mapRowToEntity(row) {
        return new MotivoBaixa(row.id, row.descricao, row.ativo, row.data_criacao, row.data_alteracao);
    }     
}

export default MotivoBaixaDAO.getInstance();
