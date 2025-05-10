import { Router } from "express";

import AutorController from "../controllers/AutorController.js";
import { validate } from '../middlewares/validate.js';
import { idParamSchema } from '../validations/commonValidation.js';

const router = new Router();

// Cria um novo autor
router.post('', AutorController.adicionar);

// Lista autores filtrados
router.get('', AutorController.obterPorFiltro);

// Lista autores ativos (rota fixa deve vir antes de parâmetros dinâmicos)
router.get('/ativos', AutorController.obterAtivas);

// Consulta por ID
router.get('/:id', validate('params', idParamSchema), AutorController.obterPorId);

// Atualiza autor
router.put('/:id', validate('params', idParamSchema), AutorController.alterar);

// Atualiza status ativo
router.patch(
    '/:id/ativo', 
    validate('params', idParamSchema), 
    AutorController.alterarStatusAtivo
);

export default router;