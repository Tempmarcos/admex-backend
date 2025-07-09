import { NextFunction, Request, Response } from 'express';
import { CreateUserUseCase } from '../../application/use-cases/create/createUserUseCase';
import { PrismaUserRepository } from '../../infra/repositories/prisma/prismaUserRepo';
import { CreateUserConviteZod } from '../../dtos/user/CreateUserConviteDTO';
import { VerifyConviteUseCase } from '../../application/use-cases/convite/verifyConviteUseCase';
import { PrismaConviteRepository } from '../../infra/repositories/prisma/prismaConviteRepo';
import { JWTService } from '../../infra/services/auth/jwtService';
import { InvalidConviteError } from '../../../shared/errors/user/convite/invalidConviteError';

export async function create(request: Request, response: Response, next: NextFunction) {
  const newUser = request.body;
  const token = request.params.token
  try {
    const verifyConviteUseCase = new VerifyConviteUseCase(new PrismaConviteRepository, new JWTService)
    const conviteValido = await verifyConviteUseCase.execute(token)
    if (!conviteValido) throw new InvalidConviteError
    const createUserUseCase = new CreateUserUseCase(new PrismaUserRepository)
    const data = CreateUserConviteZod.parse(newUser)
    await createUserUseCase.execute(data, token)
    return response.status(201).send({ message: "Usuário cadastrado com sucesso!" })
  } catch (err) {
    next(err)
  }
}