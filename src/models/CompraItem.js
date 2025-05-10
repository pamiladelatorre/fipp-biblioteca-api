import Entity from "./Entity.js";

class CompraItem extends Entity {
  #acervoId;
  #quantidade;
  #valorUnitario;
  
  constructor(id, acervoId, quantidade, valorUnitario, dataCriacao) {
    if (new.target !== CompraItem) {
      throw new Error(`Use ${new.target.name}.criar()`);
    }
    super(id, dataCriacao);
    this.#acervoId = acervoId;
    this.#quantidade = quantidade;
    this.#valorUnitario = valorUnitario;
  }
  
  // Getters
  get acervoId() { return this.#acervoId; }
  get quantidade() { return this.#quantidade; }
  get valorUnitario() { return this.#valorUnitario; }

  // Fábrica para criação
  static criar(acervoId, quantidade, valorUnitario) {
    return new CompraItem(null, acervoId, quantidade, valorUnitario, new Date());
  }
}
  
export default CompraItem;