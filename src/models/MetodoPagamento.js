import Entity from "./Entity.js";
import { toNull } from "../utils/stringUtils.js";


class MetodoPagamento extends Entity {
  #fornecedorId;
  #tipoPagamento;
  #prazo;
  #parcelaMaxima;
  #chavePix;
  #tipoDesconto;
  
  constructor(id, fornecedorId, tipoPagamento, prazo, parcelaMaxima, chavePix, tipoDesconto, dataCriacao, dataAlteracao) {
    if (new.target !== MetodoPagamento) {
      throw new Error(`Use ${this.constructor.name}.criar()`);
    }
    super(id, dataCriacao, dataAlteracao);
    this.#fornecedorId = fornecedorId;
    this.#tipoPagamento = tipoPagamento;
    this.#prazo = prazo;
    this.#parcelaMaxima = parcelaMaxima;
    this.#chavePix = chavePix;
    this.#tipoDesconto = tipoDesconto;
  }
  
  // Getters
  get fornecedorId() { return this.#fornecedorId; }
  get tipoPagamento() { return this.#tipoPagamento; }
  get prazo() { return this.#prazo; }
  get parcelaMaxima() { return this.#parcelaMaxima; }
  get chavePix() { return this.#chavePix; }
  get tipoDesconto() { return this.#tipoDesconto; }
  
  // Alteração dos dados
  alterar({ prazo, parcelaMaxima, chavePix, tipoDesconto }) {
    this.#prazo = toNull(prazo);
    this.#parcelaMaxima = toNull(parcelaMaxima);
    this.#chavePix = toNull(chavePix);
    this.#tipoDesconto = toNull(tipoDesconto);
    this.dataAlteracao = new Date();
  }

  // Fábrica para criação
  static criar({ fornecedorId, tipoPagamento, prazo, parcelaMaxima, chavePix, tipoDesconto }) {
    return new MetodoPagamento(
      null, 
      fornecedorId, 
      tipoPagamento,
      toNull(prazo), 
      toNull(parcelaMaxima), 
      toNull(chavePix), 
      toNull(tipoDesconto), 
      new Date(), 
      null
    );
  }
}
  
export default MetodoPagamento;
  