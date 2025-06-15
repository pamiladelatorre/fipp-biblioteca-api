import PDFDocument from 'pdfkit';
import { PassThrough } from 'stream';

const formatarData = (data) => {
  if (!data) return '';
  const d = new Date(data);
  return d.toLocaleDateString('pt-BR');
};

const gerarPDF = async (dados, campos, titulo = 'Relatório') => {
  const doc = new PDFDocument({ margin: 30 });
  const stream = new PassThrough();

  doc.pipe(stream);

  doc.fontSize(18).text(titulo, { align: 'center' });
  doc.moveDown();

  dados.forEach(item => {
    campos.forEach(campo => {
      let valor = item[campo.key];

      if (campo.format === 'data') {
        valor = formatarData(valor);
      } else if (campo.format === 'boolean') {
        valor = valor ? 'Sim' : 'Não';
      }

      doc.fontSize(12).text(`${campo.label}: ${valor}`);
    });
    doc.moveDown();
  });

  doc.end();

  const chunks = [];
  return new Promise((resolve, reject) => {
    stream.on('data', chunk => chunks.push(chunk));
    stream.on('end', () => resolve(Buffer.concat(chunks)));
    stream.on('error', err => reject(err));
  });
};

export default {
  gerarPDF
};
