import CompraService from "../services/CompraService.js";
import { handleResult } from '../middlewares/handleResult.js';
import { asyncWrapper } from '../utils/asyncWrapper.js';

class CompraController {
    // Buscar as compras por filtro
    obterPorFiltro = asyncWrapper(async (req, res) => {
        const result = await CompraService.obterPorFiltro(req.query);
        return handleResult(result, res); // 200: Success
    });
}

export default new CompraController();
