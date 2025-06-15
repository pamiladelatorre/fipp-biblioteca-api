import express from 'express';
import reportsController from '../controllers/ReportsController.js';

const router = express.Router();

// routes/relatoriosRoutes.js
router.get('/relatorios/usuarios/excel', reportsController.gerarExcelUsuarios);
router.get('/relatorios/usuarios/pdf', reportsController.gerarPDFUsuarios);

router.get('/relatorios/fornecedores/excel', reportsController.gerarExcelFornecedores);
router.get('/relatorios/fornecedores/pdf', reportsController.gerarPDFFornecedores);



export default router;
