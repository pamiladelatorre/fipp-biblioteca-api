import Exemplar from "../models/Exemplar.js";
import ExemplarDAO from "../data/ExemplarDAO.js";
import MotivoBaixaDAO from "../data/MotivoBaixaDAO.js";
import { notFoundIfNull, notFoundIfEmpty, normalizeToBit } from '../utils/ServiceHelpers.js';
import { Result } from '../utils/Result.js';
import { errorFactory } from "../utils/errorFactory.js";

class ExemplarService {

    async obterPorId(id){
        const exemplar = await ExemplarDAO.buscarPorId(id);
        return notFoundIfNull(exemplar, 'Exemplar');
    }

    async alterarEstado(id, estado){
        const exemplar = await ExemplarDAO.buscarPorId(id);
        const validacao = notFoundIfNull(exemplar, 'Exemplar');
        if (validacao.isFailure()) return validacao;

        if(exemplar.status == 'baixado'){
            return Result.fail(errorFactory(
                'ValidationError', 
                'A alteração do estado não é permitida porque este exemplar já foi baixado do acervo.'
            ));
        }

        exemplar.alterarEstado(estado)
        await ExemplarDAO.atualizar(exemplar);
        return Result.ok(exemplar);
    }

    async baixar(id, payload){
        const exemplar = await ExemplarDAO.buscarPorId(id);
        const validacao = notFoundIfNull(exemplar, 'Exemplar');
        if (validacao.isFailure()) return validacao;

        const { motivoBaixaId } = payload;
        const motivoBaixa = await MotivoBaixaDAO.buscarPorId(motivoBaixaId);
        const validacaoMotivo = notFoundIfNull(motivoBaixa, 'Motivo baixa');
        if (validacaoMotivo.isFailure()) return validacaoMotivo;

        if(exemplar.status != 'disponivel'){
            return Result.fail(errorFactory(
                'ValidationError', 
                'A baixa não pode ser realizada porque o exemplar não está disponível.'
            ));
        }
        
        exemplar.baixar(payload)
        await ExemplarDAO.atualizar(exemplar);
        return Result.ok(exemplar);
    }

    async obterPorFiltro({ acervo, tombo, status, estado }){
        const filtro = {
            ...(acervo && { titulo: { valor: acervo, like: true } }),
            ...(tombo && { tombo: { valor: tombo, like: true } }),
            ...(status && { status: { valor: status } }),
            ...(estado && { estado: { valor: estado } })
        };
        const exemplares = await ExemplarDAO.buscarPorFiltro(filtro);
        return notFoundIfEmpty(exemplares, 'Exemplar');
    }

    async listarParaRelatorio() {
        return await ExemplarDAO.listarParaRelatorio();
    }
}





export default new ExemplarService();