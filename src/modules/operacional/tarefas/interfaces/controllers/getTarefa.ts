import { NextFunction, Request, Response } from 'express';
import { GetTarefaUseCase } from '../../application/use-cases/getTarefaUseCase';
import { PrismaTarefaRepository } from '../../infra/repositories/prisma/prismaTarefaRepo';



export async function getTarefa(request: Request, response: Response, next: NextFunction){
    const id = request.params.id;
    try {
        const getTarefaUseCase = new GetTarefaUseCase(new PrismaTarefaRepository)
        const tarefa= await getTarefaUseCase.execute(id)

        
        return response.status(200).send(tarefa)
      } catch (error) {
        next(error)
      }
}