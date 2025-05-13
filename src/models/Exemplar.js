import Entity from "./Entity.js";

class Exemplar  extends Entity{
  #acervoId;
  #entradaAcervoId;
  #tombo;
  #status;
  #estado;
  
  constructor(id, acervoId, entradaAcervoId, tombo, status, estado, dataCriacao, dataAlteracao) {
    if (new.target !== Categoria) {
      throw new Error(`Use ${this.constructor.name}.criar()`);
    }
    super(id, dataCriacao, dataAlteracao);
    this.#acervoId = acervoId;
    this.#entradaAcervoId = entradaAcervoId;
    this.#tombo = tombo;
    this.#status = status;
    this.#estado = estado;
  }
  
  // Getters
  get acervoId() { return this.#acervoId; }
  get entradaAcervoId() { return this.#entradaAcervoId; }
  get tombo() { return this.#tombo; }
  get status() { return this.#status; }
  get estado() { return this.#estado; }
  
  // Alteração do estado
  alterarEstado(estado) {
    this.#estado = estado;
    this.dataAlteracao = new Date();
  }

  // Fábrica para criação
  static criar({ acervoId, entradaAcervoId, estado }) {
    let tombo = '314sd5'; //logica para gerar numero de tombo
    return new Exemplar(null, acervoId, entradaAcervoId, tombo, 'disponivel', estado, new Date(), null);
  }
}
  
export default Exemplar;  