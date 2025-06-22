// Exemplar.js
import Entity from "./Entity.js";

class Exemplar extends Entity {
    #entradaAcervoId;
    #acervoId;
    #motivoBaixaId;
    #tombo;
    #status; // <--- Esta propriedade
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
        this.#status = status; // Inicialização do status
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
    get status() { return this.#status; } // <--- Seu getter atual
    get estado() { return this.#estado; }
    get observacoesBaixa() { return this.#observacoesBaixa; }

    // Adicione o setter para 'status' aqui:
    set status(value) {
        // Você pode adicionar validação aqui se necessário (ex: if (['disponivel', 'emprestado', 'baixado'].includes(value)))
        this.#status = value;
    }

    // Relacionamentos
    get acervo() { return this.#acervo; }
    get motivoBaixa() { return this.#motivoBaixa; }

    // Alteração do estado
    alterarEstado(estado) {
        this.#estado = estado;
        this.dataAlteracao = new Date();
    }

    // Baixar exemplar
    baixar({ motivoBaixaId, observacoesBaixa }) {
        this.#status = 'baixado';
        this.#motivoBaixaId = motivoBaixaId;
        this.#observacoesBaixa = observacoesBaixa;
        this.dataAlteracao = new Date();
    }

    // Fábrica para criação
    static criar({ entradaAcervoId, acervoId, estado }) {
        //crypto.randomUUID()
        let tombo = '314sd5'; //logica para gerar numero de tombo
        // Certifique-se que o construtor é chamado com todos os parâmetros esperados
        // O status inicial é 'disponivel'
        return new Exemplar(
            null, // id
            entradaAcervoId,
            acervoId,
            null, // motivoBaixaId (nulo na criação)
            tombo,
            'disponivel', // status inicial
            estado,
            null, // observacoesBaixa (nulo na criação)
            new Date(), // dataCriacao
            new Date() // dataAlteracao
        );
    }
}

export default Exemplar;