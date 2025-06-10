import Assinatura from "../models/Assinatura.js";
import AssinaturaDAO from "../data/AssinaturaDAO.js";
import { notFoundIfNull, notFoundIfEmpty, normalizeToBit } from '../utils/ServiceHelpers.js';
import { Result } from '../utils/Result.js';
import { errorFactory } from "../utils/errorFactory.js";

class AssinaturaService {
    async adicionar(payload) {
        const { nome } = payload;
        const assinaturaExistente = await AssinaturaDAO.buscarPorNome(nome);
        if (assinaturaExistente) {
            return Result.fail(errorFactory('ValidationError', 'Já existe uma assinatura com este nome.'));
        }

        const novaAssinatura = Assinatura.criar({ ...payload });
        const assinatura = await AssinaturaDAO.inserir(novaAssinatura);
        return Result.ok(assinatura);
    }

    async obterPorId(id) {
        const assinatura = await AssinaturaDAO.buscarPorId(id);
        return notFoundIfNull(assinatura, 'Assinatura');
    }

    async alterar(id, payload) {
        const assinatura = await AssinaturaDAO.buscarPorId(id);
        const validacao = notFoundIfNull(assinatura, 'Assinatura');
        if (validacao.isFailure()) return validacao;

        assinatura.alterar({ ...payload });

        await AssinaturaDAO.atualizar(assinatura);
        return Result.ok(assinatura);
    }

    async alterarStatusAtivo(id, ativo) {
        const assinatura = await AssinaturaDAO.buscarPorId(id);
        const validacao = notFoundIfNull(assinatura, 'Assinatura');
        if (validacao.isFailure()) return validacao;

        assinatura.alterarAtivo(ativo);
        await AssinaturaDAO.atualizarAtivo(assinatura);
        return Result.ok();
    }

    async obterPorFiltro({ nome, descricao, ativo }) {
        const filtro = {
            ...(nome && { nome: { valor: nome, like: true } }),
            ...(descricao && { descricao: { valor: descricao, like: true } }),
            ...(ativo !== undefined && ativo !== '' && { ativo: { valor: normalizeToBit(ativo) } })
        };

        const assinaturas = await AssinaturaDAO.buscarPorFiltro(filtro);
        return notFoundIfEmpty(assinaturas, 'Assinatura');
    }


}

function formatarDataParaMySQL(data) {
  if (!data) return null;
  return new Date(data).toISOString().split('T')[0]; // "2025-06-02"
}



export default new AssinaturaService();
