import { NextFunction, Request, Response } from 'express';
import { JWTService } from '../../../infra/services/auth/jwtService';
import { GerarConviteUseCase } from '../../../application/use-cases/convite/gerarConviteUseCase';
import { PrismaConviteRepository } from '../../../infra/repositories/prisma/prismaConviteRepo';


export async function gerarConvite(request: Request, response: Response, next: NextFunction) {
    const empresaId = response.locals.user.empresaId
    const created_by = response.locals.user.nome
    try {
        const gerarConviteUseCase = new GerarConviteUseCase(new JWTService, new PrismaConviteRepository);
        const token = await gerarConviteUseCase.execute(empresaId, created_by)
        // console.log(token)
        return response.status(200).send(token)
    } catch (error) {
        next(error)
    }
}