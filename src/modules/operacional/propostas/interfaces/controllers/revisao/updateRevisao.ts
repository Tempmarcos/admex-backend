import { NextFunction, Request, Response } from 'express';
import { PrismaPropostaRepository } from '../../../infra/repositories/prisma/prismaPropostaRepository';
import { revisaoUpdateSchema } from '../../../dtos/RevisaoUpdateDTO';
import { UpdateRevisaoUseCase } from '../../../application/use-cases/revisao/updateRevisaoUseCase';



export async function updateRevisao(request: Request, response: Response, next: NextFunction) {
    const revisao = request.body;
    const id = request.params.id;
    try {
      const updateRevisaoUseCase = new UpdateRevisaoUseCase(new PrismaPropostaRepository)
      const data = revisaoUpdateSchema.parse(revisao)

      await updateRevisaoUseCase.execute(data, id)
      return response.status(201).send({ message: "Revisão alterada com sucesso!" })
    } catch (err) {
      next(err)
    }
  }