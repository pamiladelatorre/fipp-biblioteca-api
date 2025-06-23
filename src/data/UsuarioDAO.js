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

async buscarPorFiltro(filtros) {
  let sql = `SELECT id, cpf, nome, data_nascimento, telefone, email, tipo_usuario, bloqueado, ativo FROM usuarios WHERE 1=1`;
  const params = [];

  if (filtros.nome) {
    sql += ` AND nome LIKE ?`;
    params.push(`%${filtros.nome}%`);
  }

  if (filtros.cpf) {
    sql += ` AND cpf = ?`;
    params.push(filtros.cpf);
  }

  if (filtros.email) {
    sql += ` AND email LIKE ?`;
    params.push(`%${filtros.email}%`);
  }

  if (filtros.tipoUsuario) {  // note aqui a propriedade: tipoUsuario
    sql += ` AND tipo_usuario = ?`;
    params.push(filtros.tipoUsuario);
  }

  if (typeof filtros.bloqueado !== 'undefined' && filtros.bloqueado !== '') {
    sql += ` AND bloqueado = ?`;
    params.push(filtros.bloqueado);
  }

  if (typeof filtros.ativo !== 'undefined' && filtros.ativo !== '') {
    sql += ` AND ativo = ?`;
    params.push(filtros.ativo);
  }

  const rows = await query(sql, params);
  return rows;
}




}

export default UsuarioDAO.getInstance();
