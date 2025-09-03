import { NextFunction, Request, Response } from 'express';
import { PrismaUserRepository } from '../../infra/repositories/prisma/prismaUserRepo';
import { UpdatePermissionsUseCase } from '../../application/use-cases/update/updatePermissionsUseCase';
import { UpdatePermissionsInputZod } from '../../dtos/user/UpdatePermissionDTO';


export async function updatePermissions(request: Request, response: Response, next: NextFunction) {
    const permissions = request.body;
    const targetId = request.params.id;
    const actingUser = response.locals.user
    try {
      const updateUserUseCase = new UpdatePermissionsUseCase(new PrismaUserRepository)
      const data = UpdatePermissionsInputZod.parse(permissions)

      await updateUserUseCase.execute(data, targetId, actingUser)
      return response.status(201).send({ message: "Usuário alterado com sucesso!" })
    } catch (err) {
      next(err)
    }
  }