import Entity from "./Entity.js";

class EntradaAcervo extends Entity {
  #acervoId;
  #tipoOrigem;
  #origemId;
  #quantidade;
  #dataEntrada;
  
  // Relacionamentos
  #acervo;
  #origem;

  constructor(id, acervoId, tipoOrigem, origemId, quantidade, dataEntrada, dataCriacao, dataAlteracao, acervo = undefined, origem = undefined) {
    if (new.target !== EntradaAcervo) {
      throw new Error(`Use ${this.constructor.name}.criar()`);
    }
    super(id, dataCriacao, dataAlteracao);
    this.#acervoId = acervoId;
    this.#tipoOrigem = tipoOrigem;
    this.#origemId = origemId;
    this.#quantidade = quantidade;
    this.#dataEntrada = dataEntrada;
    this.#acervo = acervo;
    this.#origem = origem;
  }
  
  // Getters
  get acervoId() { return this.#acervoId; }
  get tipoOrigem() { return this.#tipoOrigem; }
  get origemId() { return this.#origemId; }
  get quantidade() { return this.#quantidade; }
  get dataEntrada() { return this.#dataEntrada; }
  
  // Relacionamentos
  get acervo() { return this.#acervo; }
  get origem() { return this.#origem; }

  // Alteração dos dados
  alterar({ acervoId, tipoOrigem, origemId, quantidade }) {
    this.#acervoId = acervoId;
    this.#tipoOrigem = tipoOrigem;
    this.#origemId = origemId;
    this.#quantidade = quantidade;
    this.dataAlteracao = new Date();
  }

  // Fábrica para criação
  static criar({ acervoId, tipoOrigem, origemId, quantidade, dataEntrada }) {
  return new EntradaAcervo(null, acervoId, tipoOrigem, origemId, quantidade, dataEntrada, new Date(), null);
  }
}
  
export default EntradaAcervo;
  