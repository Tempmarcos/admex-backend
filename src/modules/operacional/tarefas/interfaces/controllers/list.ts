import { NextFunction, Request, Response } from 'express';
import { ListTarefaUseCase } from '../../application/use-cases/listTarefaUseCase';
import { PrismaTarefaRepository } from '../../infra/repositories/prisma/prismaTarefaRepo';


export async function list(request: Request, response: Response, next: NextFunction){
    const empresaId = request.params.empresaId;
    try {
        const listUserUseCase = new ListTarefaUseCase(new PrismaTarefaRepository)
        const tarefas = await listUserUseCase.execute(empresaId)

        return response.status(200).send(tarefas)
      } catch (error) {
        next(error)
      }
}