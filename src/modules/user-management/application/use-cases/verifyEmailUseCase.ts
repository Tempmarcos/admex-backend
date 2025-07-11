import { sendEmailConfirmation } from "../../../shared/services/emailService";
import { CodigoVerificacaoRedis } from "../../infra/services/redis/codigoVerificacaoRedis";

export async function enviarCodigoVerificacao(email: string, nome: string) {
    const codigo = gerarCodigo();
    await CodigoVerificacaoRedis.salvar(email, codigo);
    await sendEmailConfirmation(email, codigo, nome);
}

function gerarCodigo() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}