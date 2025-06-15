import ExcelJS from 'exceljs';

const formatarData = (data) => {
  if (!data) return '';
  const d = new Date(data);
  return d.toLocaleDateString('pt-BR');
};

const gerarExcel = async (dados, colunas, nomePlanilha = 'Relatório') => {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet(nomePlanilha);

  // Define os cabeçalhos dinamicamente
  sheet.columns = colunas.map(col => ({
    header: col.header,
    key: col.key,
    width: col.width || 20,
  }));

  dados.forEach(item => {
    const linha = {};

    colunas.forEach(col => {
      const valorOriginal = item[col.key];

      if (col.format === 'data') {
        linha[col.key] = formatarData(valorOriginal);
      } else if (col.format === 'boolean') {
        linha[col.key] = valorOriginal ? 'Sim' : 'Não';
      } else {
        linha[col.key] = valorOriginal;
      }
    });

    sheet.addRow(linha);
  });

  const buffer = await workbook.xlsx.writeBuffer();
  return buffer;
};

export default {
  gerarExcel
};
