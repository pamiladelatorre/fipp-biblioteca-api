import BaseDAO from './BaseDAO.js';
import Acervo from '../models/Acervo.js';

class AcervoDAO extends BaseDAO {
    constructor() {
        if (AcervoDAO.#instance) return AcervoDAO.#instance; // Singleton interno: impede múltiplas instâncias mesmo com "new"
        super("categorias"); // Passando nome da tabela para o construtor do BaseDAO
        AcervoDAO.#instance = this; // Armazena a instância
    }

    static #instance;

    static getInstance() {
      return BaseDAO.getInstance(AcervoDAO);
    }

    mapRowToEntity(row) {
        return new Acervo(
            row.id, 
            row.autor_id, 
            row.genero_id, 
            row.categoria_id, 
            row.titulo, 
            row.numero_edicao, 
            row.editora, 
            row.data_publicacao, 
            row.numero_pagina, 
            row.isbn,
            row.ativo, 
            row.data_criacao, 
            row.data_alteracao
        );
    } 
}

// Exporta instância padrão
export default AcervoDAO.getInstance();