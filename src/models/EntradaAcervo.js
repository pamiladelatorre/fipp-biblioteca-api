import Entity from "./Entity.js";

class EntradaAcervo extends Entity {
  #acervoId;
  #tipoOrigem;
  #origemId;
  #quantidade;
  #dataEntrada;
  
  constructor(id, acervoId, tipoOrigem, origemId, quantidade, dataEntrada, dataCriacao, dataAlteracao) {
    if (new.target !== EntradaAcervo) {
      throw new Error(`Use ${new.target.name}.criar()`);
    }
    super(id, dataCriacao, dataAlteracao);
    this.#acervoId = acervoId;
    this.#tipoOrigem = tipoOrigem;
    this.#origemId = origemId;
    this.#quantidade = quantidade;
    this.#dataEntrada = dataEntrada;
  }
  
  // Getters
  get acervoId() { return this.#acervoId; }
  get tipoOrigem() { return this.#tipoOrigem; }
  get origemId() { return this.#origemId; }
  get quantidade() { return this.#quantidade; }
  get dataEntrada() { return this.#dataEntrada; }
  
  // Alteração dos dados
  alterar(acervoId, tipoOrigem, origemId, quantidade) {
    this.#acervoId = acervoId;
    this.#tipoOrigem = tipoOrigem;
    this.#origemId = origemId;
    this.#quantidade = quantidade;
    this.dataAlteracao = new Date();
  }

  // Fábrica para criação
  static criar(acervoId, tipoOrigem, origemId, quantidade, dataEntrada) {
  return new EntradaAcervo(null, acervoId, tipoOrigem, origemId, quantidade, dataEntrada, new Date(), null);
  }
}
  
export default EntradaAcervo;
  