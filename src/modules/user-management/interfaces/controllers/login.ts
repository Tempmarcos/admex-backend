import { NextFunction, Request, Response } from 'express';
import { LoginUseCase } from '../../application/use-cases/loginUseCase';
import { PrismaUserRepository } from '../../infra/repositories/prisma/prismaUserRepo';
import { JWTService } from '../../infra/services/auth/jwtService';
import { LoginSchema } from '../../dtos/login/LoginDTO';



export async function login(request: Request, response: Response, next: NextFunction) {
    const email = request.body.email;
    const senha = request.body.senha;

    try{
        const loginUseCase = new LoginUseCase(new PrismaUserRepository, new JWTService)
        const dataParse = LoginSchema.parse({email, senha});
        const data = await loginUseCase.execute(dataParse)
        
        return response.status(200).send(data)
    }catch(err){
        next(err)
    }

}