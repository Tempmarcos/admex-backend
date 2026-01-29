export interface PropostaData {
  tituloProjeto?: string;
  data: string;
  clienteNome: string;
  itens: Array<{
    nome: string;
    quantidade: number;
    preco: number;
    unidadeDeMedida: string;
  }>;
  valorTotal: number;
  observacoes?: string;
  empresa: {
    nome: string;
    cnpj?: string;
    endereco?: string;
  };
}

export class PropostaHTMLTemplate {
  static generate(data: PropostaData): string {
    const itensHTML = data.itens.map(item => `
      <tr>
        <td>${item.nome}</td>
        <td style="text-align: center;">${item.quantidade}</td>
        <td style="text-align: right;">R$ ${item.preco.toFixed(2)}</td>
        <td style="text-align: right;">${item.unidadeDeMedida}</td>
      </tr>
    `).join('');

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: 'Arial', sans-serif;
            color: #333;
            line-height: 1.6;
          }
          
          .container {
            padding: 20px;
          }
          
          .header {
            border-bottom: 3px solid #2c3e50;
            padding-bottom: 20px;
            margin-bottom: 30px;
          }
          
          .empresa-info h1 {
            color: #2c3e50;
            font-size: 24px;
            margin-bottom: 5px;
          }
          
          .empresa-info p {
            color: #7f8c8d;
            font-size: 12px;
          }
          
          .proposta-info {
            background: #ecf0f1;
            padding: 15px;
            border-radius: 5px;
            margin-bottom: 30px;
          }
          
          .proposta-info h2 {
            color: #2c3e50;
            font-size: 18px;
            margin-bottom: 10px;
          }
          
          .info-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 5px;
          }
          
          .cliente-info {
            margin-bottom: 30px;
          }
          
          .cliente-info h3 {
            color: #2c3e50;
            font-size: 16px;
            margin-bottom: 10px;
            border-bottom: 2px solid #3498db;
            padding-bottom: 5px;
          }
          
          table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 30px;
          }
          
          thead {
            background: #34495e;
            color: white;
          }
          
          th, td {
            padding: 12px;
            text-align: left;
            border: 1px solid #ddd;
          }
          
          tbody tr:nth-child(even) {
            background: #f9f9f9;
          }
          
          .total-row {
            background: #2c3e50 !important;
            color: white;
            font-weight: bold;
            font-size: 16px;
          }
          
          .observacoes {
            background: #fff9e6;
            padding: 15px;
            border-left: 4px solid #f39c12;
            margin-bottom: 20px;
          }
          
          .observacoes h4 {
            color: #e67e22;
            margin-bottom: 8px;
          }
          
          .footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 2px solid #ecf0f1;
            text-align: center;
            color: #7f8c8d;
            font-size: 12px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="empresa-info">
              <h1>${data.empresa.nome}</h1>
              ${data.empresa.cnpj ? `<p>CNPJ: ${data.empresa.cnpj}</p>` : ''}
              ${data.empresa.endereco ? `<p>${data.empresa.endereco}</p>` : ''}
            </div>
          </div>
          
          <div class="proposta-info">
            <h2>Proposta Comercial</h2>
            <div class="info-row">
              <span><strong>${data.tituloProjeto ? `<p>${data.tituloProjeto}</p>` : ''}</span>
              <span><strong>Data:</strong> ${data.data}</span>
            </div>
          </div>
          
          <div class="cliente-info">
            <h3>Cliente</h3>
            <p><strong>Nome:</strong> ${data.clienteNome}</p>
          </div>
          
          <table>
            <thead>
              <tr>
                <th>Descrição</th>
                <th style="text-align: center;">Quantidade</th>
                <th style="text-align: right;">Valor Unitário</th>
                <th style="text-align: right;">Valor Total</th>
              </tr>
            </thead>
            <tbody>
              ${itensHTML}
              <tr class="total-row">
                <td colspan="3" style="text-align: right;">VALOR TOTAL</td>
                <td style="text-align: right;">R$ ${data.valorTotal.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
          
          ${data.observacoes ? `
            <div class="observacoes">
              <h4>Observações</h4>
              <p>${data.observacoes}</p>
            </div>
          ` : ''}
          
          <div class="footer">
            <p>Documento gerado automaticamente em ${new Date().toLocaleString('pt-BR')}</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }
}