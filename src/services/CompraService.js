import Compra from "../models/Compra.js";
import CompraDAO from "../data/CompraDAO.js";
import { notFoundIfNull, notFoundIfEmpty, normalizeToBit } from '../utils/ServiceHelpers.js';
import { Result } from '../utils/Result.js';

class CompraService {

    async obterPorFiltro({ cnpj, razaoSocial, tipoPagamento, tipoProduto, empenho, status }){
        const filtro = {
            ...(cnpj && { cnpj: { valor: cnpj, like: true } }),
            ...(razaoSocial && { razaoSocial: { valor: razaoSocial, like: true } }),
            ...(tipoPagamento && { tipoPagamento: { valor: tipoPagamento } }),
            ...(tipoProduto && { tipoProduto: { valor: tipoProduto } }),
            ...(empenho && { numeroEmpenho: { valor: empenho, like: true } }),
            ...(status && { status: { valor: status } })
        };
        const compras = await CompraDAO.buscarPorFiltro(filtro);
        return notFoundIfEmpty(compras, 'Compra');
    }
}

export default new CompraService();