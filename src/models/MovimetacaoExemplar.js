import Entity from "./Entity.js";

class MovimetacaoExemplar extends Entity {
    #exemplarId;
    #usuarioId;
    #etapa;
    #status;
    #grupoId;
    #referenciaId;
    #dataInicio;
    #dataPrevista;
    #dataFim;
    #numeroRenovacao

    // Relacionamentos
    #exemplar;
    #usuario;

    constructor(
        id, 
        exemplarId, 
        usuarioId, 
        etapa, 
        status, 
        grupoId, 
        referenciaId, 
        dataInicio, 
        dataPrevista, 
        dataFim, 
        numeroRenovacao, 
        dataCriacao,
        dataAtualizacao,
        exemplar = null, 
        usuario = null
    ) {
        if (new.target !== MovimetacaoExemplar) {
            throw new Error(`Use ${this.constructor.name}.criar()`);
        }
        super(id, dataCriacao, dataAtualizacao);
        this.#exemplarId = exemplarId;
        this.#usuarioId = usuarioId;
        this.#etapa = etapa;
        this.#status = status;
        this.#grupoId = grupoId;
        this.#referenciaId = referenciaId;
        this.#dataInicio = dataInicio;
        this.#dataPrevista = dataPrevista;
        this.#dataFim = dataFim;
        this.#numeroRenovacao = numeroRenovacao;
        this.#exemplar = exemplar;
        this.#usuario = usuario;
    }

    // Getters
    get exemplarId() { return this.#exemplarId; }
    get usuarioId() { return this.#usuarioId; }
    get etapa() { return this.#etapa; }
    get status() { return this.#status; }
    get grupoId() { return this.#grupoId; }
    get referenciaId() { return this.#referenciaId; }
    get dataInicio() { return this.#dataInicio; }
    get dataPrevista() { return this.#dataPrevista; }
    get dataFim() { return this.#dataFim; }
    get numeroRenovacao() { return this.#numeroRenovacao; }

    // Relacionamentos
    get exemplar() { return this.#exemplar; }
    get usuario() { return this.#usuario; }

    // Fábrica para criação
static criar({ exemplarId, usuarioId, etapa, dataCriacao = new Date(), dataAtualizacao = new Date() }) {
  return new MovimetacaoExemplar(
    null,              // id
    exemplarId,
    usuarioId,
    etapa,
    'ativa',
    null,              // grupoId
    null,              // referenciaId
    new Date(),        // dataInicio
    new Date(),        // dataPrevista (deveria calcular com regra real)
    null,              // dataFim
    0,                 // numeroRenovacao
    dataCriacao,       // dataCriacao
    dataAtualizacao      // dataAlteracao
  );
}

toObject() {
  return {
    exemplar_id: this.exemplarId,
    usuario_id: this.usuarioId,
    etapa: this.etapa,
    status: this.status,
    grupo_id: this.grupoId,
    referencia_id: this.referenciaId,
    data_inicio: this.dataInicio,
    data_prevista: this.dataPrevista,
    data_fim: this.dataFim,
    numero_renovacao: this.numeroRenovacao,
    data_criacao: this.dataCriacao,
    data_atualizacao: this.dataAtualizacao,
  };
}



}

export default MovimetacaoExemplar;