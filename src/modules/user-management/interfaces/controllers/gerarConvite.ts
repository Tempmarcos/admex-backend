import { NextFunction, Request, Response } from 'express';
import { GerarConviteUseCase } from '../../application/use-cases/create/gerarConviteUseCase';
import { JWTService } from '../../infra/services/auth/jwtService';
import { PrismaConviteRepository } from '../../infra/repositories/prisma/prismaConviteRepo';


export async function gerarConvite(request: Request, response: Response, next: NextFunction) {
    const empresaId = response.locals.user.empresaId
    const created_by = response.locals.created_by.nome
    try {
        const gerarConviteUseCase = new GerarConviteUseCase(new JWTService, new PrismaConviteRepository);
        const token = await gerarConviteUseCase.execute(empresaId, created_by)
        // console.log(token)
        return response.status(200).send(token)
    } catch (error) {
        next(error)
    }
}