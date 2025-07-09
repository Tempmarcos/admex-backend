import { NextFunction, Request, Response } from 'express';
import { VerifyConviteUseCase } from '../../application/use-cases/convite/verifyConviteUseCase';
import { JWTService } from '../../infra/services/auth/jwtService';
import { PrismaConviteRepository } from '../../infra/repositories/prisma/prismaConviteRepo';


export async function verificarConvite(request: Request, response: Response, next: NextFunction) {
    const token = request.body
    try {
        const verifyConviteUseCase = new VerifyConviteUseCase(new PrismaConviteRepository, new JWTService);
        const verifyToken = await verifyConviteUseCase.execute(token)
        return response.status(200).send(verifyToken)
    } catch (error) {
        next(error)
    }
}