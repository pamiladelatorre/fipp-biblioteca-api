import Entity from "./Entity.js";
import MetodoPagamento from "./MetodoPagamento.js";

class Fornecedor extends Entity {
  #cnpj;
  #razaoSocial;
  #telefone;
  #email;
  #endereco;
  #incricaoEstadual;
  #representante;
  #ativo;

  // Relacionamentos
  #metodosPagamento = [];
  #generos = [];
  
  constructor(id, cnpj, razaoSocial, telefone, email, endereco, incricaoEstadual, representante, ativo, dataCriacao, dataAlteracao) {
    if (new.target !== Fornecedor) {
      throw new Error(`Use ${this.constructor.name}.criar()`);
    }
    super(id, dataCriacao, dataAlteracao);
    this.#cnpj = cnpj;
    this.#razaoSocial = razaoSocial;
    this.#telefone = telefone;
    this.#email = email;
    this.#endereco = endereco;
    this.#incricaoEstadual = incricaoEstadual;
    this.#representante = representante;
    this.#ativo = ativo;
  }
  
  // Getters
  get cnpj() { return this.#cnpj; }
  get razaoSocial() { return this.#razaoSocial; }
  get telefone() { return this.#telefone; }
  get email() { return this.#email; }
  get endereco() { return this.#endereco; }
  get incricaoEstadual() { return this.#incricaoEstadual; }
  get representante() { return this.#representante; }
  get ativo() { return this.#ativo; }

  // Relacionamentos
  get metodosPagamento() { return this.#metodosPagamento; }
  get generos() { return this.#generos; }
  
  // Alteração dos dados
  alterar({ cnpj, razaoSocial, telefone, email, endereco, incricaoEstadual, representante, ativo }) {
    this.#cnpj = cnpj;
    this.#razaoSocial = razaoSocial;
    this.#telefone = telefone;
    this.#email = email;
    this.#endereco = endereco;
    this.#incricaoEstadual = incricaoEstadual;
    this.#representante = representante;
    this.#ativo = ativo;
    this.dataAlteracao = new Date();
  }

  // Alteração do status ativo
  alterarAtivo(ativo) {
    this.#ativo = ativo;
    this.dataAlteracao = new Date();
  }

  adicionarMetodoPagamento(metodoPagamento) {
    if (!(metodoPagamento instanceof MetodoPagamento)) {
      throw new Error('MetodoPagamento inválido.');
    }
    this.#metodosPagamento.push(metodoPagamento);
    this.dataAlteracao = new Date();
  }

  definirMetodosPagamento(metodosPagamento) {
    if (!Array.isArray(metodosPagamento)) {
      throw new TypeError('metodosPagamento deve ser um array');
    }
  
    if (!metodosPagamento.every(m => m instanceof MetodoPagamento)) {
      throw new TypeError('metodosPagamento deve ser um array de instâncias de MetodoPagamento');
    }

    this.#metodosPagamento = metodosPagamento;
  }

  definirGeneros(generos) {
    if (!Array.isArray(generos)) {
      throw new TypeError('generos deve ser um array');
    }
    this.#generos = generos;
  }
  
  // Fábrica para criação
  static criar({ cnpj, razaoSocial, telefone, email, endereco, incricaoEstadual, representante }) {
    return new Fornecedor(null, cnpj, razaoSocial, telefone, email, endereco, incricaoEstadual, representante, true, new Date(), null);
  }
}
  
export default Fornecedor;