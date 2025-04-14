import { NextFunction, Request, Response } from "express";
import { CreateTarefaUseCase } from "../../application/use-cases/createTarefaUseCase";
import { PrismaTarefaRepository } from "../../infra/repositories/prisma/prismaTarefaRepo";
import { tarefaCreateSchema } from "../../dtos/tarefaCreateDTO";

export async function create(request: Request, response: Response, next: NextFunction){
    const { tarefa, empresaId } = request.body

    try {
      const createTarefaUseCase = new CreateTarefaUseCase(new PrismaTarefaRepository);
  
      const data = tarefaCreateSchema.parse(tarefa)

      await createTarefaUseCase.execute(data, empresaId);
  
      return response.status(201).json({ message: `Tarefa criada com sucesso!` });
    } catch (err) {
      next(err);
    }
}