import BaseDAO from "./BaseDAO.js";
import Doador from "../models/Doador.js";

class DoadorDAO extends BaseDAO {
    constructor() {
        super("doadores");
    }   

     static getInstance() {
          return BaseDAO.getInstance(DoadorDAO);
        }    
    

    mapRowToEntity(row) {
        return new Doador(row.id, row.tipo_pessoa, row.nome, row.documento, row.email, row.telefone, row.endereco, row.ativo, row.dataCriacao, row.dataAlteracao);
    }
 

}

export default DoadorDAO.getInstance();