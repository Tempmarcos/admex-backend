import { NextFunction, Request, Response } from 'express';
import { GetTarefaUseCase } from '../../application/use-cases/getTarefaUseCase';
import { PrismaTarefaRepository } from '../../infra/repositories/prisma/prismaTarefaRepo';



export async function getTarefa(request: Request, response: Response, next: NextFunction){
    const id = request.params.id;
    try {
        const getUserUseCase = new GetTarefaUseCase(new PrismaTarefaRepository)
        const tarefa= await getUserUseCase.execute(id)

        
        return response.status(200).send(tarefa)
      } catch (error) {
        next(error)
      }
}