import AutorService from "../services/AutorService.js";
import { handleResult } from '../middlewares/handleResult.js';
import { asyncWrapper } from '../utils/asyncWrapper.js';

class AutorController {
    // Criar um novo autor
    adicionar = asyncWrapper(async (req, res) => {
        const result = await AutorService.adicionar(req.body);
        return handleResult(result, res, 201); // 201: Created
    });    

    // Buscar autor pelo ID
    obterPorId = asyncWrapper(async (req, res) => {
        const { id } = req.params;
        const result = await AutorService.obterPorId(id);
        return handleResult(result, res); // 200: Success
    });

    // Alterar autor pelo ID
    alterar = asyncWrapper(async (req, res) => {
        const { id } = req.params;
        const result = await AutorService.alterar({ id, ...req.body });
        return handleResult(result, res); // 200: Success
    });

   // Alterar o status de ativo do autor pelo ID  
    alterarStatusAtivo = asyncWrapper(async (req, res) => {
        const { id } = req.params;
        const { ativo } = req.body;
        const result = await AutorService.alterarStatusAtivo(id, ativo);
        return handleResult(result, res, 204); // 204: No Content
    });
    
     // Buscar os autores por filtro
    obterPorFiltro = asyncWrapper(async (req, res) => {
        const result = await AutorService.obterPorFiltro(req.query);
        return handleResult(result, res); // 200: Success
    });

    // Buscar os autores ativas
    obterAtivas = asyncWrapper(async (req, res) => {
        const result = await AutorService.obterPorFiltro({ ativo: true });
        return handleResult(result, res); // 200: Success
    });
}

export default new AutorController();