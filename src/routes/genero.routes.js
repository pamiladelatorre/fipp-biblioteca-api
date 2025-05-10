import { Router } from "express";

import GeneroController from "../controllers/GeneroController.js";
import { validate } from '../middlewares/validate.js';
import { idParamSchema } from '../validations/commonValidation.js';

const router = new Router();

// Cria um novo gênero
router.post('', GeneroController.adicionar);

// Lista gêneros filtrados
router.get('', GeneroController.obterPorFiltro);

// Lista gêneros ativos (rota fixa deve vir antes de parâmetros dinâmicos)
router.get('/ativos', GeneroController.obterAtivas);

// Consulta por ID
router.get('/:id', validate('params', idParamSchema), GeneroController.obterPorId);

// Atualiza gênero
router.put('/:id', validate('params', idParamSchema), GeneroController.alterar);

// Atualiza status ativo
router.patch(
    '/:id/ativo', 
    validate('params', idParamSchema), 
    GeneroController.alterarStatusAtivo
);

export default router;