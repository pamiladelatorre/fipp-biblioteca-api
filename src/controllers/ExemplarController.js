import ExemplarService from "../services/ExemplarService.js";
import { handleResult } from '../middlewares/handleResult.js';
import { asyncWrapper } from '../utils/asyncWrapper.js';

class ExemplarController {
    // Buscar exemplar pelo ID
    obterPorId = asyncWrapper(async (req, res) => {
        const { id } = req.params;
        const result = await ExemplarService.obterPorId(id);
        return handleResult(result, res); // 200: Success
    });

    // Alterar o estado do exemplar pelo ID 
    alterarEstado = asyncWrapper(async (req, res) => {
        const { id } = req.params;
        const { estado } = req.body;
        const result = await ExemplarService.alterarEstado(id, estado);
        return handleResult(result, res, 200); // 200: Success
    });

    // Baixa do exemplar pelo ID
    baixar = asyncWrapper(async (req, res) => {
        const { id } = req.params;
        const result = await ExemplarService.baixar(id, req.body);
        return handleResult(result, res); // 200: Success
    });

    // Buscar os movimentações de examplar por filtro
    obterPorFiltro = asyncWrapper(async (req, res) => {
        const result = await ExemplarService.obterPorFiltro(req.query);
        return handleResult(result, res); // 200: Success
    });
}

export default new ExemplarController();
