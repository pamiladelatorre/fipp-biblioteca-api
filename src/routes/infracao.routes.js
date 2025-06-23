import { Router } from "express";

import InfracaoController from "../controllers/InfracaoController.js";

const router = new Router();

// Lista infracoes por filtrados
router.get('', InfracaoController.obterPorFiltro);

// Cria uma nova infracao
router.post('', InfracaoController.adicionar);

// Consulta por ID
router.get('/:id', InfracaoController.obterPorId);

router.put('/:id', InfracaoController.alterar);

export default router;