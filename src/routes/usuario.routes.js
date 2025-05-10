import { Router } from "express";

import UsuarioController from '../controllers/UsuarioController.js';
import { validate } from '../middlewares/validate.js';
import { idParamSchema } from '../validations/commonValidation.js';

const router = new Router();

// Cria um novo usuário
router.post('', UsuarioController.adicionar);

// Lista usuários filtrados
router.get('', UsuarioController.obterPorFiltro);

// Lista usuários ativos (rota fixa deve vir antes de parâmetros dinâmicos)
router.get('/ativos', UsuarioController.obterAtivas);

// Consulta por ID
router.get('/:id', validate('params', idParamSchema), UsuarioController.obterPorId);

// Atualiza usuário
router.put('/:id', validate('params', idParamSchema), UsuarioController.alterar);

// Atualiza status ativo
router.patch(
    '/:id/ativo', 
    validate('params', idParamSchema),
    UsuarioController.alterarStatusAtivo
);

// Atualiza status bloqueado
router.patch(
    '/:id/bloqueado', 
    validate('params', idParamSchema),
     UsuarioController.alterarStatusBloqueado
);

export default router;