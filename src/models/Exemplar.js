import Entity from "./Entity.js";

class Exemplar extends Entity{
  #entradaAcervoId;
  #acervoId;
  #tombo;
  #status;
  #estado;

  // Relacionamentos
  #acervo;
  
  constructor(id, entradaAcervoId, acervoId, tombo, status, estado, dataCriacao, dataAlteracao, acervo  = null) {
    if (new.target !== Exemplar) {
      throw new Error(`Use ${this.constructor.name}.criar()`);
    }
    super(id, dataCriacao, dataAlteracao);
    this.#entradaAcervoId = entradaAcervoId;
    this.#acervoId = acervoId;
    this.#tombo = tombo;
    this.#status = status;
    this.#estado = estado;
    this.#acervo = acervo;
  }
  
  // Getters
  get acervoId() { return this.#acervoId; }
  get entradaAcervoId() { return this.#entradaAcervoId; }
  get tombo() { return this.#tombo; }
  get status() { return this.#status; }
  get estado() { return this.#estado; }
  
  // Relacionamentos
  get acervo() { return this.#acervo; }

  // Alteração do estado
  alterarEstado(estado) {
    this.#estado = estado;
    this.dataAlteracao = new Date();
  }

  // Fábrica para criação
  static criar({ entradaAcervoId, acervoId, estado }) {
    let tombo = '314sd5'; //logica para gerar numero de tombo
    return new Exemplar(null, entradaAcervoId, acervoId, tombo, 'disponivel', estado, new Date(), null);
  }
}
  
export default Exemplar;  