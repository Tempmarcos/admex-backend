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
  (email: string, nome: string, data: Date) {
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

export async function sendEmailUpdateConfirmation(email: string, link: string, nome: string) {
  try {
    await transporter.sendMail({
      from: `Sistema de Monitoramento <${env.EMAIL_USER}>`,
      to: email,
      subject: `[CONFIRMAR TROCA DE E-MAIL]`,
      html: `
          <h1>Confirmar a troca de e-mail.</h1>
          <p>Olá ${nome}, clique nesse link para confirmar sua troca de e-mail:</p>
          <a href='${link}'>${link}</a>
        `
    });
  } catch (emailError) {
    console.error('Falha ao enviar e-mail de troca de email:', emailError);
  }
}

export async function sendEmailConfirmation(email: string, codigo: string, nome?: string) {
  // console.log(email, codigo, nome)
  try {
    await transporter.sendMail({
      from: `Sistema de Monitoramento <${env.EMAIL_USER}>`,
      to: email,
      subject: `[CONFIRMAR E-MAIL]`,
      html: `
          <h1>Confirmar o e-mail.</h1>
          <p>Olá ${nome}, este é seu código para confirmar e-mail:</p>
          <h1>${codigo}</h1>
        `
    });
  } catch (emailError) {
    console.error('Falha ao enviar e-mail de confirmação de email:', emailError);
  }
}

export async function sendTarefaAtrasada(email: string, nome: string, nomeTarefa: string) {
  try {
    await transporter.sendMail({
      from: `Sistema de Monitoramento Admex`,
      to: email,
      subject: `[TAREFA ATRASADA]`,
      html: `
          <h1>Tarefa Atrasada.</h1>
          <p>Olá ${nome}, a tarefa ${nomeTarefa} passou do prazo agendado. Você pode 
          editar a tarefa para executada ou cancelada para não receber mais e-mails.</p>
        `
    });
  } catch (emailError) {
    console.error('Falha ao enviar e-mail de troca de senha:', emailError);
  }
}

export async function sendTarefaQuaseAtrasada(email: string, nome: string, nomeTarefa: string) {
  try {
    await transporter.sendMail({
      from: `Sistema de Monitoramento Admex`,
      to: email,
      subject: `[TAREFA PRÓXIMA DE ENCERRAR]`,
      html: `
          <h1>Tarefa próxima de encerrar.</h1>
          <p>Olá ${nome}, a tarefa ${nomeTarefa} está a menos de um dia de encerrar. Você pode 
          editar a tarefa para executada ou cancelada para não receber mais e-mails.</p>
        `
    });
  } catch (emailError) {
    console.error('Falha ao enviar e-mail de troca de senha:', emailError);
  }
}