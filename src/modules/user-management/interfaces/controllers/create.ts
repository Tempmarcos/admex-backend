import { NextFunction, Request, Response } from 'express';
import { CreateUserUseCase } from '../../application/use-cases/create/createUserUseCase';
import { PrismaUserRepository } from '../../infra/repositories/prisma/prismaUserRepo';
import { CreateUserConviteZod } from '../../dtos/user/CreateUserConviteDTO';
import { VerifyConviteUseCase } from '../../application/use-cases/convite/verifyConviteUseCase';
import { PrismaConviteRepository } from '../../infra/repositories/prisma/prismaConviteRepo';
import { JWTService } from '../../infra/services/auth/jwtService';
import { InvalidConviteError } from '../../../shared/errors/user/convite/invalidConviteError';
import { CodigoVerificacaoRedis } from '../../infra/services/redis/codigoVerificacaoRedis';
import { InvalidCodeError } from '../../../shared/errors/user/invalidCodeError';

export async function create(request: Request, response: Response, next: NextFunction) {
  const newUser = request.body.user;
  const codigo = request.body.codigo;
  const token = request.params.token
  try {
    const codigoVerificado = CodigoVerificacaoRedis.verificar(newUser.email, codigo);
    if (!codigoVerificado) throw new InvalidCodeError()
    const verifyConviteUseCase = new VerifyConviteUseCase(new PrismaConviteRepository, new JWTService)
    const empresaIdConvite = await verifyConviteUseCase.execute(token)
    if (!empresaIdConvite) throw new InvalidConviteError()
    const createUserUseCase = new CreateUserUseCase(new PrismaUserRepository, new PrismaConviteRepository)
    const data = CreateUserConviteZod.parse(newUser)
    await createUserUseCase.execute(data, token, empresaIdConvite)
    return response.status(201).send({ message: "Usuário cadastrado com sucesso!" })
  } catch (err) {
    next(err)
  }
}