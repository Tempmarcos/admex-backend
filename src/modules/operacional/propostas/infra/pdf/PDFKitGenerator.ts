import PDFDocument from 'pdfkit';
import { PDFGeneratorInterface } from '../../application/interfaces/PDFGeneratorInterface';
import { PropostaData } from './PropostaHTMLTemplate';

export class PDFKitGenerator implements PDFGeneratorInterface {
  async generate(data: PropostaData): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const doc = new PDFDocument({ 
        size: 'A4',
        margins: { top: 50, bottom: 50, left: 50, right: 50 }
      });
      
      const chunks: Buffer[] = [];

      doc.on('data', (chunk) => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));
      doc.on('error', reject);

      try {
        // HEADER
        doc.fontSize(24)
           .fillColor('#2c3e50')
           .text(data.empresa.nome, { align: 'center' });
        
        if (data.empresa.cnpj) {
          doc.fontSize(10)
             .fillColor('#7f8c8d')
             .text(`CNPJ: ${data.empresa.cnpj}`, { align: 'center' });
        }
        
        if (data.empresa.endereco) {
          doc.text(data.empresa.endereco, { align: 'center' });
        }

        doc.moveDown(2);

        // Linha divisória
        doc.moveTo(50, doc.y)
           .lineTo(545, doc.y)
           .strokeColor('#2c3e50')
           .lineWidth(2)
           .stroke();

        doc.moveDown(1.5);

        // PROPOSTA INFO
        doc.rect(50, doc.y, 495, 60)
           .fillAndStroke('#ecf0f1', '#bdc3c7');

        const infoY = doc.y + 15;
        doc.fillColor('#2c3e50')
           .fontSize(16)
           .text('Proposta Comercial', 60, infoY);

        doc.fontSize(10)
           .fillColor('#34495e')
           .text(`Projeto: ${data.tituloProjeto}`, 60, infoY + 25)
           .text(`Data: ${data.data}`, 400, infoY + 25, { width: 135, align: 'right' });

        doc.moveDown(3);

        // CLIENTE
        const clienteY = doc.y;
        doc.fontSize(14)
           .fillColor('#2c3e50')
           .text('Cliente', 50, clienteY);

        doc.moveTo(50, clienteY + 18)
           .lineTo(150, clienteY + 18)
           .strokeColor('#3498db')
           .lineWidth(2)
           .stroke();

        doc.moveDown(1.5);
        doc.fontSize(10)
           .fillColor('#34495e')
           .text(`Nome: ${data.clienteNome}`, { indent: 10 });

        doc.moveDown(2);

        // TABELA DE ITENS
        const tableTop = doc.y;
        const col1X = 50;
        const col2X = 300;
        const col3X = 380;
        const col4X = 450;
        const rowHeight = 25;

        // Cabeçalho da tabela
        doc.rect(col1X, tableTop, 495, rowHeight)
           .fillAndStroke('#34495e', '#34495e');

        doc.fillColor('white')
           .fontSize(10)
           .text('Descrição', col1X + 5, tableTop + 8, { width: 240 })
           .text('Qtd', col2X + 5, tableTop + 8, { width: 70, align: 'center' })
           .text('Valor Unit.', col3X + 5, tableTop + 8, { width: 60, align: 'right' })
           .text('Total', col4X + 5, tableTop + 8, { width: 85, align: 'right' });

        // Itens
        let currentY = tableTop + rowHeight;
        data.itens.forEach((item, index) => {
          const fillColor = index % 2 === 0 ? '#ffffff' : '#f9f9f9';
          
          doc.rect(col1X, currentY, 495, rowHeight)
             .fillAndStroke(fillColor, '#ddd');

          doc.fillColor('#34495e')
             .fontSize(9)
             .text(item.nome, col1X + 5, currentY + 8, { width: 240 })
             .text(`${item.quantidade} ${item.unidadeDeMedida}`, col2X + 5, currentY + 8, { width: 70, align: 'center' })
             .text(`R$ ${item.preco.toFixed(2)}`, col3X + 5, currentY + 8, { width: 60, align: 'right' })
             .text(`R$ ${(item.quantidade * item.preco).toFixed(2)}`, col4X + 5, currentY + 8, { width: 85, align: 'right' });

          currentY += rowHeight;
        });

        // Total
        doc.rect(col1X, currentY, 495, rowHeight)
           .fillAndStroke('#2c3e50', '#2c3e50');

        doc.fillColor('white')
           .fontSize(12)
           .text('VALOR TOTAL', col1X + 5, currentY + 8, { width: 385, align: 'right' })
           .text(`R$ ${data.valorTotal.toFixed(2)}`, col4X + 5, currentY + 8, { width: 85, align: 'right' });

        // FOOTER - Posicionado no final da primeira página
        const footerY = doc.page.height - 70; // 70px do final da página
        
        // Desenha linha acima do footer
        doc.moveTo(50, footerY - 10)
           .lineTo(545, footerY - 10)
           .strokeColor('#ecf0f1')
           .lineWidth(1)
           .stroke();
        
        doc.fontSize(8)
           .fillColor('#7f8c8d')
           .text(
             `Documento gerado automaticamente em ${new Date().toLocaleString('pt-BR', { 
               timeZone: 'America/Sao_Paulo',
               dateStyle: 'short',
               timeStyle: 'short'
             })}`,
             50,
             footerY,
             { align: 'center', width: 495 }
           );

        doc.end();
      } catch (error) {
        reject(error);
      }
    });
  }
}