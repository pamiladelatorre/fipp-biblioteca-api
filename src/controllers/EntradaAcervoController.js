import EntradaAcervoService from "../services/EntradaAcervoService.js";
import { handleResult } from '../middlewares/handleResult.js';
import { asyncWrapper } from '../utils/asyncWrapper.js';

class EntradaAcervoController {
    // Buscar entrada de acervo pelo ID
    obterPorId = asyncWrapper(async (req, res) => {
        const { id } = req.params;
        const result = await EntradaAcervoService.obterPorId(id);
        return handleResult(result, res); // 200: Success
    });

    // Buscar as entradas de acervo por filtro
    obterPorFiltro = asyncWrapper(async (req, res) => {
        const result = await EntradaAcervoService.obterPorFiltro(req.query);
        return handleResult(result, res); // 200: Success
    });
}

export default new EntradaAcervoController();
