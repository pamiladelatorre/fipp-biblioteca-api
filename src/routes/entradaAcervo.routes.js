import { Router } from "express";

import EntradaAcervoController from "../controllers/EntradaAcervoController.js";

const router = new Router();

// Lista entradas de acervo por filtrados
router.get('', EntradaAcervoController.obterPorFiltro);

export default router;