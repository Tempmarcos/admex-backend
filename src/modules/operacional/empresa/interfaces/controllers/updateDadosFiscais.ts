import { NextFunction, Request, Response } from 'express';
import { PrismaEmpresaRepository } from '../../infra/repositories/prisma/prismaEmpresaRepo';
import { UpdateDadosFiscaisUseCase } from '../../application/use-cases/update/updateDadosFiscaisUseCase';
import { dadosFiscaisSchema } from '../../dtos/DadosFiscais/DadosFiscaisDTO';




export async function updateDadosFiscais(request: Request, response: Response, next: NextFunction) {
    const dados = request.body;
    const id = response.locals.user.empresaId;
    try {
      const updateDadosFiscaisUseCase = new UpdateDadosFiscaisUseCase(new PrismaEmpresaRepository)
      const data = dadosFiscaisSchema.parse(dados)

      await updateDadosFiscaisUseCase.execute(data, id)
      return response.status(201).send({ message: "Dados fiscais alterados com sucesso!" })
    } catch (err) {
      next(err)
    }
  }