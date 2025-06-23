import { Router } from "express";

import MovimetacaoExemplarController from "../controllers/MovimetacaoExemplarController.js";

const router = new Router();

// Lista acervos por filtrados
router.get('', MovimetacaoExemplarController.obterPorFiltro);

router.post('', MovimetacaoExemplarController.criar);

router.put('/devolucao', MovimetacaoExemplarController.registrarDevolucao);

router.put('/:id/renovar', MovimetacaoExemplarController.renovar);





export default router;