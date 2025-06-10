import { Router } from "express";

import ExemplarController from "../controllers/ExemplarController.js";

const router = new Router();

// Lista exemplares por filtrados
router.get('', ExemplarController.obterPorFiltro);

export default router;