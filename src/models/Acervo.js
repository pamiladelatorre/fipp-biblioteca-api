import Entity from "./Entity.js";

class Acervo extends Entity {
  #autorId;
  #generoId;
  #categoriaId;
  #titulo;
  #numeroEdicao;
  #editora;
  #dataPublicacao;
  #numeroPagina;
  #isbn;
  #ativo;

  // Relacionamentos
  #autor;
  #genero;
  #categoria;
  
  constructor(
    id, 
    autorId, 
    generoId, 
    categoriaId, 
    titulo, 
    numeroEdicao, 
    editora, 
    dataPublicacao, 
    numeroPagina, 
    isbn, 
    ativo, 
    dataCriacao, 
    dataAlteracao,
    autor = undefined,
    genero = undefined,
    categoria = undefined
  ) {
    if (new.target !== Acervo) {
      throw new Error(`Use ${this.constructor.name}.criar()`);
    }
    super(id, dataCriacao, dataAlteracao);
    this.#autorId = autorId;
    this.#generoId = generoId;
    this.#categoriaId = categoriaId;
    this.#titulo = titulo;
    this.#numeroEdicao = numeroEdicao;
    this.#editora = editora;
    this.#dataPublicacao = dataPublicacao;
    this.#numeroPagina = numeroPagina;
    this.#isbn = isbn;
    this.#ativo = ativo;
    this.#autor = autor;
    this.#genero = genero;
    this.#categoria = categoria; 
  }
  
  // Getters
  get autorId() { return this.#autorId; }
  get generoId() { return this.#generoId; }
  get categoriaId() { return this.#categoriaId; }
  get titulo() { return this.#titulo; }
  get numeroEdicao() { return this.#numeroEdicao; }
  get editora() { return this.#editora; }
  get dataPublicacao() { return this.#dataPublicacao; }
  get numeroPagina() { return this.#numeroPagina; }
  get isbn() { return this.#isbn; }
  get ativo() { return this.#ativo; }

  // Relacionamentos
  get autor() { return this.#autor; }
  get genero() { return this.#genero; }
  get categoria() { return this.#categoria; }
  
  // Alteração dos dados
  alterar({ autorId, generoId, categoriaId, titulo, numeroEdicao, editora, dataPublicacao, numeroPagina, isbn, ativo }) {
    this.#autorId = autorId;
    this.#generoId = generoId;
    this.#categoriaId = categoriaId;
    this.#titulo = titulo;
    this.#numeroEdicao = numeroEdicao;
    this.#editora = editora;
    this.#dataPublicacao = dataPublicacao.split('T')[0];
    this.#numeroPagina = numeroPagina;
    this.#isbn = isbn;
    this.#ativo = ativo;
    this.dataAlteracao = new Date();
    this.#autor = null;
    this.#genero = null;
    this.#categoria = null; 
  }

  // Alteração do status ativo
  alterarAtivo(ativo) {
    this.#ativo = ativo;
    this.dataAlteracao = new Date();
  }
  
  // Fábrica para criação
  static criar({ autorId, generoId, categoriaId, titulo, numeroEdicao, editora, dataPublicacao, numeroPagina, isbn, ativo }) {
    return new Acervo(
      null,
      autorId,
      generoId,
      categoriaId,
      titulo,
      numeroEdicao,
      editora,
      dataPublicacao.split('T')[0],
      numeroPagina,
      isbn,
      ativo,
      new Date(),
      null);
  }
}
  
export default Acervo;  