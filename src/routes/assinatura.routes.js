import { Router } from "express";

import AssinaturaController from "../controllers/AssinaturaController.js";
import { validate } from '../middlewares/validate.js';
import { idParamSchema } from '../validations/commonValidation.js';

const router = new Router();

// Cria uma nova assinatura
router.post('', AssinaturaController.adicionar);

// Lista assinaturas filtradas
router.get('', AssinaturaController.obterPorFiltro);

// Lista assinaturas ativas (rota fixa deve vir antes de parâmetros dinâmicos)
router.get('/ativas', AssinaturaController.obterAtivas);

// Consulta por ID
router.get('/:id', validate('params', idParamSchema), AssinaturaController.obterPorId);

// Atualiza assinatura
router.put('/:id', validate('params', idParamSchema), AssinaturaController.alterar);

// Atualiza status ativo
router.patch(
    '/:id/ativo',
    validate('params', idParamSchema),
    AssinaturaController.alterarStatusAtivo
);

export default router;
