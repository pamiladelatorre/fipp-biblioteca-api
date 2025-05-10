import Categoria from "../models/Categoria.js";
import CategoriaDAO from "../data/CategoriaDAO.js";
import { notFoundIfNull, notFoundIfEmpty, normalizeToBit } from '../utils/ServiceHelpers.js';
import { Result } from '../utils/Result.js';

class CategoriaService {
    async adicionar({ descricao }){
        const novaCategoria = Categoria.criar(descricao);
        const categoria = await CategoriaDAO.inserir(novaCategoria);
        return Result.ok(categoria);
    }

    async obterPorId(id) {
        const categoria = await CategoriaDAO.buscarPorId(id);
        return notFoundIfNull(categoria, 'Categoria', 'a');
    }

    async alterar({ id, descricao, ativo }) {
        const categoria = await CategoriaDAO.buscarPorId(id);
        const validacao = notFoundIfNull(categoria, 'Categoria', 'a');
        if (validacao.isFailure) return validacao;

        categoria.alterar(descricao, ativo);
        await CategoriaDAO.atualizar(categoria);
        return Result.ok(categoria);
    }

    async alterarStatusAtivo(id, ativo) {
        const categoria = await CategoriaDAO.buscarPorId(id);
        const validacao = notFoundIfNull(categoria, 'Categoria', 'a');
        if (validacao.isFailure) return validacao;

        categoria.alterarAtivo(ativo);
        await CategoriaDAO.atualizar(categoria);
        return Result.ok();
    }

    async obterPorFiltro({ descricao, ativo }){
        const filtro = {
            ...(descricao && { descricao: { valor: descricao, like: true } }),
            ...(ativo !== undefined && { ativo: { valor: normalizeToBit(ativo) } })
        };
        const categorias = await CategoriaDAO.buscarPorFiltro(filtro);
        return notFoundIfEmpty(categorias, 'Categoria', 'a');
    }
}

export default new CategoriaService();