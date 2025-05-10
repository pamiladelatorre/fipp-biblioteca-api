import FornecedorService from "../services/FornecedorService.js";
import { handleResult } from '../middlewares/handleResult.js';
import { asyncWrapper } from '../utils/asyncWrapper.js';

class FornecedorController {
    // Criar um novo fornecedor
    adicionar = asyncWrapper(async (req, res) => {
        const result = await FornecedorService.adicionar(req.body);
        return handleResult(result, res, 201); // 201: Created
    });    

    // Buscar fornecedor pelo ID
    obterPorId = asyncWrapper(async (req, res) => {
        const { id } = req.params;
        const result = await FornecedorService.obterPorId(id);
        return handleResult(result, res); // 200: Success
    });

    // Alterar fornecedor pelo ID
    alterar = asyncWrapper(async (req, res) => {
        const { id } = req.params;
        const result = await FornecedorService.alterar({ id, ...req.body });
        return handleResult(result, res); // 200: Success
    });

    // Alterar o status de ativo do fornecedor pelo ID 
    alterarStatusAtivo = asyncWrapper(async (req, res) => {
        const { id } = req.params;
        const { ativo } = req.body;
        const result = await FornecedorService.alterarStatusAtivo(id, ativo);
        return handleResult(result, res, 204); // 204: No Content
    });
    
    // Buscar os fornecedores por filtro
    obterPorFiltro = asyncWrapper(async (req, res) => {
        const result = await FornecedorService.obterPorFiltro(req.query);
        return handleResult(result, res); // 200: Success
    });

    // Buscar os fornecedores ativoss
    obterAtivas = asyncWrapper(async (req, res) => {
        const result = await FornecedorService.obterAtivas({ ativo: true });
        return handleResult(result, res); // 200: Success
    });
}

export default new FornecedorController();