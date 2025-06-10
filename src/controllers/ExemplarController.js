import ExemplarService from "../services/ExemplarService.js";
import { handleResult } from '../middlewares/handleResult.js';
import { asyncWrapper } from '../utils/asyncWrapper.js';

class ExemplarController {
    // Buscar os movimentações de examplar por filtro
    obterPorFiltro = asyncWrapper(async (req, res) => {
        const result = await ExemplarService.obterPorFiltro(req.query);
        return handleResult(result, res); // 200: Success
    });
}

export default new ExemplarController();
