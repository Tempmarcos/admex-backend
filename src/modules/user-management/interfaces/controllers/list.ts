import { NextFunction, Request, Response } from 'express';
import { ListUserUseCase } from '../../application/use-cases/listUserUseCase';
import { PrismaUserRepository } from '../../infra/repositories/prisma/prismaUserRepo';


export async function list(request: Request, response: Response, next: NextFunction, empresaId: string){
    try {

        const listUserUseCase = new ListUserUseCase(new PrismaUserRepository)
        const users = await listUserUseCase.execute(empresaId)
    
        return response.status(200).send(users)
    
      } catch (error) {
        next(error)
      }
}