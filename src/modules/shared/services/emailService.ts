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