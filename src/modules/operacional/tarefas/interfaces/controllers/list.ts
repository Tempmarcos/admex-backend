import { NextFunction, Request, Response } from 'express';
import { ListTarefaUseCase } from '../../application/use-cases/listTarefaUseCase';
import { PrismaTarefaRepository } from '../../infra/repositories/prisma/prismaTarefaRepo';


export async function list(request: Request, response: Response, next: NextFunction){
    const empresaId = response.locals.user.empresaId;
    const id = response.locals.user.id;

    try {
        const listTarefaUseCase = new ListTarefaUseCase(new PrismaTarefaRepository)
        const tarefas = await listTarefaUseCase.execute(empresaId, id)

        return response.status(200).send(tarefas)
      } catch (error) {
        next(error)
      }
}