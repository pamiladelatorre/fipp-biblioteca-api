import AcervoService from "../services/AcervoService.js";
import { handleResult } from '../middlewares/handleResult.js';
import { asyncWrapper } from '../utils/asyncWrapper.js';

class AcervoController {
    // Criar um novo acervo
    adicionar = asyncWrapper(async (req, res) => {
        const result = await AcervoService.adicionar(req.body);
        return handleResult(result, res, 201); // 201: Created
    }); 

    // Buscar acervo pelo ID
    obterPorId = asyncWrapper(async (req, res) => {
        const { id } = req.params;
        const result = await AcervoService.obterPorId(id);
        return handleResult(result, res); // 200: Success
    });

    // Alterar acervo pelo ID
    alterar = asyncWrapper(async (req, res) => {
        const { id } = req.params;
        const result = await AcervoService.alterar(id, req.body);
        return handleResult(result, res); // 200: Success
    });

    // Alterar o status de ativo do acervo pelo ID 
    alterarStatusAtivo = asyncWrapper(async (req, res) => {
        const { id } = req.params;
        const { ativo } = req.body;
        const result = await AcervoService.alterarStatusAtivo(id, ativo);
        return handleResult(result, res, 204); // 204: No Content
    });
    
    // Buscar os acervos por filtro
    obterPorFiltro = asyncWrapper(async (req, res) => {
        const result = await AcervoService.obterPorFiltro(req.query);
        return handleResult(result, res); // 200: Success
    });
    
    // Buscar os acervos ativas
    obterAtivas = asyncWrapper(async (req, res) => {
        const result = await AcervoService.obterAtivas({ ativo: true });
        return handleResult(result, res); // 200: Success
    });
}

export default new AcervoController();
