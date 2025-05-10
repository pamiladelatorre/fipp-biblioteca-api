import { Router } from "express";

import AcervoController from "../controllers/AcervoController.js";
import { validate } from '../middlewares/validate.js';
import { idParamSchema } from '../validations/commonValidation.js';

const router = new Router();

// Cria um novo acervo
router.post('', AcervoController.adicionar);

// Lista acervos por filtrados
router.get('', AcervoController.obterPorFiltro);

// Lista acervos ativos (rota fixa deve vir antes de parâmetros dinâmicos)
router.get('/ativos', AcervoController.obterAtivas);

// Consulta por ID
router.get('/:id', validate('params', idParamSchema), AcervoController.obterPorId);

// Atualiza acervo
router.put('/:id', validate('params', idParamSchema), AcervoController.alterar);

// Atualiza status ativo
router.patch(
    '/:id/ativo', 
    validate('params', idParamSchema), 
    AcervoController.alterarStatusAtivo
);

export default router;