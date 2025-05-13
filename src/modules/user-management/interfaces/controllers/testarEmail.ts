import { NextFunction, Request, Response } from 'express';
import { TestarEmailUseCase } from '../../application/use-cases/testarEmailUseCase';
import { PrismaUserRepository } from '../../infra/repositories/prisma/prismaUserRepo';


export async function testarEmail(request: Request, response: Response, next: NextFunction){
    const email = request.body.email
    try {
            const testarEmailUseCase = new TestarEmailUseCase(new PrismaUserRepository)
            const testarEmail = await testarEmailUseCase.execute(email)
    
            return response.status(200).send(testarEmail)
          } catch (error) {
            next(error)
          }
}