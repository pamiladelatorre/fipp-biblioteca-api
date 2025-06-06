import DoadorService from "../services/DoadorService.js";
import { handleResult } from '../middlewares/handleResult.js';
import { asyncWrapper } from '../utils/asyncWrapper.js';

class DoadorController { 
    
    // Criar um novo doador
    adicionar = asyncWrapper(async (req, res) => {
        const result = await DoadorService.adicionar(req.body);
        return handleResult(result, res, 201); // 201: Created
    })

     // Buscar um doador pelo ID
    obterPorId = asyncWrapper(async (req, res) => {
        const { id } = req.params;
        const result = await DoadorService.obterPorId(id);
        return handleResult(result, res); // 200: Success
    })

    // Alterar um doador pelo ID
    alterar = asyncWrapper(async (req, res) => {
        const { id } = req.params;
        const result = await DoadorService.alterar(id, req.body);
        return handleResult(result, res); // 200: Success
    })

     // Alterar o status de ativo do doador pelo ID 
    alterarStatusAtivo = asyncWrapper(async (req, res) => {
        const { id } = req.params;
        const { ativo } = req.body;
        const result = await DoadorService.alterarStatusAtivo(id, ativo);
        return handleResult(result, res, 204); // 204: No Content
    })

     // Buscar os doadores por filtro
    obterPorFiltro = asyncWrapper(async (req, res) => {
        const result = await DoadorService.obterPorFiltro(req.query);
        return handleResult(result, res); // 200: Success
    })

    // Buscar os doadores ativos
    obterAtivas = asyncWrapper(async (req, res) => {
        const result = await DoadorService.obterPorFiltro({ ativo: true });
        return handleResult(result, res); // 200: Success
    })
}

export default new DoadorController();