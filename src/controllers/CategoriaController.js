import CategoriaService from "../services/CategoriaService.js";
import { handleResult } from '../middlewares/handleResult.js';
import { asyncWrapper } from '../utils/asyncWrapper.js';

class CategoriaController {
    // Criar uma nova categoria
    adicionar = asyncWrapper(async (req, res) => {
        const result = await CategoriaService.adicionar(req.body);
        return handleResult(result, res, 201); // 201: Created
    });    

    // Buscar categoria pelo ID
    obterPorId = asyncWrapper(async (req, res) => {
        const { id } = req.params;
        const result = await CategoriaService.obterPorId(id);
        return handleResult(result, res); // 200: Success
    });

    // Alterar categoria pelo ID
    alterar = asyncWrapper(async (req, res) => {
        const { id } = req.params;
        const result = await CategoriaService.alterar(id, req.body);
        return handleResult(result, res); // 200: Success
    });

    // Alterar o status de ativo da categoria pelo ID 
    alterarStatusAtivo = asyncWrapper(async (req, res) => {
        const { id } = req.params;
        const { ativo } = req.body;
        const result = await CategoriaService.alterarStatusAtivo(id, ativo);
        return handleResult(result, res, 204); // 204: No Content
    });
    
    // Buscar as categorias por filtro
    obterPorFiltro = asyncWrapper(async (req, res) => {
        const result = await CategoriaService.obterPorFiltro(req.query);
        return handleResult(result, res); // 200: Success
    });

    // Buscar as categorias ativas
    obterAtivas = asyncWrapper(async (req, res) => {
        const result = await CategoriaService.obterPorFiltro({ ativo: true });
        return handleResult(result, res); // 200: Success
    });
}

export default new CategoriaController();