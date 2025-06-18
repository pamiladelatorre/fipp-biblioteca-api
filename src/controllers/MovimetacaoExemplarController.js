import MovimetacaoExemplarService from "../services/MovimetacaoExemplarService.js";
import { handleResult } from '../middlewares/handleResult.js';
import { asyncWrapper } from '../utils/asyncWrapper.js';

class MovimetacaoExemplarController {
    obterPorFiltro = asyncWrapper(async (req, res) => {
        const result = await MovimetacaoExemplarService.obterPorFiltro(req.query);
        return handleResult(result, res); // 200: Success
    });

    criar = asyncWrapper(async (req, res) => {
        const result = await MovimetacaoExemplarService.criar(req.body);
        return handleResult(result, res, 201); // usando middleware para tratar response
    });
}



export default new MovimetacaoExemplarController();
