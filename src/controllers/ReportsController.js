import excelService from '../services/excelService.js';
import pdfService from '../services/pdfService.js';
import UsuarioService from '../services/UsuarioService.js';
import FornecedorService from '../services/FornecedorService.js';

// --- USUÁRIOS ---
const gerarExcelUsuarios = async (req, res) => {
  try {
    const dados = await UsuarioService.listarParaRelatorio();

    const colunas = [
      { header: 'ID', key: 'id' },
      { header: 'Nome', key: 'nome' },
      { header: 'CPF', key: 'cpf' },
      { header: 'Data Nascimento', key: 'data_nascimento', format: 'data' },
      { header: 'Telefone', key: 'telefone' },
      { header: 'Email', key: 'email' },
      { header: 'Tipo Usuário', key: 'tipo_usuario' },
      { header: 'Bloqueado', key: 'bloqueado', format: 'boolean' },
      { header: 'Ativo', key: 'ativo', format: 'boolean' },
    ];

    const buffer = await excelService.gerarExcel(dados, colunas, 'Usuários');
    res.setHeader('Content-Disposition', 'attachment; filename=usuarios.xlsx');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.send(buffer);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao gerar Excel', detalhes: error.message });
  }
};

const gerarPDFUsuarios = async (req, res) => {
  try {
    const dados = await UsuarioService.listarParaRelatorio();

    const campos = [
      { label: 'ID', key: 'id' },
      { label: 'Nome', key: 'nome' },
      { label: 'CPF', key: 'cpf' },
      { label: 'Data Nascimento', key: 'data_nascimento', format: 'data' },
      { label: 'Telefone', key: 'telefone' },
      { label: 'Email', key: 'email' },
      { label: 'Tipo Usuário', key: 'tipo_usuario' },
      { label: 'Bloqueado', key: 'bloqueado', format: 'boolean' },
      { label: 'Ativo', key: 'ativo', format: 'boolean' },
    ];

    const buffer = await pdfService.gerarPDF(dados, campos, 'Relatório de Usuários');
    res.setHeader('Content-Disposition', 'attachment; filename=usuarios.pdf');
    res.setHeader('Content-Type', 'application/pdf');
    res.send(buffer);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao gerar PDF', detalhes: error.message });
  }
};

// --- FORNECEDORES ---
const gerarExcelFornecedores = async (req, res) => {
  try {
    const dados = await FornecedorService.listarParaRelatorio();

    const colunas = [
      { header: 'ID', key: 'id' },
      { header: 'Nome', key: 'nome' },
      { header: 'CNPJ', key: 'cnpj' },
      { header: 'Email', key: 'email' },
      { header: 'Telefone', key: 'telefone' },
      { header: 'Ativo', key: 'ativo', format: 'boolean' },
    ];

    const buffer = await excelService.gerarExcel(dados, colunas, 'Fornecedores');
    res.setHeader('Content-Disposition', 'attachment; filename=fornecedores.xlsx');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.send(buffer);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao gerar Excel', detalhes: error.message });
  }
};

const gerarPDFFornecedores = async (req, res) => {
  try {
    const dados = await FornecedorService.listarParaRelatorio();

    const campos = [
      { label: 'ID', key: 'id' },
      { label: 'Nome', key: 'nome' },
      { label: 'CNPJ', key: 'cnpj' },
      { label: 'Email', key: 'email' },
      { label: 'Telefone', key: 'telefone' },
      { label: 'Ativo', key: 'ativo', format: 'boolean' },
    ];

    const buffer = await pdfService.gerarPDF(dados, campos, 'Relatório de Fornecedores');
    res.setHeader('Content-Disposition', 'attachment; filename=fornecedores.pdf');
    res.setHeader('Content-Type', 'application/pdf');
    res.send(buffer);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao gerar PDF', detalhes: error.message });
  }
};

export default {
  gerarExcelUsuarios,
  gerarPDFUsuarios,
  gerarExcelFornecedores,
  gerarPDFFornecedores
};
