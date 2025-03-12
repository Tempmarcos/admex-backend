import { Request, Response, NextFunction } from 'express';
import { CreateEmpresaUseCase } from '../../application/use-cases/createEmpresaUseCase';
import { PrismaUserRepository } from '../../../../user-management/infra/repositories/prisma/prismaUserRepo';
import { PrismaEmpresaRepository } from '../../infra/repositories/prisma/prismaEmpresaRepo';
import { empresaSchema } from '../../dtos/CreateEmpresaDTO';
import { CreateUserInputZod } from '../../../../user-management/dtos/user/CreateUserInputDTO';

export async function create(request: Request, response: Response, next: NextFunction) {
    const { DadosGerais, DadosFinanceiros, DadosFiscais, User } = request.body;

    try{
        const empresaData = empresaSchema.parse({DadosGerais, DadosFinanceiros, DadosFiscais})
        const userData = CreateUserInputZod.parse(User)

        const createEmpresaUseCase = 
        new CreateEmpresaUseCase(new PrismaEmpresaRepository, new PrismaUserRepository);
        await createEmpresaUseCase.execute(empresaData, userData)
        return response.status(201).send({ message: "Empresa cadastrada com sucesso!" })
    }catch(err){
        next(err)
    }
}