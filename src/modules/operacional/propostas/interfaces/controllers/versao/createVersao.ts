import { NextFunction, Request, Response } from "express";
import { versaoCreateSchema } from "../../../dtos/CreateVersaoPropostaDTO";
import { PrismaPropostaRepository } from "../../../infra/repositories/prisma/prismaPropostaRepository";
import { CreateVersaoUseCase } from "../../../application/use-cases/versao/createVersaoUseCase";

export async function createVersao(request: Request, response: Response, next: NextFunction){
    const { versao, propostaId } = request.body

    try {
      const createTarefaUseCase = new CreateVersaoUseCase(new PrismaPropostaRepository);
  
      const data = versaoCreateSchema.parse(versao)

      await createTarefaUseCase.execute(data, propostaId);
  
      return response.status(201).json({ message: `Versão criada com sucesso!` });
    } catch (err) {
      next(err);
    }
}