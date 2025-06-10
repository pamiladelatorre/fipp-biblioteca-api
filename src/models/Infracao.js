import Entity from "./Entity.js";

class Infracao extends Entity {
  // Campos privados
  #usuarioId;
  #tipoInfracao;
  #grauInfracao;
  #status;
  #motivo;
  #dataInicio;
  #dataFim;

  // Relacionamentos
  #usuario;
  
  constructor(id, usuarioId, tipoInfracao, grauInfracao, status, motivo, dataInicio, dataFim, dataCriacao, dataAlteracao, usuario = undefined) {
    if (new.target !== Infracao) {
      throw new Error(`Use ${this.constructor.name}.criar()`);
    }
    super(id, dataCriacao, dataAlteracao);
    this.#usuarioId = usuarioId;
    this.#tipoInfracao = tipoInfracao;
    this.#grauInfracao = grauInfracao;
    this.#status = status;
    this.#motivo = motivo;
    this.#dataInicio = dataInicio;
    this.#dataFim = dataFim;
    this.#usuario = usuario;
  }
  
  // Getters
  get usuarioId() { return this.#usuarioId; }
  get tipoInfracao() { return this.#tipoInfracao; }
  get grauInfracao() { return this.#grauInfracao; }
  get status() { return this.#status; }
  get motivo() { return this.#motivo; }
  get dataInicio() { return this.#dataInicio; }
  get dataFim() { return this.#dataFim; }
  
  // Relacionamentos
  get usuario() { return this.#usuario; }

  // Alteração dos dados
  alterar({ tipoInfracao, grauInfracao, motivo, dataFim }) {
    this.#tipoInfracao = tipoInfracao;
    this.#grauInfracao = grauInfracao;
    this.#motivo = motivo;
    this.#dataFim = dataFim;
    this.dataAlteracao = new Date();
  }

  // Fábrica para criação
  static criar({ usuarioId, tipoInfracao, grauInfracao, motivo, dataInicio, dataFim }) {
    return new Infracao(null, usuarioId, tipoInfracao, grauInfracao, 'pendente', motivo, dataInicio, dataFim, true, new Date(), null);
  }
}
  
export default Infracao;