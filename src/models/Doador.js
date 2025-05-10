import Entity from "./Entity.js";

class Doador extends Entity  {
  #tipoPessoa;
  #nome;
  #documento;
  #email;
  #telefone;
  #endereco;
  #ativo;
  
  constructor(id, tipoPessoa, nome, documento, email, telefone, endereco, ativo, dataCriacao, dataAlteracao) {
    if (new.target !== Doador) {
      throw new Error(`Use ${new.target.name}.criar()`);
    }
    super(id, dataCriacao, dataAlteracao);
    this.#tipoPessoa = tipoPessoa;
    this.#nome = nome;
    this.#documento = documento;
    this.#email = email;
    this.#telefone = telefone;
    this.#endereco = endereco;
    this.#ativo = ativo;
  }
  
  // Getters
  get tipoPessoa() { return this.#tipoPessoa; }
  get nome() { return this.#nome; }
  get documento() { return this.#documento; }
  get email() { return this.#email; }
  get telefone() { return this.#telefone; }
  get endereco() { return this.#endereco; }
  get ativo() { return this.#ativo; }
  
  // Alteração dos dados
  alterar(tipoPessoa, nome, documento, email, telefone, endereco, ativo) {
    this.#tipoPessoa = tipoPessoa;
    this.#nome = nome;
    this.#documento = documento;
    this.#email = email;
    this.#telefone = telefone;
    this.#endereco = endereco;
    this.#ativo = ativo;
    this.dataAlteracao = new Date();
  }

  // Alteração do status ativo
  alterarAtivo(ativo) {
    this.#ativo = ativo;
    this.dataAlteracao = new Date();
  }
  
  // Fábrica para criação
  static criar(tipoPessoa, nome, documento, email, telefone, endereco) {
    return new Doador(null, tipoPessoa, nome, documento, email, telefone, endereco, true, new Date(), null);
  }
}
  
export default Doador;