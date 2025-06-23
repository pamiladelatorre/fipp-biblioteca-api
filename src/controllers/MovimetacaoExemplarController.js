import MovimetacaoExemplarService from "../services/MovimetacaoExemplarService.js";
import { handleResult } from '../middlewares/handleResult.js';
import { asyncWrapper } from '../utils/asyncWrapper.js';

class MovimetacaoExemplarController {
    obterPorFiltro = asyncWrapper(async (req, res) => {
        const result = await MovimetacaoExemplarService.obterPorFiltro(req.query);
        return handleResult(result, res); // 200: Success
    });

criar = asyncWrapper(async (req, res) => {
  console.log('Requisição para criar recebida:', req.body); // <== LOG
  const result = await MovimetacaoExemplarService.criar(req.body);
  return handleResult(result, res, 201);
});

registrarDevolucao = asyncWrapper(async (req, res) => {
    const result = await MovimetacaoExemplarService.registrarDevolucao(req.body);
    return handleResult(result, res, 201);
});
renovar = asyncWrapper(async (req, res) => {
    const id = req.params.id;
    const result = await MovimetacaoExemplarService.renovar(id);
    return handleResult(result, res);
});



}



export default new MovimetacaoExemplarController();
