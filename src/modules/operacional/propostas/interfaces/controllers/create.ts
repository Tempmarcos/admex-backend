import { NextFunction, Request, Response } from "express";
import { CreatePropostaUseCase } from "../../application/use-cases/createPropostaUseCase";
import { PrismaPropostaRepository } from "../../infra/repositories/prisma/prismaPropostaRepository";
import { createPropostaSchema } from "../../dtos/CreatePropostaDTO";

export async function create(request: Request, response: Response, next: NextFunction){
    const { proposta, empresaId } = request.body

    try {
      const createPropostaUseCase = new CreatePropostaUseCase(new PrismaPropostaRepository);
  
      const data = createPropostaSchema.parse(proposta)

      await createPropostaUseCase.execute(data, empresaId);
  
      return response.status(201).json({ message: `Proposta criada com sucesso!` });
    } catch (err) {
      next(err);
    }
}