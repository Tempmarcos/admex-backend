import { NextFunction, Request, Response } from 'express';
import { PrismaPropostaRepository } from '../../../infra/repositories/prisma/prismaPropostaRepository';
import { UpdateVersaoUseCase } from '../../../application/use-cases/versao/updateVersaoUseCase';
import { versaoUpdateSchema } from '../../../dtos/VersaoPropostaUpdateDTO';


export async function updateVersao(request: Request, response: Response, next: NextFunction) {
    const versao = request.body;
    const id = request.params.id;
    try {
      const updateVersaoUseCase = new UpdateVersaoUseCase(new PrismaPropostaRepository)
      const data = versaoUpdateSchema.parse(versao)

      await updateVersaoUseCase.execute(data, id)
      return response.status(201).send({ message: "Versão alterada com sucesso!" })
    } catch (err) {
      next(err)
    }
  }