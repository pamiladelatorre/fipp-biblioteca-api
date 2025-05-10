import Entity from "./Entity.js";

class MetodoPagamento extends Entity {
  static TipoPagamento = {
    AVISTA: "avista",
    PARCELADO: "parcelado",
    BOLETADO: "boletado",
    CARTAO: "cartao",
    PIX: "pix"
  };

  static TipoDesconto = {
    VOLUME: "volume",
    ANTECIPACAO: "antecipacao"
  }

  #fornecedorId;
  #tipoPagamento;
  #prazo;
  #tipoDesconto;
  #chavePix;
  #banco;
  #agencia;
  #conta;
  
  constructor(id, fornecedorId, tipoPagamento, prazo, tipoDesconto, chavePix, banco, agencia, conta, dataCriacao, dataAlteracao) {
    if (new.target !== MetodoPagamento) {
      throw new Error(`Use ${new.target.name}.criar() ou ${new.target.name}.fromDbRow()`);
    }
    super(id, dataCriacao, dataAlteracao);
    this.#fornecedorId = fornecedorId;
    this.#tipoPagamento = tipoPagamento;
    this.#prazo = prazo;
    this.#tipoDesconto = tipoDesconto;
    this.#chavePix = chavePix;
    this.#banco = banco;
    this.#agencia = agencia;
    this.#conta = conta;
  }
  
  // Getters
  get fornecedorId() { return this.#fornecedorId; }
  get tipoPagamento() { return this.#tipoPagamento; }
  get prazo() { return this.#prazo; }
  get tipoDesconto() { return this.#tipoDesconto; }
  get chavePix() { return this.#chavePix; }
  get banco() { return this.#banco; }
  get agencia() { return this.#agencia; }
  get conta() { return this.#conta; }
  
  // Alteração dos dados
  alterar(fornecedorId, tipoPagamento, prazo, tipoDesconto, chavePix, banco, agencia, conta) {
    this.#fornecedorId = fornecedorId;
    this.#tipoPagamento = tipoPagamento;
    this.#prazo = prazo;
    this.#tipoDesconto = tipoDesconto;
    this.#chavePix = chavePix;
    this.#banco = banco;
    this.#agencia = agencia;
    this.#conta = conta;
    this.dataAlteracao = new Date();
  }

  // Fábrica para criação
  static criar(fornecedorId, tipoPagamento, prazo, tipoDesconto, chavePix, banco, agencia, conta) {
    return new MetodoPagamento(null, fornecedorId, tipoPagamento, prazo, tipoDesconto, chavePix, banco, agencia, conta, true, new Date(), null);
  }
}
  
export default MetodoPagamento;
  