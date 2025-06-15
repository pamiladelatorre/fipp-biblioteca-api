import Entity from "./Entity.js";

class Assinatura extends Entity {
  #fornecedorId;
  #descricao;
  #periodicidade;
  #numeroContrato;
  #valor;
  #dataInicio;
  #dataFim;
  #ativo;
  
  constructor(id, fornecedorId, descricao, periodicidade, numeroContrato, valor, dataInicio, dataFim, ativo, dataCriacao, dataAlteracao) {
    if (new.target !== Assinatura) {
      throw new Error(`Use ${this.constructor.name}.criar()`);
    }
    super(id, dataCriacao, dataAlteracao);
    this.#fornecedorId = fornecedorId;
    this.#descricao = descricao;
    this.#periodicidade = periodicidade;
    this.#numeroContrato = numeroContrato;
    this.#valor = valor;
    this.#dataInicio = dataInicio;
    this.#dataFim = dataFim;
    this.#ativo = ativo;
  }
  
  // Getters
  get fornecedorId() { return this.#fornecedorId; }
  get descricao() { return this.#descricao; }
  get periodicidade() { return this.#periodicidade; }
  get numeroContrato() { return this.#numeroContrato; }
  get valor() { return this.#valor; }
  get dataInicio() { return this.#dataInicio; }
  get dataFim() { return this.#dataFim; }
  get ativo() { return this.#ativo; }
  
  // Alteração dos dados
  alterar({ fornecedorId, descricao, periodicidade, numeroContrato, valor, dataInicio, dataFim }) {
    this.#fornecedorId = fornecedorId;
    this.#descricao = descricao;
    this.#periodicidade = periodicidade;
    this.#numeroContrato = numeroContrato;
    this.#valor = valor;
    this.#dataInicio = dataInicio;
    this.#dataFim = dataFim;
    this.dataAlteracao = new Date();
  }

  // Alteração do status ativo
  alterarAtivo(ativo) {
    this.#ativo = ativo;
  }

  // Fábrica para criação
 static criar({ fornecedorId, descricao, periodicidade, numeroContrato, valor, dataInicio, dataFim }) {
  return new Assinatura(
    null,
    fornecedorId,
    descricao,
    periodicidade,
    numeroContrato,
    valor,
    dataInicio,
    dataFim,
    true,
    new Date(),
    null
  );
}

}
  
export default Assinatura;