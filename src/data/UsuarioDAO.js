import BaseDAO from './BaseDAO.js';
import Usuario from '../models/Usuario.js';
import { query } from '../infra/database.js';

class UsuarioDAO extends BaseDAO {
    constructor() {
        super("usuarios");
    }

    static getInstance() {
      return BaseDAO.getInstance(UsuarioDAO);
    } 

    mapRowToEntity(row) {
        return new Usuario(
            row.id, 
            row.cpf, 
            row.nome, 
            row.data_nascimento, 
            row.telefone, 
            row.email, 
            row.senha, 
            row.cep, 
            row.endereco, 
            row.tipo_usuario, 
            row.bloqueado, 
            row.ativo, 
            row.primeiro_acesso,
            row.data_criacao, 
            row.data_alteracao
        );
    }

    // Buscar um usuário pelo CPF
    async buscarPorCpf(cpf) {
        const [row] = await query('SELECT * FROM usuarios WHERE cpf = ?', [cpf]);

        return row ? this.mapRowToEntity(row) : null
    }

    // Buscar um usuário pelo E-mail
    async buscarPorEmail(email) {
        const [row] = await query('SELECT * FROM usuarios WHERE email = ?', [email]);

        return row ? this.mapRowToEntity(row) : null
    }

async buscarTodos() {
  const rows = await query('SELECT id, cpf, nome, data_nascimento, telefone, email, tipo_usuario, bloqueado, ativo FROM usuarios');
  return rows;
}


}

export default UsuarioDAO.getInstance();
