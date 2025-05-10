import MotivoBaixa from "../models/MotivoBaixa.js";
import MotivoBaixaDAO from "../data/MotivoBaixaDAO.js";
import { notFoundIfNull, notFoundIfEmpty, normalizeToBit } from '../utils/ServiceHelpers.js';
import { Result } from '../utils/Result.js';

class MotivoBaixaService {
    async adicionar({ descricao }){
        const novoMotivoBaixa = MotivoBaixa.criar(descricao);
        const motivoBaixa = await MotivoBaixaDAO.inserir(novoMotivoBaixa);
        return Result.ok(motivoBaixa);
    }

    async obterPorId(id){
        const motivoBaixa = await MotivoBaixaDAO.buscarPorId(id);
        return notFoundIfNull(motivoBaixa, 'Motivo baixa');
    }

    async alterar({ id, descricao, ativo }){
        const motivoBaixa = await MotivoBaixaDAO.buscarPorId(id);
        const validacao = notFoundIfNull(motivoBaixa, 'Motivo baixa');
        if (validacao.isFailure) return validacao;

        motivoBaixa.atualizar(descricao, ativo);
        await MotivoBaixaDAO.atualizar(motivoBaixa);
        return Result.ok();
    }

    async alterarStatusAtivo(id, ativo){
        const motivoBaixa = await MotivoBaixaDAO.buscarPorId(id);
        const validacao = notFoundIfNull(motivoBaixa, 'Motivo baixa');
        if (validacao.isFailure) return validacao;

        motivoBaixa.alterarAtivo(ativo);
        await MotivoBaixaDAO.atualizar(motivoBaixa);
        return Result.ok();
    }

    async obterPorFiltro({ descricao, ativo }){
        const filtro = {
            ...(descricao && { descricao: { valor: descricao, like: true } }),
            ...(ativo !== undefined && { ativo: { valor: normalizeToBit(ativo) } })
        };
        const motivosBaixas = await CategoriaDAO.buscarPorFiltro(filtro);
        return notFoundIfEmpty(motivosBaixas, 'Motivo baixa');
    }
}

export default new MotivoBaixaService();