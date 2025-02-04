import { NextFunction, Request, Response } from 'express';
import { ListUserUseCase } from '../../application/use-cases/listUserUseCase';
import { PrismaUserRepository } from '../../infra/repositories/prisma/prismaUserRepo';
import { ListUserDTO } from '../../dtos/user/ListUserDTO';


export async function list(request: Request, response: Response, next: NextFunction){
    const empresaId = request.params.empresaId;
    try {
        const listUserUseCase = new ListUserUseCase(new PrismaUserRepository)
        const users = await listUserUseCase.execute(empresaId)

        const usersDTO: ListUserDTO[] = users.map(user => ({
          id: user.id,
          nome: user.nome,
        }));
        return response.status(200).send(usersDTO)
      } catch (error) {
        next(error)
      }
}