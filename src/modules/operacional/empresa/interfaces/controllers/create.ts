import { Request, Response, NextFunction } from 'express';
import { CreateEmpresaUseCase } from '../../application/use-cases/createEmpresaUseCase';
import { PrismaUserRepository } from '../../../../user-management/infra/repositories/prisma/prismaUserRepo';
import { PrismaEmpresaRepository } from '../../infra/repositories/prisma/prismaEmpresaRepo';
import { empresaSchema } from '../../dtos/CreateEmpresaDTO';
import { InvalidCodeError } from '../../../../shared/errors/user/invalidCodeError';
import { CodigoVerificacaoRedis } from '../../../../user-management/infra/services/redis/codigoVerificacaoRedis';

export async function create(request: Request, response: Response, next: NextFunction) {
    const { DadosGerais, DadosFinanceiros, DadosFiscais, User, codigo } = request.body;
    try{
        DadosFiscais.registro = DadosFiscais.registro.toString();
        DadosFiscais.classificacao = DadosFiscais.classificacao.toString();
        DadosGerais.endereco.codigoPostal = DadosGerais.endereco.codigoPostal.toString();
        const codigoVerificado = await CodigoVerificacaoRedis.verificar(User.email, codigo);
        if (!codigoVerificado) throw new InvalidCodeError()
        const empresaData = empresaSchema.parse({DadosGerais, DadosFinanceiros, DadosFiscais, User})
        const createEmpresaUseCase = 
        new CreateEmpresaUseCase(new PrismaEmpresaRepository, new PrismaUserRepository);
        await createEmpresaUseCase.execute(empresaData)
        return response.status(201).send({ message: "Empresa cadastrada com sucesso!" })
    }catch(err){
        next(err)
    }
}