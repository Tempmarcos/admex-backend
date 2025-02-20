import nodemailer from 'nodemailer';
import { env } from '../../../env';

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: env.EMAIL_USER,
      pass: env.EMAIL_PASS
    }
  });

  export async function sendErrorEmail(error: Error, metadata?: object) {
    try {
      await transporter.sendMail({
        from: `Sistema de Monitoramento <${env.EMAIL_USER}>`,
        to: env.DEV_EMAILS, // Array de e-mails no .env
        subject: `[ERRO] ${error.message.substring(0, 50)}...`,
        html: `
          <h1>Erro no Sistema</h1>
          <p><strong>Mensagem:</strong> ${error.message}</p>
          <pre>${error.stack}</pre>
          <h2>Metadados</h2>
          <pre>${JSON.stringify(metadata, null, 2)}</pre>
        `
      });
    } catch (emailError) {
      console.error('Falha ao enviar e-mail de erro:', emailError);
    }
  }


  export async function sendPasswordChangeNotification
  (email: string, nome: string, data: Date){
    const dia = data.getDate();
    const mes = data.getMonth() + 1;
    const ano = data.getFullYear();

    const hora = data.getHours();
    const minuto = String(data.getMinutes()).padStart(2, '0');
    try {
      await transporter.sendMail({
        from: `Sistema de Monitoramento <${env.EMAIL_USER}>`,
        to: email,
        subject: `[TROCA DE SENHA]`,
        html: `
          <h1>Sua senha na Admex foi alterada.</h1>
          <p>Olá ${nome}, sua senha foi alterada no dia 
          ${dia}/${mes}/${ano} às 
          ${hora}:${minuto}</p>
        `
      });
    } catch (emailError) {
      console.error('Falha ao enviar e-mail de troca de senha:', emailError);
    }
  }