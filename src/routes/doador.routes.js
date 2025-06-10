import { Router } from "express";

import DoadorController from "../controllers/DoadorController.js";
import { validate } from '../middlewares/validate.js';
import { idParamSchema } from '../validations/commonValidation.js';

const router = new Router();

// Cria um novo doador
router.post('', DoadorController.adicionar);

// Lista doadores por filtrados
router.get('', DoadorController.obterPorFiltro);

// Lista doadores ativos (rota fixa deve vir antes de parâmetros dinâmicos)
router.get('/ativos', DoadorController.obterAtivas);

// Consulta por ID
router.get('/:id', validate('params', idParamSchema), DoadorController.obterPorId);

// Atualiza doador
router.put('/:id', validate('params', idParamSchema), DoadorController.alterar);

// Atualiza status ativo
router.patch(
    '/:id/ativo', 
    validate('params', idParamSchema), 
    DoadorController.alterarStatusAtivo
);

export default router;