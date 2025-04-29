import { NextFunction, Request, Response } from 'express';
import { PrismaPropostaRepository } from '../../infra/repositories/prisma/prismaPropostaRepository';
import { ListPropostaUseCase } from '../../application/use-cases/listPropostaUseCase';



export async function list(request: Request, response: Response, next: NextFunction){
    const empresaId = request.body.empresaId;
    try {
        const listPropostaUseCase = new ListPropostaUseCase(new PrismaPropostaRepository)
        const propostas = await listPropostaUseCase.execute(empresaId)

        return response.status(200).send(propostas)
      } catch (error) {
        next(error)
      }
}