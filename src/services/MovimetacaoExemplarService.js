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
                return Result.failure(`Exemplar com ID ${dados.exemplarId} não encontrado.`);
            }

            // 3. Atualizar o status do Exemplar
            exemplar.status = 'emprestado'; // <--- Chamará o setter que vamos adicionar
            exemplar.dataAlteracao = agora; // Atualiza a data de alteração do exemplar

            // 4. Salvar o Exemplar atualizado
            await this.exemplarDAO.atualizar(exemplar);

            // 5. Retornar sucesso com a movimentação criada
            return Result.success(movimentacao); 
        } catch (error) {
            console.error("Erro ao criar movimentação ou atualizar exemplar:", error);

            return Result.failure(`Erro ao processar empréstimo: ${error.message}`);
        }
    }
}

// Exporta a instância do serviço
export default new MovimetacaoExemplarService();