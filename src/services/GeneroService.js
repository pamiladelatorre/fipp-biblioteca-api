import Genero from "../models/Genero.js";
import GeneroDAO from "../data/GeneroDAO.js";
import { notFoundIfNull, notFoundIfEmpty, normalizeToBit } from '../utils/ServiceHelpers.js';
import { Result } from '../utils/Result.js';

class GeneroService {
    async adicionar({ descricao }){
        const novoGenero = Genero.criar(descricao);
        const genero = await GeneroDAO.inserir(novoGenero);
        return Result.ok(genero);
    }

    async obterPorId(id){
        const genero = await GeneroDAO.buscarPorId(id);
        return notFoundIfNull(genero, 'Genero');
    }

    async alterar({ id, descricao, ativo }){
        const genero = await GeneroDAO.buscarPorId(id);
        const validacao = notFoundIfNull(genero, 'Genero');
        if (validacao.isFailure) return validacao;

        genero.alterar(descricao, ativo);
        await GeneroDAO.atualizar(genero);
        return Result.ok(genero);
    }

    async alterarStatusAtivo(id, ativo){
        const genero = await GeneroDAO.buscarPorId(id);
        const validacao = notFoundIfNull(genero, 'Genero');
        if (validacao.isFailure) return validacao;

        genero.alterarAtivo(ativo);
        await GeneroDAO.atualizar(genero);
        return Result.ok();
    }

    async obterPorFiltro({ descricao, ativo }) {
        const filtro = {
            ...(descricao && { descricao: { valor: descricao, like: true } }),
            ...(ativo !== undefined && { ativo: { valor: normalizeToBit(ativo) } })
        };
        const generos = await CategoriaDAO.buscarPorFiltro(filtro);
        return notFoundIfEmpty(generos, 'Genero');
    }
}

export default new GeneroService();