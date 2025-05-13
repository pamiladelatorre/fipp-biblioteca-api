import { toJSONFromGetters } from "../utils/toJSONFromGetters.js";

class Entity {
  #id;
  #dataCriacao;
  #dataAlteracao;

  constructor(id, dataCriacao, dataAlteracao) {
    if (new.target === Entity) {
      throw new Error(`Classe abstrata '${this.constructor.name}' não pode ser instanciada diretamente.`);
    }
    this.#id = id;
    this.#dataCriacao = dataCriacao;
    this.#dataAlteracao = dataAlteracao;
  }

  // Getters comuns
  get id() { return this.#id; }
  get dataCriacao() { return this.#dataCriacao; }
  get dataAlteracao() { return this.#dataAlteracao; }

  // Setters protegidos
  set dataAlteracao(value) { this.#dataAlteracao = value; }

  isNew() {
    return this.#id == null;
  }
  
  equals(otherEntity) {
    return otherEntity instanceof Entity && this.#id === otherEntity.id;
  }
  
  // Serialização padrão
  toJSON() {
    return toJSONFromGetters(this);
  }

  // Define ID apenas uma vez
  setIdFromDB(id) {
    if (this.#id != null) throw new Error("ID já foi definido.");
    this.#id = id;
  }
}

export default Entity;