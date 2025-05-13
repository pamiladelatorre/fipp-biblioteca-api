import Fornecedor from "../models/Fornecedor.js";
import FornecedorDAO from "../data/FornecedorDAO.js";
import { notFoundIfNull, notFoundIfEmpty, normalizeToBit } from '../utils/ServiceHelpers.js';
import { Result } from '../utils/Result.js';

class FornecedorService {
    async adicionar(payload){
        const novoFornecedor = Fornecedor.criar({ ...payload });
        const fornecedor = await FornecedorDAO.inserir(novoFornecedor);
        return Result.ok(fornecedor);
    }

    async obterPorId(id){
        const fornecedor = await FornecedorDAO.buscarPorId(id);
        return notFoundIfNull(fornecedor, 'Fornecedor');
    }

    async alterar(id, payload){
        const fornecedor = await FornecedorDAO.buscarPorId(id);
        const validacao = notFoundIfNull(categoria, 'Fornecedor');
        if (validacao.isFailure) return validacao;

        fornecedor.alterar({ ...payload });
        await FornecedorDAO.atualizar(fornecedor)
        return Result.ok(fornecedor);
    }

    async alterarStatusAtivo(id, ativo){
        const fornecedor = await FornecedorDAO.buscarPorId(id);
        const validacao = notFoundIfNull(categoria, 'Fornecedor');
        if (validacao.isFailure) return validacao;

        fornecedor.alterarAtivo(ativo);
        await FornecedorDAO.atualizarAtivo(fornecedor);
        return Result.ok();
    }

    async obterPorFiltro({ descricao, ativo }){
        const filtro = {
            ...(descricao && { descricao: { valor: descricao, like: true } }),
            ...(ativo !== undefined && { ativo: { valor: normalizeToBit(ativo) } })
        };
        const fornecedores = await FornecedorDAO.buscarPorFiltro(filtro);
        return notFoundIfEmpty(fornecedores, 'Fornecedor');
    }
}

export default new FornecedorService();