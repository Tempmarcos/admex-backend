import { NextFunction, Request, Response } from 'express';
import { VerifyConviteUseCase } from '../../../application/use-cases/convite/verifyConviteUseCase';
import { PrismaConviteRepository } from '../../../infra/repositories/prisma/prismaConviteRepo';
import { JWTService } from '../../../infra/services/auth/jwtService';
import { InvalidConviteError } from '../../../../shared/errors/user/convite/invalidConviteError';
import { ConviteNotExistsError } from '../../../../shared/errors/user/convite/conviteNotExistsError';
import { ConviteUsadoError } from '../../../../shared/errors/user/convite/conviteUsadoError';


export async function verificarConvite(request: Request, response: Response, next: NextFunction) {
    const token = request.body.token
    try {
        const verifyConviteUseCase = new VerifyConviteUseCase(new PrismaConviteRepository, new JWTService);
        const empresaId = await verifyConviteUseCase.execute(token)
        return response.status(200).json({
            valid: true,
            message: "Convite válido"
        });
    } catch (error) {
        if (error instanceof InvalidConviteError || 
            error instanceof ConviteNotExistsError || 
            error instanceof ConviteUsadoError) {
            return response.status(200).json({
                valid: false,
                message: error.message,
            });
        }
        next(error)
    }
}