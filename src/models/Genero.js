import Entity from "./Entity.js";

class Genero extends Entity {
  // Campos privados
  #descricao;
  #ativo;

  constructor(id, descricao, ativo, dataCriacao, dataAlteracao) {
    if (new.target !== Genero) {
      throw new Error(`Use ${new.target.name}.criar()`);
    }
    super(id, dataCriacao, dataAlteracao);    
    this.#descricao = descricao;
    this.#ativo = ativo;
  }
  
  // Getters
  get descricao() { return this.#descricao; }
  get ativo() { return this.#ativo; }
  
  // Alteração dos dados
  alterar(descricao, ativo) {
    this.#descricao = descricao;
    this.#ativo = ativo;
    this.dataAlteracao = new Date();
  }

  // Alteração do status ativo
  alterarAtivo(ativo) {
    this.#ativo = ativo;
    this.dataAlteracao = new Date();
  }
  
  // Fábrica para criação
  static criar(descricao) {
    return new Genero(null, descricao, true, new Date(), null);
  }
}
  
export default Genero;