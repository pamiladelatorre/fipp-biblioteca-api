import EntradaAcervo from "../models/EntradaAcervo.js";
import EntradaAcervoDAO from "../data/EntradaAcervoDAO.js";
import { notFoundIfNull, notFoundIfEmpty, normalizeToBit } from '../utils/ServiceHelpers.js';
import { Result } from '../utils/Result.js';

class EntradaAcervoService {

    async obterPorFiltro({ acervo, origem, contrato, empenho, doador }){
        const filtro = {
            ...(acervo && { titulo: { valor: acervo, like: true } }),
            ...(origem && { tipoOrigem: { valor: origem } }),
            ...(empenho && { numeroEmpenho: { valor: empenho, like: true } }),
            ...(contrato && { numero_contrato: { valor: contrato, like: true  } }),
            ...(doador && { nome: { valor: doador, like: true  } })
        };
        const entradasAcervo = await EntradaAcervoDAO.buscarPorFiltro(filtro);
        return notFoundIfEmpty(entradasAcervo, 'EntradaAcervo');
    }
}

export default new EntradaAcervoService();