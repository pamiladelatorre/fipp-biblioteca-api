import MovimetacaoExemplar from "../models/MovimetacaoExemplar.js";
import MovimetacaoExemplarDAO from "../data/MovimetacaoExemplarDAO.js";
import { notFoundIfEmpty } from '../utils/ServiceHelpers.js';
import { Result } from '../utils/Result.js';

class MovimetacaoExemplarService {

  async obterPorFiltro({ acervo, tombo, usuario, etapa, status, dataInicio, dataPrevista, dataFim }) {
    const filtro = {
      ...(acervo && { titulo: { valor: acervo, like: true } }),
      ...(tombo && { tombo: { valor: tombo, like: true } }),
      ...(usuario && { nome: { valor: usuario, like: true } }),
      ...(etapa && { etapa: { valor: etapa } }),
      ...(status && { status: { valor: status } }),
      ...(dataInicio && { dataInicio: { valor: dataInicio } }),
      ...(dataPrevista && { dataPrevista: { valor: dataPrevista } }),
      ...(dataFim && { dataFim: { valor: dataFim } }),
    };
    const movimentacoesExemplar = await MovimetacaoExemplarDAO.buscarPorFiltro(filtro);
    return notFoundIfEmpty(movimentacoesExemplar, 'MovimetacaoExemplar');
  }

  async criar(dados) {
    const agora = new Date();

    const movimentacao = MovimetacaoExemplar.criar({
      exemplarId: dados.exemplarId,
      usuarioId: dados.usuarioId,
      etapa: 'emprestimo',
      status: 'ativa',
      dataInicio: agora,
      dataPrevista: dados.dataPrevista || null,
      dataCriacao: agora,
      dataAlteracao: agora,
      numeroRenovacao: 0,
      dataFim: null,
      grupoId: null,
      referenciaId: null
    });

    const id = await MovimetacaoExemplarDAO.criar(movimentacao);
    movimentacao.id = id;

    return Result.success(movimentacao);
  }
}

export default new MovimetacaoExemplarService();
