import { Router } from "express";

import CompraController from "../controllers/CompraController.js";

const router = new Router();

// Lista compras por filtrados
router.get('', CompraController.obterPorFiltro);

export default router;