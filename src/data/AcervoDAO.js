import BaseDAO from './BaseDAO.js';
import { query } from '../infra/database.js';
import Acervo from '../models/Acervo.js';
import Autor from '../models/Autor.js';
import Genero from '../models/Genero.js';
import Categoria from '../models/Categoria.js';

class AcervoDAO extends BaseDAO {
    constructor() {
        super("acervos"); // Nome da tabela
    }

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
            row.data_alteracao,
            new Autor(row.autor_id, row.autor),
            new Genero(row.genero_id, row.genero),
            new Categoria(row.categoria_id, row.categoria)
        );
    } 

    async buscarPorId(id) {
        const sql = `
            SELECT 
                ac.*,
                au.nome AS autor,
                g.descricao AS genero,
                c.descricao AS categoria
            FROM acervos ac
                INNER JOIN autores au ON au.id = ac.autor_id
                INNER JOIN generos g ON g.id = ac.genero_id
                INNER JOIN categorias c ON c.id = ac.categoria_id
            WHERE
                ac.id = ?`;

        const [row] = await query(sql, [id]);
        return row ? this.mapRowToEntity(row) : null;
    }

    async inserir(model, conn = null) {
        const acervo = super.inserir(model, conn, ['id', 'autor', 'genero', 'categoria']);
        return acervo;
    }

    async atualizar(model, conn = null) {
        const acervo = super.atualizar(model, conn, ['dataCriacao', 'autor', 'genero', 'categoria']);
        return acervo;
    }
}

// Exporta instância padrão
export default AcervoDAO.getInstance();