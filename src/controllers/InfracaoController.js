import InfracaoService from "../services/InfracaoService.js";
import { handleResult } from '../middlewares/handleResult.js';
import { asyncWrapper } from '../utils/asyncWrapper.js';

class InfracaoController {
    // Buscar os movimentações de examplar por filtro
    obterPorFiltro = asyncWrapper(async (req, res) => {
        const result = await InfracaoService.obterPorFiltro(req.query);
        return handleResult(result, res); // 200: Success
    });
}

export default new InfracaoController();
