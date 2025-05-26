import Fornecedor from "../models/Fornecedor.js";
import FornecedorDAO from "../data/FornecedorDAO.js";
import { notFoundIfNull, notFoundIfEmpty, normalizeToBit } from '../utils/ServiceHelpers.js';
import { Result } from '../utils/Result.js';
import { errorFactory } from "../utils/errorFactory.js";

class FornecedorService {
    async adicionar(payload){
        const { cnpj } = payload;
        const fornecedorExistente = await FornecedorDAO.buscarPorCnpj(cnpj);
        if (fornecedorExistente) {
            return Result.fail(errorFactory('ValidationError', 'Já existe um fornecedor com este CNPJ.'));
        }

        const novoFornecedor = Fornecedor.criar({ ...payload });

        const { metodosPagamento, generos } = payload;
        metodosPagamento.forEach(item => {
            novoFornecedor.adicionarMetodoPagamento({ ...item })
        });

        novoFornecedor.definirGeneros(generos);
        
        const fornecedor = await FornecedorDAO.inserir(novoFornecedor);
        return Result.ok(fornecedor);
    }

    async obterPorId(id){
        const fornecedor = await FornecedorDAO.buscarPorId(id);
        return notFoundIfNull(fornecedor, 'Fornecedor');
    }

    async alterar(id, payload){
        const { metodosPagamento, generos } = payload;

        const fornecedor = await FornecedorDAO.buscarPorId(id);

        const validacao = notFoundIfNull(fornecedor, 'Fornecedor');
        if (validacao.isFailure()) return validacao;

        // IDs recebidos (que vieram no payload)
        const idsRecebidos = new Set(
            metodosPagamento.map(m => m.id).filter(id => id !== null)
        );        

        const validaRemocao = await this.#validarRemocaoDeMetodosComCompra(id, idsRecebidos);
        if (validaRemocao.isFailure()) return validacao;

        fornecedor.alterar({ ...payload });

        // 1. Adicionar novos (sem id)
        metodosPagamento.filter(m => m.id === null).forEach(m => fornecedor.adicionarMetodoPagamento(m));

        // 2. Alterar existentes
        metodosPagamento.filter(m => m.id !== null).forEach(m => fornecedor.alterarMetodoPagamento(m));

        // 3. Remover métodos que estavam antes e não vieram mais
        fornecedor.metodosPagamento
            .filter(m => m.id !== null && !idsRecebidos.has(m.id))
            .forEach(m => fornecedor.removerMetodoPagamento(m.id));

        fornecedor.definirGeneros(generos);
        
        await FornecedorDAO.atualizar(fornecedor)
        return Result.ok(fornecedor);
    }

    async alterarStatusAtivo(id, ativo){
        const fornecedor = await FornecedorDAO.buscarPorId(id);
        const validacao = notFoundIfNull(categoria, 'Fornecedor');
        if (validacao.isFailure()) return validacao;

        fornecedor.alterarAtivo(ativo);
        await FornecedorDAO.atualizarAtivo(fornecedor);
        return Result.ok();
    }

    async obterPorFiltro({ cnpj, razaoSocial, representante, telefone, email, ativo }){
        const filtro = {
            ...(cnpj && { cnpj: { valor: cnpj, like: true } }),
            ...(razaoSocial && { razaoSocial: { valor: razaoSocial, like: true } }),
            ...(representante && { representante: { valor: representante, like: true } }),
            ...(telefone && { telefone: { valor: telefone, like: true } }),
            ...(email && { email: { valor: email, like: true } }),
            ...(ativo !== undefined && ativo !== '' && { ativo: { valor: normalizeToBit(ativo) } })
        };
        const fornecedores = await FornecedorDAO.buscarPorFiltro(filtro);
        return notFoundIfEmpty(fornecedores, 'Fornecedor');
    }

    async #validarRemocaoDeMetodosComCompra(fornecedorId, idsRecebidos) {
        // Busca do banco os métodos com compra associada
        const metodosPagamentoComCompra = await FornecedorDAO.buscarMetodosPagamentoComCompra(fornecedorId) || [];

        // IDs dos métodos que têm compras
        const idsComCompra = metodosPagamentoComCompra.map(m => m.id);

        // Verifica se algum método com compra foi removido
        const metodoRemovido = idsComCompra.some(id => !idsRecebidos.has(id));

        if (metodoRemovido) {
            return Result.fail(
                errorFactory('ValidationError', 'Não é possível remover meios de pagamento que já foram utilizados em compras.')
            );
        }

        return Result.ok();
  }
}

export default new FornecedorService();