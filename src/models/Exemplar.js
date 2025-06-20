import Entity from "./Entity.js";

class Exemplar extends Entity{
  #entradaAcervoId;
  #acervoId;
  #motivoBaixaId;
  #tombo;
  #status;
  #estado;
  #observacoesBaixa;

  // Relacionamentos
  #acervo;
  #motivoBaixa;
  
  constructor(id, entradaAcervoId, acervoId, motivoBaixaId, tombo, status, estado, observacoesBaixa, dataCriacao, dataAlteracao, acervo = undefined, motivoBaixa = undefined) {
    if (new.target !== Exemplar) {
      throw new Error(`Use ${this.constructor.name}.criar()`);
    }
    super(id, dataCriacao, dataAlteracao);
    this.#entradaAcervoId = entradaAcervoId;
    this.#acervoId = acervoId;
    this.#motivoBaixaId = motivoBaixaId;
    this.#tombo = tombo;
    this.#status = status;
    this.#estado = estado;
    this.#acervo = acervo;
    this.#observacoesBaixa = observacoesBaixa;
    this.#motivoBaixa = motivoBaixa;
  }
  
  // Getters
  get acervoId() { return this.#acervoId; }
  get entradaAcervoId() { return this.#entradaAcervoId; }
  get motivoBaixaId() { return this.#motivoBaixaId; }
  get tombo() { return this.#tombo; }
  get status() { return this.#status; }
  get estado() { return this.#estado; }
  get observacoesBaixa() { return this.#observacoesBaixa; }
  
  // Relacionamentos
  get acervo() { return this.#acervo; }
  get motivoBaixa() { return this.#motivoBaixa; }

  // Alteração do estado
  alterarEstado(estado) {
    this.#estado = estado;
    this.dataAlteracao = new Date();
  }

  // Baixar exemplar
  baixar({motivoBaixaId, observacoesBaixa }) {
    this.#status = 'baixado';
    this.#motivoBaixaId = motivoBaixaId;
    this.#observacoesBaixa = observacoesBaixa;
    this.dataAlteracao = new Date();
  }

  // Fábrica para criação
  static criar({ entradaAcervoId, acervoId, estado }) {
    //crypto.randomUUID()
    let tombo = '314sd5'; //logica para gerar numero de tombo
    return new Exemplar(null, entradaAcervoId, acervoId, tombo, 'disponivel', estado, new Date(), null);
  }
}
  
export default Exemplar;  