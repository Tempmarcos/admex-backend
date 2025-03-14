import { NextFunction, Request, Response } from 'express';
import { PrismaEmpresaRepository } from '../../infra/repositories/prisma/prismaEmpresaRepo';
import { GetEmpresaUseCase } from '../../application/use-cases/getEmpresaUseCase';




export async function getEmpresa(request: Request, response: Response, next: NextFunction){
    const id = request.params.id;
    try {
        const getEmpresaUseCase = new GetEmpresaUseCase(new PrismaEmpresaRepository)
        const empresa= await getEmpresaUseCase.execute(id)

        
        return response.status(200).send(empresa)
      } catch (error) {
        next(error)
      }
}