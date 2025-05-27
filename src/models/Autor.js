import Entity from "./Entity.js";

class Autor extends Entity  {
  #nome;
  #nacionalidade;
  #dataNascimento;
  #biografia;
  #ativo;
  
  constructor(id, nome, nacionalidade, dataNascimento, biografia, ativo, dataCriacao, dataAlteracao) {
    if (new.target !== Autor) {
      throw new Error(`Use ${this.constructor.name}.criar()`);
    }
    super(id, dataCriacao, dataAlteracao);
    this.#nome = nome;
    this.#nacionalidade = nacionalidade;
    this.#dataNascimento = dataNascimento;
    this.#biografia = biografia;
    this.#ativo = ativo;
  }
  
  // Getters
  get nome() { return this.#nome; }
  get nacionalidade() { return this.#nacionalidade; }
  get dataNascimento() { return this.#dataNascimento; }
  get biografia() { return this.#biografia; }
  get ativo() { return this.#ativo; }

  // Alteração dos dados
  alterar({ nome, nacionalidade, dataNascimento, biografia, ativo }) {
    this.#nome = nome;
    this.#nacionalidade = nacionalidade;
    this.#dataNascimento = dataNascimento;
    this.#biografia = biografia;
    this.#ativo = ativo;
    this.dataAlteracao = new Date();
  }

  // Alteração do status ativo
  alterarAtivo(ativo) {
    this.#ativo = ativo;
    this.dataAlteracao = new Date();
  }
  
  // Fábrica para criação
  static criar({ nome, nacionalidade, dataNascimento, biografia, ativo }) {
    return new Autor(null, nome, nacionalidade, dataNascimento, biografia, ativo, new Date(), null);
  }
}
  
export default Autor;