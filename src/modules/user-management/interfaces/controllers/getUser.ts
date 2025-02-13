import { NextFunction, Request, Response } from 'express';
import { GetUserUseCase } from '../../application/use-cases/getUserUseCase';
import { PrismaUserRepository } from '../../infra/repositories/prisma/prismaUserRepo';
import { GetUserDTO } from '../../dtos/user/GetUserDTO';


export async function getUser(request: Request, response: Response, next: NextFunction){
    const id = request.params.id;
    try {
        const getUserUseCase = new GetUserUseCase(new PrismaUserRepository)
        const user= await getUserUseCase.execute(id)

        
        return response.status(200).send(user)
      } catch (error) {
        next(error)
      }
}