import { NextFunction, Request, Response } from 'express';
import { PrismaPropostaRepository } from '../../infra/repositories/prisma/prismaPropostaRepository';
import { GetPropostaUseCase } from '../../application/use-cases/getPropostaUseCase';



export async function getProposta(request: Request, response: Response, next: NextFunction){
    const id = request.params.id;
    try {
        const getPropostaUseCase = new GetPropostaUseCase(new PrismaPropostaRepository)
        const proposta= await getPropostaUseCase.execute(id)

        
        return response.status(200).send(proposta)
      } catch (error) {
        next(error)
      }
}