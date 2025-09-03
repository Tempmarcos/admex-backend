import { NextFunction, Request, Response } from 'express';
import { PrismaConviteRepository } from '../../../infra/repositories/prisma/prismaConviteRepo';
import { CancelarConviteUseCase } from '../../../application/use-cases/convite/cancelarConviteUseCase';


export async function cancelarConvite(request: Request, response: Response, next: NextFunction) {
    const id = request.body.id;
    try {
        const cancelarConviteUseCase = new CancelarConviteUseCase(new PrismaConviteRepository)
        await cancelarConviteUseCase.execute(id)
        return response.status(200)
    } catch (error) {
        next(error)
    }
}