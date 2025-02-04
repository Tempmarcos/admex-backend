import { NextFunction, Request, Response } from 'express';
import { CreateUserUseCase } from '../../application/use-cases/createUserUseCase';
import { CreateUserInputZod } from '../../dtos/user/CreateUserInputDTO';
import { PrismaUserRepository } from '../../infra/repositories/prisma/prismaUserRepo';

export async function create(request: Request, response: Response, next: NextFunction) {
    const newUser = request.body;
    try {
      const createUserUseCase = new CreateUserUseCase(new PrismaUserRepository)
      const data = CreateUserInputZod.parse(newUser)

      await createUserUseCase.execute(data, 'empresaId')
      return response.status(201).send({ message: "Usuário cadastrado com sucesso!" })
    } catch (err) {
      next(err)
    }
  }