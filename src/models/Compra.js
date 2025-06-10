import Entity from "./Entity.js";
import CompraItem from "./CompraItem.js";

class Compra extends Entity  {
  #fornecedorId;
  #metodoPagamentoId;
  #tipoProduto;
  #numeroEmpenho;
  #status;

  // Relacionamentos
  #fornecedor;
  #metodoPagamento
  #itens;
  
  constructor(id, fornecedorId, metodoPagamentoId, tipoProduto, numeroEmpenho, status, dataCriacao, dataAlteracao, fornecedor = undefined, metodoPagamento = undefined) {
    if (new.target !== Compra) {
      throw new Error(`Use ${this.constructor.name}.criar()`);
    }
    super(id, dataCriacao, dataAlteracao);
    this.#fornecedorId = fornecedorId;
    this.#metodoPagamentoId = metodoPagamentoId;
    this.#tipoProduto = tipoProduto;
    this.#numeroEmpenho = numeroEmpenho;
    this.#status = status;
    this.#fornecedor = fornecedor;
    this.#metodoPagamento = metodoPagamento;
    this.#itens = [];
  }
  
  // Getters
  get fornecedorId() { return this.#fornecedorId; }
  get metodoPagamentoId() { return this.#metodoPagamentoId; }
  get tipoProduto() { return this.#tipoProduto; }
  get numeroEmpenho() { return this.#numeroEmpenho; }
  get status() { return this.#status; }

  // Relacionamentos
  get fornecedor() { return this.#fornecedor; }
  get metodoPagamento() { return this.#metodoPagamento; }
  get itens() { return [...this.#itens]; }
  
  // Alteração dos dados
  alterar({ fornecedorId, metodoPagamentoId, tipoProduto, numeroEmpenho, status }) {
    this.#fornecedorId = fornecedorId;
    this.#metodoPagamentoId = metodoPagamentoId;
    this.#tipoProduto = tipoProduto;
    this.#numeroEmpenho = numeroEmpenho;
    this.#status = status;
    this.dataAlteracao = new Date();
  }

  // Alteração do status
  alterarStatus(status) {
    this.#status = status;
    this.dataAlteracao = new Date();
  }
  
  // Fábrica para criação
  static criar({ fornecedorId, metodoPagamentoId, tipoProduto, numeroEmpenho, status }) {
    return new Compra(null, fornecedorId, metodoPagamentoId, tipoProduto, numeroEmpenho, status, new Date(), null);
  }
}
  
export default Compra;