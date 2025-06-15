import AssinaturaService from "../services/AssinaturaService.js";
import { handleResult } from '../middlewares/handleResult.js';
import { asyncWrapper } from '../utils/asyncWrapper.js';

class AssinaturaController {
    // Criar uma nova assinatura
   adicionar = asyncWrapper(async (req, res) => {
  const {
    fornecedor_id,
    descricao,
    periodicidade,
    numero_contrato,
    valor,
    data_inicio,
    data_fim,
    ativo
  } = req.body;

  const assinaturaDTO = {
    fornecedorId: Number(fornecedor_id),
    descricao,
    periodicidade,
    numeroContrato: numero_contrato,
    valor: Number(valor),
    dataInicio: data_inicio,
    dataFim: data_fim,
    ativo: ativo !== undefined ? ativo : true,
  };

  const result = await AssinaturaService.adicionar(assinaturaDTO);
  return handleResult(result, res, 201);
});


    // Buscar assinatura por ID
    obterPorId = asyncWrapper(async (req, res) => {
        const { id } = req.params;
        const result = await AssinaturaService.obterPorId(id);
        return handleResult(result, res); // 200: Success
    });

    // Alterar assinatura pelo ID
    alterar = asyncWrapper(async (req, res) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(422).json({
      message: 'O ID deve ser um número.',
      type: 'ValidationError',
      status: 422
    });
  }

  const {
    fornecedor_id,
    descricao,
    periodicidade,
    numero_contrato,
    valor,
    data_inicio,
    data_fim,
    ativo
  } = req.body;

  const assinaturaDTO = {
    fornecedorId: Number(fornecedor_id),
    descricao,
    periodicidade,
    numeroContrato: numero_contrato,
    valor: Number(valor),
    dataInicio: data_inicio,
    dataFim: data_fim,
    ativo: ativo !== undefined ? ativo : true,
    dataAlteracao: new Date()
  };

  const result = await AssinaturaService.alterar(id, assinaturaDTO);
  return handleResult(result, res);
});


    // Alterar status ativo da assinatura
    alterarStatusAtivo = asyncWrapper(async (req, res) => {
        const { id } = req.params;
        const { ativo } = req.body;
        const result = await AssinaturaService.alterarStatusAtivo(id, ativo);
        return handleResult(result, res, 204); // 204: No Content
    });

    // Buscar assinaturas por filtro
    obterPorFiltro = asyncWrapper(async (req, res) => {
        const result = await AssinaturaService.obterPorFiltro(req.query);
        return handleResult(result, res); // 200: Success
    });

    // Buscar assinaturas ativas
    obterAtivas = asyncWrapper(async (req, res) => {
        const result = await AssinaturaService.obterPorFiltro({ ativo: true });
        return handleResult(result, res); // 200: Success
    });
}

export default new AssinaturaController();
