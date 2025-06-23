import MovimetacaoExemplarService from "../services/MovimetacaoExemplarService.js";
import { handleResult } from '../middlewares/handleResult.js';
import { asyncWrapper } from '../utils/asyncWrapper.js';
import excelService from '../services/excelService.js';

class MovimetacaoExemplarController {
  obterPorFiltro = asyncWrapper(async (req, res) => {
    const result = await MovimetacaoExemplarService.obterPorFiltro(req.query);
    return handleResult(result, res); // 200: Success
  });

  criar = asyncWrapper(async (req, res) => {
    console.log('Requisição para criar recebida:', req.body);
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

  gerarExcel = asyncWrapper(async (req, res) => {
    const result = await MovimetacaoExemplarService.obterPorFiltro(req.query);

    if (!result.success) {
      return handleResult(result, res);
    }

    const movimentacoes = result.data;

    const colunas = [
      { header: 'ID', key: 'id' },
      { header: 'Usuário', key: 'usuario.nome' },
      { header: 'Título do Livro', key: 'exemplar.acervo.titulo' },
      { header: 'Tombo', key: 'exemplar.tombo' },
      { header: 'Etapa', key: 'etapa' },
      { header: 'Status', key: 'status' },
      { header: 'Data Início', key: 'dataInicio', format: 'data' },
      { header: 'Data Prevista', key: 'dataPrevista', format: 'data' },
      { header: 'Data Fim', key: 'dataFim', format: 'data' },
      { header: 'Renovações', key: 'numeroRenovacao' },
    ];

    const dadosFormatados = movimentacoes.map(m => ({
      id: m.id,
      'usuario.nome': m.usuario?.nome,
      'exemplar.acervo.titulo': m.exemplar?.acervo?.titulo,
      'exemplar.tombo': m.exemplar?.tombo,
      etapa: m.etapa,
      status: m.status,
      dataInicio: m.dataInicio,
      dataPrevista: m.dataPrevista,
      dataFim: m.dataFim,
      numeroRenovacao: m.numeroRenovacao
    }));

    const buffer = await excelService.gerarExcel(dadosFormatados, colunas, 'Movimentações');

    res.setHeader('Content-Disposition', 'attachment; filename="relatorio_movimentacoes.xlsx"');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.send(buffer);
  });
}

export default new MovimetacaoExemplarController();
