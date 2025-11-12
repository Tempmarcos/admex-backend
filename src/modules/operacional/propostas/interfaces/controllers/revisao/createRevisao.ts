import { NextFunction, Request, Response } from "express";
import { revisaoCreateSchema } from "../../../dtos/CreateRevisaoDTO";
import { PrismaPropostaRepository } from "../../../infra/repositories/prisma/prismaPropostaRepository";
import { CreateRevisaoUseCase } from "../../../application/use-cases/revisao/createRevisaoUseCase";


export async function createRevisao(request: Request, response: Response, next: NextFunction){
    const { revisao, propostaId } = request.body

    try {
      const createTarefaUseCase = new CreateRevisaoUseCase(new PrismaPropostaRepository);
  
      const data = revisaoCreateSchema.parse(revisao)

      await createTarefaUseCase.execute(data, propostaId);
  
      return response.status(201).json({ message: `Revisão criada com sucesso!` });
    } catch (err) {
      next(err);
    }
}