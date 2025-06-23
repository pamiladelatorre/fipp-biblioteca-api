import UsuarioService from '../services/UsuarioService.js';
import { handleResult } from '../middlewares/handleResult.js';
import { asyncWrapper } from '../utils/asyncWrapper.js';
import MovimetacaoExemplarDAO from '../data/MovimetacaoExemplarDAO.js';

class UsuarioController {
    // Criar um novo usuário
    adicionar = asyncWrapper(async (req, res) => {
        const result = await UsuarioService.adicionar(req.body);
        return handleResult(result, res, 201); // 201: Created
    });    

    // Buscar usuário pelo ID
    obterPorId = asyncWrapper(async (req, res) => {
        const { id } = req.params;
        const result = await UsuarioService.obterPorId(id);
        return handleResult(result, res); // 200: Success
    });

    // Alterar usuário pelo ID
    alterar = asyncWrapper(async (req, res) => {
        const { id } = req.params;
        const result = await UsuarioService.alterar(id, req.body);
        return handleResult(result, res); // 200: Success
    });

    // Alterar o status de ativo do usuário pelo ID 
    alterarStatusAtivo = asyncWrapper(async (req, res) => {
        const { id } = req.params;
        const { ativo } = req.body;
        const result = await UsuarioService.alterarStatusAtivo(id, ativo);
        return handleResult(result, res, 204); // 204: No Content
    });

    // Alterar o status de bloqueio do usuário pelo ID 
    alterarStatusBloqueado = asyncWrapper(async (req, res) => {
        const { id } = req.params;
        const { bloqueado } = req.body;
        const result = await UsuarioService.alterarStatusBloqueado(id, bloqueado);
        return handleResult(result, res, 204); // 204: No Content
    });
    
    // Buscar os usuários por filtro
    obterPorFiltro = asyncWrapper(async (req, res) => {
        const result = await UsuarioService.obterPorFiltro(req.query);
        return handleResult(result, res); // 200: Success
    });

    // Buscar os usuários ativas
    obterAtivas = asyncWrapper(async (req, res) => {
        const result = await UsuarioService.obterAtivas({ ativo: true });
        return handleResult(result, res); // 200: Success
    });
    
  async obterExemplaresEmprestados(req, res) {
    const { id } = req.params;
    try {
      const exemplaresEmprestados = await MovimetacaoExemplarDAO.obterExemplaresEmprestados(Number(id));
      return handleResult(exemplaresEmprestados, res);
    } catch (error) {
      console.error('Erro ao buscar exemplares emprestados:', error);
      return res.status(500).json({ mensagem: 'Erro ao buscar exemplares emprestados.' });
    }
  }
}

export default new UsuarioController();
