import BaseDAO from './BaseDAO.js';
import { query } from '../infra/database.js';
import { camelToSnake } from '../utils/stringUtils.js';
import MovimetacaoExemplar from '../models/MovimetacaoExemplar.js';
import Exemplar from '../models/Exemplar.js';
import Acervo from '../models/Acervo.js';
import Usuario from '../models/Usuario.js';
import { Result } from '../utils/Result.js';

class MovimetacaoExemplarDAO extends BaseDAO {
  constructor() {
    super("movimentacoes_exemplares"); // Nome da tabela
  }

  static getInstance() {
    return BaseDAO.getInstance(MovimetacaoExemplarDAO);
  }

  mapRowToEntity(row) {
    return new MovimetacaoExemplar(
      row.id,
      row.exemplar_id,
      row.usuario_id,
      row.etapa,
      row.status,
      row.grupo_id,
      row.referencia_id,
      row.data_inicio,
      row.data_prevista,
      row.data_fim,
      row.numero_renovacao,
      row.data_criacao,
      row.data_atualizacao,
      new Exemplar(
        row.exemplar_id,
        undefined,
        row.acervo_id,
        undefined,
        row.tombo,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        new Acervo(row.acervo_id, undefined, undefined, undefined, row.titulo)
      ),
      new Usuario(row.usuario_id, undefined, row.nome)
    );
  }

  async buscarPorFiltro(filtro = {}) {
    let sql = `
      SELECT 
        me.*,
        u.nome,
        e.tombo,
        e.acervo_id,
        a.titulo 
      FROM ${this.tabela} me
      INNER JOIN usuarios u ON u.id = me.usuario_id
      INNER JOIN exemplares e ON e.id = me.exemplar_id
      INNER JOIN acervos a ON a.id = e.acervo_id`;

    const valores = [];
    const condicoes = [];

    for (const [campoCamel, config] of Object.entries(filtro)) {
      const campo = camelToSnake(campoCamel);
      const { valor, like = false } =
        typeof config === "object" && config !== null ? config : { valor: config };

      condicoes.push(`${campo} ${like ? "LIKE" : "="} ?`);
      valores.push(like ? `%${valor}%` : valor);
    }

    if (condicoes.length > 0) {
      sql += ` WHERE ${condicoes.join(" AND ")}`;
    }

    const rows = await query(sql, valores);
    return rows.map((row) => this.mapRowToEntity(row));
  }


async criar(movimentacao) {
  console.log("Requisição para criar recebida:", movimentacao);
  const entidade = MovimetacaoExemplar.criar(movimentacao);
  console.log("Entidade:", entidade);

  return this.inserir(entidade);
}
 async buscarEmprestimoAtivo(exemplarId, usuarioId) {
        const sql = `
            SELECT * FROM movimentacoes_exemplares
            WHERE exemplar_id = ? AND usuario_id = ?
              AND etapa = 'emprestimo' AND status = 'ativa'
            LIMIT 1;
        `;
        const [row] = await query(sql, [exemplarId, usuarioId]);
        return row ? this.mapRowToEntity(row) : null;
    }

limparDadosParaAtualizar(entidade) {
  const dados = {
    exemplar_id: entidade.exemplarId,
    usuario_id: entidade.usuarioId,
    etapa: entidade.etapa,
    status: entidade.status,
    grupo_id: entidade.grupoId,
    referencia_id: entidade.referenciaId,
    data_inicio: entidade.dataInicio,
    data_prevista: entidade.dataPrevista,
    data_fim: entidade.dataFim,
    numero_renovacao: entidade.numeroRenovacao,
    data_atualizacao: entidade.dataAtualizacao
  };

  // Corrige campos undefined para null (obrigatório para o driver MySQL)
  for (const key in dados) {
    if (dados[key] === undefined) {
      dados[key] = null;
    }
  }
  console.log('Dados finais para UPDATE:', dados);

  return dados;
}



  async atualizar(movimentacao, conn = null) {
    if (!(movimentacao instanceof MovimetacaoExemplar)) {
      throw new Error("Instância inválida de MovimetacaoExemplar.");
    }

    if (!movimentacao.id) {
      throw new Error("Movimentação precisa de ID para atualizar.");
    }

    // Usa a função para limpar os dados
    const dados = this.limparDadosParaAtualizar(movimentacao);

    // Não atualizamos data_criacao no update, remova se quiser:
    delete dados.data_criacao;

    // Remove id do objeto para não atualizar id na query
    const { id, ...resto } = dados;

    const campos = Object.keys(resto);
    const valores = Object.values(resto);

    const updates = campos.map(campo => `${campo} = ?`).join(', ');

    const sql = `UPDATE ${this.tabela} SET ${updates} WHERE id = ?`;

    const resultado = await query(sql, [...valores, movimentacao.id], conn);

    if (resultado.affectedRows === 0) return null;

    return movimentacao;
  }
  async obterExemplaresEmprestados(usuarioId) {
  try {
    const sql = `
      SELECT 
        e.id,
        e.tombo AS codigo,
        a.titulo
      FROM movimentacoes_exemplares me
      JOIN exemplares e ON e.id = me.exemplar_id
      JOIN acervos a ON a.id = e.acervo_id
      WHERE me.usuario_id = ?
        AND me.etapa = 'emprestimo'
        AND me.status = 'ativa'
    `;
    const rows = await query(sql, [usuarioId]);
    return Result.ok(rows);
  } catch (err) {
    return Result.fail('Erro ao consultar exemplares emprestados.');
  }

}
async atualizarDataPrevista(id, novaData) {
  const sql = `UPDATE movimentacoes_exemplares SET data_prevista = ? WHERE id = ?`;
  await query(sql, [novaData, id]);
}


}










export default MovimetacaoExemplarDAO.getInstance();
