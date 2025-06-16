import express from 'express';
import reportsController from '../controllers/ReportsController.js';

const router = express.Router();

// routes/relatoriosRoutes.js
router.get('/relatorios/usuarios/excel', reportsController.gerarExcelUsuarios);
router.get('/relatorios/usuarios/pdf', reportsController.gerarPDFUsuarios);

router.get('/relatorios/fornecedores/excel', reportsController.gerarExcelFornecedores);
router.get('/relatorios/fornecedores/pdf', reportsController.gerarPDFFornecedores);

router.get('/relatorios/acervos/excel', reportsController.gerarExcelAcervos);
router.get('/relatorios/acervos/pdf', reportsController.gerarPDFAcervos);

router.get('/relatorios/exemplares/excel', reportsController.gerarExcelExemplares);
router.get('/relatorios/exemplares/pdf', reportsController.gerarPDFExemplares);




export default router;
