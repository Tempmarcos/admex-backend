import { NextFunction, Request, Response } from 'express';
import { UpdatePerfilUseCase } from '../../application/use-cases/update/updatePerfilUseCase';
import { PrismaUserRepository } from '../../infra/repositories/prisma/prismaUserRepo';
import { UpdatePerfilInputZod } from '../../dtos/perfil/UpdatePerfilInputDTO';


export async function updatePerfil(request: Request, response: Response, next: NextFunction) {
    const perfil = request.body;
    const id = request.params.id;
    try {
      const updatePerfilUseCase = new UpdatePerfilUseCase(new PrismaUserRepository)
      const data = UpdatePerfilInputZod.parse(perfil)

      await updatePerfilUseCase.execute(data, id)
      return response.status(201).send({ message: "Perfil alterado com sucesso!" })
    } catch (err) {
      next(err)
    }
  }