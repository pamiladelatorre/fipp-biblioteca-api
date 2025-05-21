import GeneroService from "../services/GeneroService.js";
import { handleResult } from '../middlewares/handleResult.js';
import { asyncWrapper } from '../utils/asyncWrapper.js';

class GeneroController {
    // Criar um novo gênero
    adicionar = asyncWrapper(async (req, res) => {
        const result = await GeneroService.adicionar(req.body);
        return handleResult(result, res, 201); // 201: Created
    });    

    // Buscar gênero pelo ID
    obterPorId = asyncWrapper(async (req, res) => {
        const { id } = req.params;
        const result = await GeneroService.obterPorId(id);
        return handleResult(result, res); // 200: Success
    });

    // Alterar gênero pelo ID
    alterar = asyncWrapper(async (req, res) => {
        const { id } = req.params;
        const result = await GeneroService.alterar(id, req.body);
        return handleResult(result, res); // 200: Success
    });

    // Alterar o status de ativo do gênero pelo ID 
    alterarStatusAtivo = asyncWrapper(async (req, res) => {
        const { id } = req.params;
        const { ativo } = req.body;
        const result = await GeneroService.alterarStatusAtivo(id, ativo);
        return handleResult(result, res, 204); // 204: No Content
    });
    
    // Buscar os gêneros por filtro
    obterPorFiltro = asyncWrapper(async (req, res) => {
        const result = await GeneroService.obterPorFiltro(req.query);
        return handleResult(result, res); // 200: Success
    });

    // Buscar os gêneros ativas
    obterAtivas = asyncWrapper(async (req, res) => {
        const result = await GeneroService.obterPorFiltro({ ativo: true });
        return handleResult(result, res); // 200: Success
    });
}

export default new GeneroController();
