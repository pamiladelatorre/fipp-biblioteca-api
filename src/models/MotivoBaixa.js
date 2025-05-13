import Entity from "./Entity.js";

class MotivoBaixa extends Entity {
    #descricao;
    #ativo;
  
  constructor(id, descricao, ativo, dataCriacao, dataAlteracao) {
    if (new.target !== MotivoBaixa) {
      throw new Error(`Use ${this.constructor.name}.criar()`);
    }
    super(id, dataCriacao, dataAlteracao);
    this.#descricao = descricao;
    this.#ativo = ativo;
  }
  
  // Getters
  get descricao() { return this.#descricao; }
  get ativo() { return this.#ativo; }

  // Alteração dos dados
  alterar({ descricao, ativo }) {
    this.#descricao = descricao;
    this.#ativo = ativo;
    this.dataAlteracao = new Date();
  }

  // Alteração do status ativo
  alterarAtivo(ativo) {
    this.#ativo = ativo;
    this.dataAlteracao = new Date();
  }
  
  // Fábrica para criação
  static criar({ descricao }) {
    return new MotivoBaixa(null, descricao, true, new Date(), null);
  }
}
  
export default MotivoBaixa;