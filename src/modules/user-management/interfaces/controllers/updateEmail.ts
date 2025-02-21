import { NextFunction, Request, Response } from 'express';
import { UpdateEmailUseCase } from '../../application/use-cases/update/updateEmailUseCase';
import { PrismaUserRepository } from '../../infra/repositories/prisma/prismaUserRepo';
import { JWTService } from '../../infra/services/auth/jwtService';


export async function updateEmail(request: Request, response: Response, next: NextFunction) {
    const email = request.body;
    const id = request.params.id;
    try {
      const updateEmailUseCase = new UpdateEmailUseCase(new PrismaUserRepository, new JWTService)
      await updateEmailUseCase.execute(email, id)
      return response.status(201).send({ message: "Validação sucedida. Esperando confirmação." })
    } catch (err) {
      next(err)
    }
  }