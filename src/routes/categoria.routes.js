import { Router } from "express";

import CategoriaController from "../controllers/CategoriaController.js";
import { validate } from '../middlewares/validate.js';
import { categoriaCreateSchema, categoriaUpdateSchema, categoriaAtivoSchema } from '../validations/categoriaValidation.js';
import { idParamSchema } from '../validations/commonValidation.js';

const router = new Router();

// Cria uma nova categoria
router.post('', validate('body', categoriaCreateSchema), CategoriaController.adicionar);

// Lista categorias filtradas
router.get('', CategoriaController.obterPorFiltro);

// Lista categorias ativas (rota fixa deve vir antes de parâmetros dinâmicos)
router.get('/ativas', CategoriaController.obterAtivas);

// Consulta por ID
router.get('/:id', validate('params', idParamSchema), CategoriaController.obterPorId); 

// Atualiza categoria
router.put('/:id', validate('params', idParamSchema), validate('body', categoriaUpdateSchema), CategoriaController.alterar); 

// Atualiza status ativo
router.patch(
    '/:id/ativo', 
    validate('params', idParamSchema), 
    validate('body', categoriaAtivoSchema), 
    CategoriaController.alterarStatusAtivo
); 

export default router;