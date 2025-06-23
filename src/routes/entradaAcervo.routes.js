import { Router } from "express";

import EntradaAcervoController from "../controllers/EntradaAcervoController.js";
import { validate } from '../middlewares/validate.js';
import { idParamSchema } from '../validations/commonValidation.js';

const router = new Router();

// Lista entradas de acervo por filtrados
router.get('', EntradaAcervoController.obterPorFiltro);

// Consulta por ID
router.get('/:id', validate('params', idParamSchema), EntradaAcervoController.obterPorId);

export default router;