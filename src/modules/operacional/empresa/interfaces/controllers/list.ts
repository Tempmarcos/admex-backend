import { NextFunction, Request, Response } from 'express';
import { ListEmpresaUseCase } from '../../application/use-cases/listEmpresaUseCase';
import { PrismaEmpresaRepository } from '../../infra/repositories/prisma/prismaEmpresaRepo';
import { ListEmpresaDTO } from '../../dtos/listEmpresaDTO';



export async function list(request: Request, response: Response, next: NextFunction){
    // const empresaId = request.params.empresaId;
    try {
        const listEmpresaUseCase = new ListEmpresaUseCase(new PrismaEmpresaRepository)
        const empresas = await listEmpresaUseCase.execute()

        const empresasDTO: ListEmpresaDTO[] = empresas.map(empresa => ({
          id: empresa.id,
          nome: empresa.DadosGerais?.nome,
        }));
        return response.status(200).send(empresasDTO)
      } catch (error) {
        next(error)
      }
}