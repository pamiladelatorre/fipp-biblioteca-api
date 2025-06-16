import excelService from '../services/excelService.js';
import pdfService from '../services/pdfService.js';
import UsuarioService from '../services/UsuarioService.js';
import FornecedorService from '../services/FornecedorService.js';
import AcervoService from '../services/AcervoService.js';

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

// --- ACERVOS ---
const gerarExcelAcervos = async (req, res) => {
  try {
    const dados = await AcervoService.listarParaRelatorio();

    const colunas = [
      { header: 'ID', key: 'id' },
      { header: 'Título', key: 'titulo' },
      { header: 'Autor', key: 'autor' },
      { header: 'Gênero', key: 'genero' },
      { header: 'Categoria', key: 'categoria' },
      { header: 'Edição', key: 'numero_edicao' },
      { header: 'Editora', key: 'editora' },
      { header: 'Publicação', key: 'data_publicacao', format: 'data' },
      { header: 'Páginas', key: 'numero_pagina' },
      { header: 'ISBN', key: 'isbn' },
      { header: 'Ativo', key: 'ativo', format: 'boolean' }
    ];

    const buffer = await excelService.gerarExcel(dados, colunas, 'Acervos');
    res.setHeader('Content-Disposition', 'attachment; filename=acervos.xlsx');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.send(buffer);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao gerar Excel', detalhes: error.message });
  }
};

const gerarPDFAcervos = async (req, res) => {
  try {
    const dados = await AcervoService.listarParaRelatorio();

    const campos = [
      { label: 'ID', key: 'id' },
      { label: 'Título', key: 'titulo' },
      { label: 'Autor', key: 'autor' },
      { label: 'Gênero', key: 'genero' },
      { label: 'Categoria', key: 'categoria' },
      { label: 'Edição', key: 'numero_edicao' },
      { label: 'Editora', key: 'editora' },
      { label: 'Publicação', key: 'data_publicacao', format: 'data' },
      { label: 'Páginas', key: 'numero_pagina' },
      { label: 'ISBN', key: 'isbn' },
      { label: 'Ativo', key: 'ativo', format: 'boolean' }
    ];

    const buffer = await pdfService.gerarPDF(dados, campos, 'Relatório de Acervos');
    res.setHeader('Content-Disposition', 'attachment; filename=acervos.pdf');
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
  gerarPDFFornecedores,
  gerarExcelAcervos,
  gerarPDFAcervos
};