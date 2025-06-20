import { Router } from "express";

import ExemplarController from "../controllers/ExemplarController.js";
import { validate } from '../middlewares/validate.js';
import { idParamSchema } from '../validations/commonValidation.js';
import { estadoUpdateSchema, baixaUpdateSchema } from '../validations/exemplarValidation.js';

const router = new Router();

// Lista exemplares por filtrados
router.get('', ExemplarController.obterPorFiltro);

// Consulta por ID
router.get('/:id', validate('params', idParamSchema), ExemplarController.obterPorId);

// Atualiza estado do exemplar
router.patch(
    '/:id/estado', 
    validate('params', idParamSchema), 
    validate('body', estadoUpdateSchema), 
    ExemplarController.alterarEstado
);

// Baixa do exemplar
router.put(
    '/:id/baixa', 
    validate('params', idParamSchema), 
    validate('body', baixaUpdateSchema), 
    ExemplarController.baixar
);

export default router;