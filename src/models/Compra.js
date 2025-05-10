import Entity from "./Entity.js";
import CompraItem from "./CompraItem.js";

class Compra extends Entity  {
  #fornecedorId;
  #metodoPagamentoId;
  #tipoProduto;
  #numeroEmpenho;
  #status;
  #itens = [];
  
  constructor(id, fornecedorId, metodoPagamentoId, tipoProduto, numeroEmpenho, status, dataCriacao, dataAlteracao) {
    if (new.target !== Compra) {
      throw new Error(`Use ${new.target.name}.criar()`);
    }
    super(id, dataCriacao, dataAlteracao);
    this.#fornecedorId = fornecedorId;
    this.#metodoPagamentoId = metodoPagamentoId;
    this.#tipoProduto = tipoProduto;
    this.#numeroEmpenho = numeroEmpenho;
    this.#status = status;
  }
  
  // Getters
  get fornecedorId() { return this.#fornecedorId; }
  get metodoPagamentoId() { return this.#metodoPagamentoId; }
  get tipoProduto() { return this.#tipoProduto; }
  get numeroEmpenho() { return this.#numeroEmpenho; }
  get status() { return this.#status; }
  get idtens() { return [...this.#itens]; }
  
  // Alteração dos dados
  alterar(fornecedorId, metodoPagamentoId, tipoProduto, numeroEmpenho, status) {
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

  adicionarItem(item) {
    if (!(item instanceof CompraItem)) {
      throw new Error('Item inválido.');
    }
    this.#itens.push(item);
    this.dataAlteracao = new Date();
  }

  removerItem(item) {
    if (!(item instanceof CompraItem)) {
      throw new Error('Item inválido.');
    }

    const index = this.#itens.indexOf(item);
    if (index === -1) {
      throw new Error('Item não encontrado.');
    }
    
    this.#itens.splice(index, 1);
    this.dataAlteracao = new Date();
  }  

  limparItens() {
    this.#itens = [];
    this.dataAlteracao = new Date();
  }  
  
  // Fábrica para criação
  static criar(fornecedorId, metodoPagamentoId, tipoProduto, numeroEmpenho, status) {
    return new Compra(null, fornecedorId, metodoPagamentoId, tipoProduto, numeroEmpenho, status, new Date(), null);
  }

  // toJSON() {
  //   return {
  //     ...super.toJSON(),
  //     itens: this.#itens.map(i => i.toJSON())
  //   };
  // }
}
  
export default Compra;