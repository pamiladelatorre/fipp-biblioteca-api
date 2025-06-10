import { Router } from "express";

import MovimetacaoExemplarController from "../controllers/MovimetacaoExemplarController.js";

const router = new Router();

// Lista acervos por filtrados
router.get('', MovimetacaoExemplarController.obterPorFiltro);

export default router;