import { NextFunction, Request, Response } from 'express';
import { ListConviteDTO } from '../../../dtos/convite/ListConviteDTO';
import { PrismaConviteRepository } from '../../../infra/repositories/prisma/prismaConviteRepo';
import { ListConviteUseCase } from '../../../application/use-cases/convite/listConviteUseCase';


export async function list(request: Request, response: Response, next: NextFunction) {
    const empresaId = response.locals.user.empresaId
    try {
        const listConviteUseCase = new ListConviteUseCase(new PrismaConviteRepository)
        const convites = await listConviteUseCase.execute(empresaId)
        return response.status(200).send(convites)
    } catch (error) {
        next(error)
    }
}