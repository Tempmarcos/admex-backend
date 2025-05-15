import { NextFunction, Request, Response } from 'express';
import { PrismaEmpresaRepository } from '../../infra/repositories/prisma/prismaEmpresaRepo';
import { TestarRegistroUseCase } from '../../application/use-cases/testarRegistroUseCase';



export async function testarRegistro(request: Request, response: Response, next: NextFunction){
    const registro = request.body.registro
    try {
            const testarRegistroUseCase = new TestarRegistroUseCase(new PrismaEmpresaRepository)
            const testarRegistro = await testarRegistroUseCase.execute(registro)
    
            return response.status(200).send(testarRegistro)
          } catch (error) {
            next(error)
          }
}