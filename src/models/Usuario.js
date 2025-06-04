import Entity from "./Entity.js";
import { toJSONFromGetters } from "../utils/toJSONFromGetters.js";

class Usuario extends Entity {
  #cpf;
  #nome;
  #dataNascimento;
  #telefone;
  #email;
  #senha;
  #cep;
  #endereco;
  #tipoUsuario;
  #bloqueado;
  #ativo;
  #primeiroAcesso;

  constructor(
    id, 
    cpf, 
    nome, 
    dataNascimento, 
    telefone,
    email, 
    senha, 
    cep, 
    endereco, 
    tipoUsuario, 
    bloqueado, 
    ativo, 
    primeiroAcesso, 
    dataCriacao, 
    dataAlteracao
  ) {
    if (new.target !== Usuario) {
        throw new Error(`Use ${this.constructor.name}.criar()`);
    }
    super(id, dataCriacao, dataAlteracao);        
    this.#cpf = cpf;
    this.#nome = nome;
    this.#dataNascimento = dataNascimento;
    this.#telefone = telefone;
    this.#email = email;
    this.#senha = senha;
    this.#cep = cep;
    this.#endereco = endereco;
    this.#tipoUsuario = tipoUsuario;
    this.#bloqueado = bloqueado;
    this.#ativo = ativo;
    this.#primeiroAcesso = primeiroAcesso;
  }

  // Getters
  get cpf() { return this.#cpf; }
  get nome() { return this.#nome; }
  get dataNascimento() { return this.#dataNascimento; }
  get telefone() { return this.#telefone; }
  get email() { return this.#email; }
  get senha() { return this.#senha; }
  get cep() { return this.#cep; }
  get endereco() { return this.#endereco; }
  get tipoUsuario() { return this.#tipoUsuario; }
  get bloqueado() { return this.#bloqueado; }
  get ativo() { return this.#ativo; }
  get primeiroAcesso() { return this.#primeiroAcesso; }

  // Alteração dos dados
  alterar({ cpf, nome, dataNascimento, telefone, email, cep, endereco, tipoUsuario }) {
    this.#cpf = cpf;
    this.#nome = nome;
    this.#dataNascimento = dataNascimento.split('T')[0];
    this.#telefone = telefone;
    this.#email = email;
    this.#cep = cep;
    this.#endereco = endereco;
    this.#tipoUsuario = tipoUsuario;
    this.dataAlteracao = new Date();
  }

  // Alteração do status bloqueado
  alterarBloqueado(bloqueado) {
    this.#bloqueado = bloqueado;
    this.dataAlteracao = new Date();
  }

  // Alteração do status ativo
  alterarAtivo(ativo) {
    this.#ativo = ativo;
    this.dataAlteracao = new Date();
  }
  
  // Fábrica para criação
  static criar({ cpf, nome, dataNascimento, telefone, email, senha, cep, endereco, tipoUsuario }) {
    return new Usuario(null, cpf, nome, dataNascimento.split('T')[0], telefone, email, senha, cep, endereco, tipoUsuario, false, true, true, new Date(), null);
  }

  toJSON() {
    return toJSONFromGetters(this, ['senha']);
  }
}

export default Usuario;
