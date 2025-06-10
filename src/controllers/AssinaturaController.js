import AssinaturaService from "../services/AssinaturaService.js";
import { handleResult } from '../middlewares/handleResult.js';
import { asyncWrapper } from '../utils/asyncWrapper.js';

class AssinaturaController {
    // Criar uma nova assinatura
    adicionar = asyncWrapper(async (req, res) => {
        const result = await AssinaturaService.adicionar(req.body);
        return handleResult(result, res, 201); // 201: Created
    });

    // Buscar assinatura por ID
    obterPorId = asyncWrapper(async (req, res) => {
        const { id } = req.params;
        const result = await AssinaturaService.obterPorId(id);
        return handleResult(result, res); // 200: Success
    });

    // Alterar assinatura pelo ID
    alterar = asyncWrapper(async (req, res) => {
        const { id } = req.params;
        const result = await AssinaturaService.alterar(id, req.body);
        return handleResult(result, res); // 200: Success
    });

    // Alterar status ativo da assinatura
    alterarStatusAtivo = asyncWrapper(async (req, res) => {
        const { id } = req.params;
        const { ativo } = req.body;
        const result = await AssinaturaService.alterarStatusAtivo(id, ativo);
        return handleResult(result, res, 204); // 204: No Content
    });

    // Buscar assinaturas por filtro
    obterPorFiltro = asyncWrapper(async (req, res) => {
        const result = await AssinaturaService.obterPorFiltro(req.query);
        return handleResult(result, res); // 200: Success
    });

    // Buscar assinaturas ativas
    obterAtivas = asyncWrapper(async (req, res) => {
        const result = await AssinaturaService.obterPorFiltro({ ativo: true });
        return handleResult(result, res); // 200: Success
    });
}

export default new AssinaturaController();
