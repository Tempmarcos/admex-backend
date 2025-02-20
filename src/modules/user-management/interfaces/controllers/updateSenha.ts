import { NextFunction, Request, Response } from 'express';

import { PrismaUserRepository } from '../../infra/repositories/prisma/prismaUserRepo';
import { UpdateSenhaSchema } from '../../dtos/user/UpdateSenhaDTO';
import { UpdateSenhaUseCase } from '../../application/use-cases/update/updateSenhaUseCase';


export async function updateSenha(request: Request, response: Response, next: NextFunction) {
    const senhaData = request.body;
    const id = request.params.id;
    try {
      const updateSenhaUseCase = new UpdateSenhaUseCase(new PrismaUserRepository)
      const data = UpdateSenhaSchema.parse(senhaData)

      await updateSenhaUseCase.execute(data, id)
      return response.status(201).send({ message: "Senha alterada com sucesso!" })
    } catch (err) {
      next(err)
    }
  }