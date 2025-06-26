import { NextFunction, Request, Response } from 'express';
import { CreateUserUseCase } from '../../application/use-cases/create/createUserUseCase';
import { CreateUserInputZod } from '../../dtos/user/CreateUserInputDTO';
import { PrismaUserRepository } from '../../infra/repositories/prisma/prismaUserRepo';

export async function create(request: Request, response: Response, next: NextFunction) {
    const newUser = request.body;
    const token = request.params.token
    try {
      const createUserUseCase = new CreateUserUseCase(new PrismaUserRepository)
      const data = CreateUserInputZod.parse(newUser)

      await createUserUseCase.execute(data, token)
      return response.status(201).send({ message: "Usuário cadastrado com sucesso!" })
    } catch (err) {
      next(err)
    }
  }