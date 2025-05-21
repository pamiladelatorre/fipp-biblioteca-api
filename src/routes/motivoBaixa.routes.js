import { Router } from "express";

import MotivoBaixaController from "../controllers/MotivoBaixaController.js";
import { validate } from '../middlewares/validate.js';
import { idParamSchema } from '../validations/commonValidation.js';
import { motivoBaixaCreateSchema, motivoBaixaUpdateSchema, motivoBaixaAtivoSchema } from '../validations/motivoBaixaValidation.js';

const router = new Router();

// Cria um novo motivo baixa
router.post('', validate('body', motivoBaixaCreateSchema), MotivoBaixaController.adicionar);

// Lista motivos baixas filtrados
router.get('', MotivoBaixaController.obterPorFiltro);

// Lista motivos baixas ativos (rota fixa deve vir antes de parâmetros dinâmicos)
router.get('/ativos', MotivoBaixaController.obterAtivas);

// Consulta por ID
router.get('/:id', validate('params', idParamSchema), MotivoBaixaController.obterPorId);

// Atualiza motivo baixa
router.put('/:id', validate('params', idParamSchema), validate('body', motivoBaixaUpdateSchema), MotivoBaixaController.alterar);

// Atualiza status ativo
router.patch(
    '/:id/ativo', 
    validate('params', idParamSchema), 
    validate('body', motivoBaixaAtivoSchema),
    MotivoBaixaController.alterarStatusAtivo
);

export default router;