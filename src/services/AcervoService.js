import Acervo from "../models/Acervo.js";
import AcervoDAO from "../data/AcervoDAO.js";
import { notFoundIfNull, notFoundIfEmpty, normalizeToBit } from '../utils/ServiceHelpers.js';
import { Result } from '../utils/Result.js';

class AcervoService {
    async adicionar(payload){
        const novoAcervo = Acervo.criar({ ...payload });
        const acervo = await AcervoDAO.inserir(novoAcervo);
        return Result.ok(acervo);
    }

    async obterPorId(id){
        const acervo = await AcervoDAO.buscarPorId(id);
        return notFoundIfNull(acervo, 'Acervo');
    }

    async alterar(id, payload){
        const acervo = await AcervoDAO.buscarPorId(id);
        const validacao = notFoundIfNull(acervo, 'Acervo');
        if (validacao.isFailure()) return validacao;

        acervo.alterar({ ...payload })
        await AcervoDAO.atualizar(acervo);
        return Result.ok(acervo);
    }

    async alterarStatusAtivo(id, ativo){
        const acervo = await AcervoDAO.buscarPorId(id);
        const validacao = notFoundIfNull(acervo, 'Acervo');
        if (validacao.isFailure()) return validacao;

        acervo.alterarAtivo(ativo);
        await AcervoDAO.atualizar(ativo);
        return Result.ok();
    }

    async obterPorFiltro({ titulo, ativo }){
        const filtro = {
            ...(titulo && { titulo: { valor: titulo, like: true } }),
            ...(ativo !== undefined && ativo !== '' && { ativo: { valor: normalizeToBit(ativo) } })
        };
        const acervos = await AcervoDAO.buscarPorFiltro(filtro);
        return notFoundIfEmpty(acervos, 'Categoria', 'a');
    }
}

export default new AcervoService();