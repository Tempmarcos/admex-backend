import { NextFunction, Request, Response } from 'express';
import { PrismaUserRepository } from '../../infra/repositories/prisma/prismaUserRepo';
import { GerarConviteUseCase } from '../../application/use-cases/create/gerarConviteUseCase';
import { JWTService } from '../../infra/services/auth/jwtService';


export async function gerarConvite(request: Request, response: Response, next: NextFunction) {
    const empresaId = response.locals.user.empresaId
    try {
        const gerarConviteUseCase = new GerarConviteUseCase(new JWTService);
        const token = await gerarConviteUseCase.execute(empresaId)
        // console.log(token)
        return response.status(200).send(token)
    } catch (error) {
        next(error)
    }
}