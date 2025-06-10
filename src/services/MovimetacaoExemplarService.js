import MovimetacaoExemplar from "../models/MovimetacaoExemplar.js";
import MovimetacaoExemplarDAO from "../data/MovimetacaoExemplarDAO.js";
import { notFoundIfNull, notFoundIfEmpty, normalizeToBit } from '../utils/ServiceHelpers.js';
import { Result } from '../utils/Result.js';

class MovimetacaoExemplarService {

    async obterPorFiltro({ exemplarId, usuarioId, etapa, status, dataInicio, dataPrevista, dataFim }){
        const filtro = {
            ...(exemplarId && { exemplarId: { valor: exemplarId } }),
            ...(usuarioId && { usuarioId: { valor: usuarioId } }),
            ...(etapa && { etapa: { valor: etapa } }),
            ...(status && { status: { valor: status } }),
            ...(dataInicio && { dataInicio: { valor: dataInicio } }),
            ...(dataPrevista && { dataPrevista: { valor: dataPrevista } }),
            ...(dataFim && { dataFim: { valor: dataFim } })
        };
        const movimentacoesExemplar = await MovimetacaoExemplarDAO.buscarPorFiltro(filtro);
        return notFoundIfEmpty(movimentacoesExemplar, 'MovimetacaoExemplar');
    }
}

export default new MovimetacaoExemplarService();