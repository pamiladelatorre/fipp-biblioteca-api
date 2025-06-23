import Infracao from "../models/Infracao.js";
import InfracaoDAO from "../data/InfracaoDAO.js";
import { notFoundIfNull, notFoundIfEmpty } from '../utils/ServiceHelpers.js';
import { Result } from '../utils/Result.js';

// Validação simples (pode ser substituída por YUP se desejar)
function validarCamposObrigatorios(payload) {
    const camposObrigatorios = ['usuarioId', 'tipoInfracao', 'grauInfracao', 'motivo', 'dataInicio'];
    for (const campo of camposObrigatorios) {
        if (!payload[campo]) {
            throw new Error(`Campo obrigatório ausente: ${campo}`);
        }
    }
}

class InfracaoService {

    async obterPorFiltro({ usuario, tipo, grau, status, dataInicio, dataFim }) {
        const filtro = {
            ...(usuario && { nome: { valor: usuario, like: true } }),
            ...(tipo && { tipoInfracao: { valor: tipo } }),
            ...(grau && { grauInfracao: { valor: grau } }),
            ...(status && { status: { valor: status } }),
            ...(dataInicio && { dataInicio: { valor: dataInicio } }),
            ...(dataFim && { dataFim: { valor: dataFim } })
        };
        const infracoes = await InfracaoDAO.buscarPorFiltro(filtro);
        return notFoundIfEmpty(infracoes, 'Infração');
    }

    async adicionar(payload) {
        validarCamposObrigatorios(payload);
        const novaInfracao = Infracao.criar({ ...payload });
        const infracaoInserida = await InfracaoDAO.inserir(novaInfracao);
        return Result.ok(infracaoInserida);
    }

    
    async obterPorId(id) {
        const infracao = await InfracaoDAO.buscarPorId(id);
        return notFoundIfNull(infracao, 'Infração', 'o');
    }

      async alterar(id, payload){
          const infracao = await InfracaoDAO.buscarPorId(id);
          const validacao = notFoundIfNull(infracao, 'Infração', 'a');
          if (validacao.isFailure()) return validacao;
  
          infracao.alterar({ ...payload });
          await InfracaoDAO.atualizar(infracao);
          return Result.ok(infracao);
      }

}


export default new InfracaoService();
