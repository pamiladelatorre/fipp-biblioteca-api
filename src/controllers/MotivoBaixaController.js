import MotivoBaixaService from "../services/MotivoBaixaService.js";
import { handleResult } from '../middlewares/handleResult.js';
import { asyncWrapper } from '../utils/asyncWrapper.js';

class MotivoBaixaController {
    // Criar um novo motivo baixa
    adicionar = asyncWrapper(async (req, res) => {
        const result = await MotivoBaixaService.adicionar(req.body);
        return handleResult(result, res, 201); // 201: Created
    });    

    // Buscar motivo baixa pelo ID
    obterPorId = asyncWrapper(async (req, res) => {
        const { id } = req.params;
        const result = await MotivoBaixaService.obterPorId(id);
        return handleResult(result, res); // 200: Success
    });

    // Alterar motivo baixa pelo ID
    alterar = asyncWrapper(async (req, res) => {
        const { id } = req.params;
        const result = await MotivoBaixaService.alterar(id, req.body);
        return handleResult(result, res); // 200: Success
    });

    // Alterar o status de ativo do motivo baixa pelo ID 
    alterarStatusAtivo = asyncWrapper(async (req, res) => {
        const { id } = req.params;
        const { ativo } = req.body;
        const result = await MotivoBaixaService.alterarStatusAtivo(id, ativo);
        return handleResult(result, res, 204); // 204: No Content
    });
    
    // Buscar os motivos baixas por filtro
    obterPorFiltro = asyncWrapper(async (req, res) => {
        const result = await MotivoBaixaService.obterPorFiltro(req.query);
        return handleResult(result, res); // 200: Success
    });

    // Buscar os motivos baixas ativos
    obterAtivas = asyncWrapper(async (req, res) => {
        const result = await MotivoBaixaService.obterPorFiltro({ ativo: true });
        return handleResult(result, res); // 200: Success
    });
}

export default new MotivoBaixaController();