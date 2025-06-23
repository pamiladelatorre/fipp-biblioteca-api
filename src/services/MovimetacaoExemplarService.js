import MovimetacaoExemplar from "../models/MovimetacaoExemplar.js";
import MovimetacaoExemplarDAO from "../data/MovimetacaoExemplarDAO.js";
import { notFoundIfEmpty } from '../utils/ServiceHelpers.js';
import { Result } from '../utils/Result.js';
import Entity from '../models/Entity.js';

// Importe o ExemplarDAO
import ExemplarDAO from '../data/ExemplarDAO.js'; // <--- Adicione esta linha

class MovimetacaoExemplarService {

    // Adicione o exemplarDAO no construtor para injeção de dependência
    constructor() {
        this.movimentacaoExemplarDAO = MovimetacaoExemplarDAO;
        this.exemplarDAO = ExemplarDAO; // <--- Adicione esta linha
    }

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
        const movimentacoesExemplar = await this.movimentacaoExemplarDAO.buscarPorFiltro(filtro); // Use 'this'
        return notFoundIfEmpty(movimentacoesExemplar, 'MovimetacaoExemplar');
    }

    async criar(dados) {
        const agora = new Date();

        const movimentacao = MovimetacaoExemplar.criar({
            exemplarId: dados.exemplarId,
            usuarioId: dados.usuarioId,
            etapa: 'emprestimo',
            // O status 'ativa' já está sendo definido dentro de MovimetacaoExemplar.criar
        });

        console.log(movimentacao instanceof Entity);
        console.log(movimentacao instanceof MovimetacaoExemplar);
        console.log('Entidade que vai inserir:', movimentacao);

        try {
            // 1. Criar a Movimentação
            const idMovimentacao = await this.movimentacaoExemplarDAO.criar(movimentacao);
            movimentacao.setIdFromDB(idMovimentacao);

            // 2. Buscar o Exemplar
            const exemplar = await this.exemplarDAO.buscarPorId(dados.exemplarId);

            if (!exemplar) {
                // Se o exemplar não for encontrado, é um erro de negócio
                return Result.fail(`Exemplar com ID ${dados.exemplarId} não encontrado.`);
            }

            // 3. Atualizar o status do Exemplar
            exemplar.status = 'emprestado'; // <--- Chamará o setter que vamos adicionar
            exemplar.dataAlteracao = agora; // Atualiza a data de alteração do exemplar

            // 4. Salvar o Exemplar atualizado
            await this.exemplarDAO.atualizar(exemplar);

            // 5. Retornar sucesso com a movimentação criada
            return Result.ok(movimentacao); 
        } catch (error) {
            console.error("Erro ao criar movimentação ou atualizar exemplar:", error);

            return Result.fail(`Erro ao processar empréstimo: ${error.message}`);
        }
    }

  async registrarDevolucao({ exemplarId, usuarioId, dataFim }) {
    const agora = new Date();

    try {
        const movimentacao = await this.movimentacaoExemplarDAO.buscarEmprestimoAtivo(exemplarId, usuarioId);

        if (!movimentacao) {
            return Result.fail('Nenhuma movimentação ativa de empréstimo encontrada para este exemplar e usuário.');
        }

        movimentacao.etapa = 'devolucao';
        movimentacao.status = 'finalizada';
        movimentacao.dataFim = dataFim ? new Date(dataFim) : null; // <-- CORRIGIDO
        movimentacao.dataAtualizacao = agora;

        await this.movimentacaoExemplarDAO.atualizar(movimentacao);

        const exemplar = await this.exemplarDAO.buscarPorId(exemplarId);
        if (!exemplar) {
            return Result.fail(`Exemplar com ID ${exemplarId} não encontrado.`);
        }

        exemplar.status = 'disponivel';
        exemplar.dataAlteracao = agora;

        await this.exemplarDAO.atualizar(exemplar);

        return Result.ok(movimentacao);
    } catch (error) {
        console.error("Erro ao registrar devolução:", error);
        return Result.fail(`Erro ao registrar devolução: ${error.message}`);
    }
}

async renovar(id) {
    try {
        const movimentacao = await this.movimentacaoExemplarDAO.buscarPorId(id);

        if (!movimentacao) {
            return Result.fail('Movimentação não encontrada');
        }

        if (movimentacao.etapa !== 'emprestimo' || movimentacao.status !== 'ativa') {
            return Result.fail('Apenas empréstimos ativos podem ser renovados');
        }

        // Cria uma nova data prevista +7 dias (exemplo)
        const novaData = new Date(movimentacao.dataPrevista);
        novaData.setDate(novaData.getDate() + 7);

        // Atualiza o objeto com os setters
       movimentacao.dataPrevista = novaData;
movimentacao.numeroRenovacao = movimentacao.numeroRenovacao + 1;

        // Salva a alteração no banco (assumindo que o DAO tenha método para atualizar a movimentação toda)
        await this.movimentacaoExemplarDAO.atualizar(movimentacao);

        return Result.ok({ novaDataPrevista: novaData });
    } catch (error) {
        console.error("Erro ao renovar movimentação:", error);
        return Result.fail(`Erro ao renovar movimentação: ${error.message}`);
    }
}

}

// Exporta a instância do serviço
export default new MovimetacaoExemplarService();