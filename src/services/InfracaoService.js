import Infracao from "../models/Infracao.js";
import InfracaoDAO from "../data/InfracaoDAO.js";
import { notFoundIfNull, notFoundIfEmpty, normalizeToBit } from '../utils/ServiceHelpers.js';
import { Result } from '../utils/Result.js';

class InfracaoService {

    async obterPorFiltro({ usuario, tipo, grau, status, dataInicio, dataFim }){
        const filtro = {
            ...(usuario && { nome: { valor: usuario, like: true } }),
            ...(tipo && { tipoInfracao: { valor: tipo } }),
            ...(grau && { grauInfracao: { valor: grau } }),
            ...(status && { status: { valor: status } }),
            ...(dataInicio && { dataInicio: { valor: dataInicio } }),
            ...(dataFim && { dataFim: { valor: dataFim } })
        };
        const infracoes = await InfracaoDAO.buscarPorFiltro(filtro);
        return notFoundIfEmpty(infracoes, 'Infracao');
    }
}

export default new InfracaoService();