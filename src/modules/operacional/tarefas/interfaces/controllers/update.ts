import { NextFunction, Request, Response } from 'express';
import { tarefaUpdateSchema } from '../../dtos/tarefaUpdateDTO';
import { PrismaTarefaRepository } from '../../infra/repositories/prisma/prismaTarefaRepo';
import { UpdateTarefaUseCase } from '../../application/use-cases/updateTarefaUseCase';



export async function update(request: Request, response: Response, next: NextFunction) {
    const tarefa = request.body;
    const id = request.params.id;
    try {
      const updateTarefaUseCase = new UpdateTarefaUseCase(new PrismaTarefaRepository)
      const data = tarefaUpdateSchema.parse(tarefa)

      await updateTarefaUseCase.execute(data, id)
      return response.status(201).send({ message: "Tarefa alterada com sucesso!" })
    } catch (err) {
      next(err)
    }
  }