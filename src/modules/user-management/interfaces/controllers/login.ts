import { NextFunction, Request, Response } from 'express';
import { LoginUseCase } from '../../application/use-cases/loginUseCase';
import { PrismaUserRepository } from '../../infra/repositories/prisma/prismaUserRepo';
import { JWTService } from '../../infra/services/auth/jwtService';
import { LoginSchema } from '../../dtos/user/loginDTO';



export async function login(request: Request, response: Response, next: NextFunction) {
    const email = request.body.email;
    const senha = request.body.senha;

    try{
        const loginUseCase = new LoginUseCase(new PrismaUserRepository, new JWTService)
        const data = LoginSchema.parse({email, senha});

        return await loginUseCase.execute(data)
    }catch(err){
        next(err)
    }

}