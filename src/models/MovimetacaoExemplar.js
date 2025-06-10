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
        dataAlteracao,
        exemplar = null, 
        usuario = null
    ) {
        if (new.target !== MovimetacaoExemplar) {
            throw new Error(`Use ${this.constructor.name}.criar()`);
        }
        super(id, dataCriacao, dataAlteracao);
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
    static criar({ exemplarId, usuarioId, etapa }) {
        return new MovimetacaoExemplar(
            null, 
            exemplarId, 
            usuarioId,
            etapa,
            'ativa',
            null, 
            null,
            new Date(),
            new Date(),//calculo data prevista
            null,
            0
        );
    }
}

export default MovimetacaoExemplar;