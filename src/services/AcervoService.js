import Acervo from "../models/Acervo.js";
import AcervoDAO from "../data/AcervoDAO.js";
import { notFoundIfNull, notFoundIfEmpty, normalizeToBit } from '../utils/ServiceHelpers.js';
import { Result } from '../utils/Result.js';

class AcervoService {
    async adicionar({ categoria, autor, genero, titulo, numeroEdicao, editora, dataPublicacao, numeroPagina, isbn }){
        const novoAcervo = Acervo.criar(categoria, autor, genero, titulo, numeroEdicao, editora, dataPublicacao, numeroPagina, isbn);
        const acervo = await AcervoDAO.inserir(novoAcervo);
        return Result.ok(acervo);
    }

    async obterPorId(id){
        const acervo = await AcervoDAO.buscarPorId(id);
        return notFoundIfNull(acervo, 'Acervo');
    }

    async alterar({ id, categoria, autor, genero, titulo, numeroEdicao, editora, dataPublicacao, numeroPagina, isbn }){
        const acervo = await AcervoDAO.buscarPorId(id);
        const validacao = notFoundIfNull(acervo, 'Acervo');
        if (validacao.isFailure) return validacao;

        acervo.alterar(categoria, autor, genero, titulo, numeroEdicao, editora, dataPublicacao, numeroPagina, isbn)
        await AcervoDAO.atualizar(acervo);
        return Result.ok(acervo);
    }

    async alterarStatusAtivo(id, ativo){
        const acervo = await AcervoDAO.buscarPorId(id);
        const validacao = notFoundIfNull(acervo, 'Acervo');
        if (validacao.isFailure) return validacao;

        acervo.alterarAtivo(ativo);
        await AcervoDAO.atualizar(ativo);
        return Result.ok();
    }

    async obterPorFiltro({ descricao, ativo }){
        const filtro = {
            ...(descricao && { descricao: { valor: descricao, like: true } }),
            ...(ativo !== undefined && { ativo: { valor: normalizeToBit(ativo) } })
        };
        const acervos = await AcervoDAO.buscarPorFiltro(filtro);
        return notFoundIfEmpty(acervos, 'Categoria', 'a');
    }
}

export default new AcervoService();