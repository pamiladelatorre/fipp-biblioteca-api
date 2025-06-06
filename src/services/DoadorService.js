import Doador from '../models/Doador.js';
import DoadorDAO from '../data/DoadorDAO.js';
import { notFoundIfNull, notFoundIfEmpty, normalizeToBit } from '../utils/ServiceHelpers.js';
import { Result } from '../utils/Result.js';

class DoadorService {   
        async adicionar(payload){
        const novoDoador = Doador.criar({ ...payload });
        const doador = await DoadorDAO.inserir(novoDoador);
        return Result.ok(doador);
    }

    async obterPorId(id) {
        const doador = await DoadorDAO.buscarPorId(id);
        return notFoundIfNull(doador, 'Doador', 'o');
    }

    async alterar(id, payload) {
        const doador = await DoadorDAO.buscarPorId(id);
        const validacao = notFoundIfNull(doador, 'Doador', 'o');
        if (validacao.isFailure()) return validacao;

        doador.alterar({ ...payload });
        await DoadorDAO.atualizar(doador);
        return Result.ok( doador);
    }

    async alterarStatusAtivo(id, ativo) {
        const doador = await DoadorDAO.buscarPorId(id);
        const validacao = notFoundIfNull(doador, 'Doador', 'o');
        if (validacao.isFailure()) return validacao;

        doador.alterarAtivo(ativo);
        await DoadorDAO.atualizar(doador);
        return Result.ok();
    }

    async obterPorFiltro({ nome, documento, ativo }){
        const filtro = {
            ...(nome && { nome: { valor: nome, like: true } }),
            ...(documento && { documento: { valor: documento, like: true } }),
            ...(ativo !== undefined && ativo !== '' && { ativo: { valor: normalizeToBit(ativo) } })
        };
        const doadores = await DoadorDAO.buscarPorFiltro(filtro);
        return notFoundIfEmpty(doadores, 'Doador', 'o');
    }
}

export default new DoadorService();