import { Router } from "express";

import FornecedorController from "../controllers/FornecedorController.js";
import { validate } from '../middlewares/validate.js';
import { idParamSchema } from '../validations/commonValidation.js';

const router = new Router();

// Cria um novo fornecedor
router.post('', FornecedorController.adicionar);

// Lista fornecedores filtrados
router.get('', FornecedorController.obterPorFiltro);

// Lista fornecedores ativos (rota fixa deve vir antes de parâmetros dinâmicos)
router.get('/ativos', FornecedorController.obterAtivas);

// Consulta por ID
router.get('/:id', validate('params', idParamSchema), FornecedorController.obterPorId);

// Atualiza autor
router.put('/:id', validate('params', idParamSchema), FornecedorController.alterar);

// Atualiza status ativo
router.patch(
    '/:id/ativo', 
    validate('params', idParamSchema), 
    FornecedorController.alterarStatusAtivo
);

export default router;