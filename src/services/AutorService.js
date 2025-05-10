import Autor from "../models/Autor.js";
import AutorDAO from "../data/AutorDAO.js";
import { notFoundIfNull, notFoundIfEmpty, normalizeToBit  } from '../utils/ServiceHelpers.js';
import { Result } from '../utils/Result.js';

class AutorService {
    async adicionar({ nome, nacionalidade, dataNascimento, biografia }){
        const novoAutor = Autor.criar(nome, nacionalidade, dataNascimento, biografia);
        const autor = await AutorDAO.inserir(novoAutor);
        return Result.ok(autor);
    }

    async obterPorId(id){
        const autor = await AutorDAO.buscarPorId(id);
        return notFoundIfNull(autor, 'Autor');
    }

    async alterar({ id, nome, nacionalidade, dataNascimento, biografia, ativo }){
        const autor = await AutorDAO.buscarPorId(id);
        const validacao = notFoundIfNull(autor, 'Autor');
        if (validacao.isFailure) return validacao;

        autor.alterar(nome, nacionalidade, dataNascimento, biografia, ativo);
        await AutorDAO.atualizar(autor);
        return Result.ok(autor);
    }

    async alterarStatusAtivo(id, ativo){
        const autor = await AutorDAO.buscarPorId(id);
        const validacao = notFoundIfNull(autor, Autor);
        if (validacao.isFailure) return validacao;

        autor.alterarAtivo(ativo);
        await AutorDAO.atualizar(autor);
        return Result.ok();
    }

    async obterPorFiltro({ descricao, ativo }){
        const filtro = {
            ...(descricao && { descricao: { valor: descricao, like: true } }),
            ...(ativo !== undefined && { ativo: { valor: normalizeToBit(ativo) } })
        };
        const autores = await AutorDAO.buscarPorFiltro(filtro);
        return notFoundIfEmpty(autores, 'Autor');
    }
}

export default new AutorService();