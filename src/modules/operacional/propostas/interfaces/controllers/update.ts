import { NextFunction, Request, Response } from 'express';
import { UpdatePropostaUseCase } from '../../application/use-cases/updatePropostaUseCase';
import { PrismaPropostaRepository } from '../../infra/repositories/prisma/prismaPropostaRepository';
import { propostaUpdateSchema } from '../../dtos/PropostaUpdateDTO';

export async function update(request: Request, response: Response, next: NextFunction) {
    const proposta = request.body;
    const id = request.params.id;
    try {
      const updatePropostaUseCase = new UpdatePropostaUseCase(new PrismaPropostaRepository)
      const data = propostaUpdateSchema.parse(proposta)

      await updatePropostaUseCase.execute(data, id)
      return response.status(201).send({ message: "Usuário alterado com sucesso!" })
    } catch (err) {
      next(err)
    }
  }