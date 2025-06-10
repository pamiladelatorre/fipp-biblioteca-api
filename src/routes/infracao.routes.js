import { Router } from "express";

import InfracaoController from "../controllers/InfracaoController.js";

const router = new Router();

// Lista infracoes por filtrados
router.get('', InfracaoController.obterPorFiltro);

export default router;