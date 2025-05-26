import Entity from "./Entity.js";
import MetodoPagamento from "./MetodoPagamento.js";
import { ValidationError } from '../utils/errors.js';

class Fornecedor extends Entity {
  #cnpj;
  #razaoSocial;
  #telefone;
  #email;
  #endereco;
  #inscricaoEstadual;
  #representante;
  #ativo;

  // Relacionamentos
  #metodosPagamento;
  #generos;
  
  constructor(id, cnpj, razaoSocial, telefone, email, endereco, inscricaoEstadual, representante, ativo, dataCriacao, dataAlteracao) {
    if (new.target !== Fornecedor) {
      throw new Error(`Use ${this.constructor.name}.criar()`);
    }
    super(id, dataCriacao, dataAlteracao);
    this.#cnpj = cnpj;
    this.#razaoSocial = razaoSocial;
    this.#telefone = telefone;
    this.#email = email;
    this.#endereco = endereco;
    this.#inscricaoEstadual = inscricaoEstadual;
    this.#representante = representante;
    this.#ativo = ativo;
    this.#metodosPagamento = [];
    this.#generos = [];
  }
  
  // Getters
  get cnpj() { return this.#cnpj; }
  get razaoSocial() { return this.#razaoSocial; }
  get telefone() { return this.#telefone; }
  get email() { return this.#email; }
  get endereco() { return this.#endereco; }
  get inscricaoEstadual() { return this.#inscricaoEstadual; }
  get representante() { return this.#representante; }
  get ativo() { return this.#ativo; }

  // Relacionamentos
  get metodosPagamento() { return this.#metodosPagamento; }
  get generos() { return this.#generos; }
  
  // Alteração dos dados
  alterar({ cnpj, razaoSocial, telefone, email, endereco, inscricaoEstadual, representante, ativo }) {
    this.#cnpj = cnpj;
    this.#razaoSocial = razaoSocial;
    this.#telefone = telefone;
    this.#email = email;
    this.#endereco = endereco;
    this.#inscricaoEstadual = inscricaoEstadual;
    this.#representante = representante;
    this.#ativo = ativo;
    this.dataAlteracao = new Date();
  }

  // Alteração do status ativo
  alterarAtivo(ativo) {
    this.#ativo = ativo;
    this.dataAlteracao = new Date();
  }

  adicionarMetodoPagamento({ tipoPagamento, prazo, parcelaMaxima, chavePix, tipoDesconto }) {
    const existente = this.#metodosPagamento.find(m => m.tipoPagamento === tipoPagamento);
    if (existente) {
      throw new ValidationError(`Método de pagamento do tipo '${tipoPagamento}' já existe para este fornecedor.`);
    }

    const metodoPagamento = MetodoPagamento.criar({ fornecedorId:this.id, tipoPagamento, prazo, parcelaMaxima, chavePix, tipoDesconto });
    this.#metodosPagamento.push(metodoPagamento);
  }

  alterarMetodoPagamento({ id, prazo, parcelaMaxima, chavePix, tipoDesconto }) {
    const metodo = this.#metodosPagamento.find(m => m.id === id);
    if (!metodo) {
      throw new ValidationError(`Método de pagamento com ID ${id} não encontrado.`);
    }

    metodo.alterar({ prazo, parcelaMaxima, chavePix, tipoDesconto });
  }

  removerMetodoPagamento(id) {
    const index = this.#metodosPagamento.findIndex(m => m.id === id);
    if (index === -1) {
      throw new Error(`Método de pagamento com ID ${id} não encontrado.`);
    }
  
    this.#metodosPagamento.splice(index, 1);
  }

  definirGeneros(generosIds) {
    if (!Array.isArray(generosIds)) {
      throw new TypeError('generos deve ser um array');
    }
    this.#generos = generosIds;
  }
  
  // Fábrica para criação
  static criar({ cnpj, razaoSocial, telefone, email, endereco, inscricaoEstadual, representante, ativo }) {
    return new Fornecedor(null, cnpj, razaoSocial, telefone, email, endereco, inscricaoEstadual, representante, ativo, new Date(), null);
  }

}

export default Fornecedor;