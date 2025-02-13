import { NextFunction, Request, Response } from 'express';
import { PrismaUserRepository } from '../../infra/repositories/prisma/prismaUserRepo';
import { UpdateUserUseCase } from '../../application/use-cases/update/updateUserUseCase';
import { UpdateUserInputZod } from '../../dtos/user/UpdateUserInputDTO';


export async function update(request: Request, response: Response, next: NextFunction) {
    const user = request.body;
    const id = request.params.id;
    try {
      const updateUserUseCase = new UpdateUserUseCase(new PrismaUserRepository)
      const data = UpdateUserInputZod.parse(user)

      await updateUserUseCase.execute(data, id)
      return response.status(201).send({ message: "Usuário alterado com sucesso!" })
    } catch (err) {
      next(err)
    }
  }