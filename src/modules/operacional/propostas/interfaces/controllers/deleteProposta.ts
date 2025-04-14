import { NextFunction, Request, Response } from 'express';
import { DeletePropostaUseCase } from '../../application/use-cases/deletePropostaUseCase';
import { PrismaPropostaRepository } from '../../infra/repositories/prisma/prismaPropostaRepository';

export async function deleteProposta(request: Request, response: Response, next: NextFunction) {
    const id = request.params.id;
    try{
        const deletePropostaUseCase = new DeletePropostaUseCase(new PrismaPropostaRepository)
        await deletePropostaUseCase.execute(id)
        return response.status(201).send({message: "Proposta deletada com sucesso!"});
    }catch (err){
        next(err)
    }
}