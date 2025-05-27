import Autor from "../models/Autor.js";
import AutorDAO from "../data/AutorDAO.js";
import { notFoundIfNull, notFoundIfEmpty, normalizeToBit  } from '../utils/ServiceHelpers.js';
import { Result } from '../utils/Result.js';

class AutorService {
    async adicionar(payload){
        const novoAutor = Autor.criar({ ...payload });
        const autor = await AutorDAO.inserir(novoAutor);
        return Result.ok(autor);
    }

    async obterPorId(id){
        const autor = await AutorDAO.buscarPorId(id);
        return notFoundIfNull(autor, 'Autor');
    }

    async alterar(id, payload){
        const autor = await AutorDAO.buscarPorId(id);
        const validacao = notFoundIfNull(autor, 'Autor');
        if (validacao.isFailure()) return validacao;

        autor.alterar({ ...payload });
        await AutorDAO.atualizar(autor);
        return Result.ok(autor);
    }

    async alterarStatusAtivo(id, ativo){
        const autor = await AutorDAO.buscarPorId(id);
        const validacao = notFoundIfNull(autor, Autor);
        if (validacao.isFailure()) return validacao;

        autor.alterarAtivo(ativo);
        await AutorDAO.atualizar(autor);
        return Result.ok();
    }

    async obterPorFiltro({ nome, nacionalidade, ativo }){
        const filtro = {
            ...(nome && { nome: { valor: nome, like: true } }),
            ...(nacionalidade && { nacionalidade: { valor: nacionalidade, like: true } }),
            ...(ativo !== undefined && ativo !== '' && { ativo: { valor: normalizeToBit(ativo) } })
        };
        const autores = await AutorDAO.buscarPorFiltro(filtro);
        return notFoundIfEmpty(autores, 'Autor');
    }
}

export default new AutorService();