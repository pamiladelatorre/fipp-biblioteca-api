import MovimetacaoExemplarService from "../services/MovimetacaoExemplarService.js";
import { handleResult } from '../middlewares/handleResult.js';
import { asyncWrapper } from '../utils/asyncWrapper.js';

class MovimetacaoExemplarController {
    // Buscar os movimentações de examplar por filtro
    obterPorFiltro = asyncWrapper(async (req, res) => {
        const result = await MovimetacaoExemplarService.obterPorFiltro(req.query);
        return handleResult(result, res); // 200: Success
    });
}

export default new MovimetacaoExemplarController();
