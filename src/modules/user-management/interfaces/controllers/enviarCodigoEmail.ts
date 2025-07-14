import { NextFunction, Request, Response } from "express";
import { enviarCodigoVerificacao } from "../../application/use-cases/verifyEmailUseCase";

export async function list(request: Request, response: Response, next: NextFunction) {
    const data = request.body
    try {
        enviarCodigoVerificacao(data.email, data.nome)
        return response.status(200)
    } catch (error) {
        next(error)
    }
}