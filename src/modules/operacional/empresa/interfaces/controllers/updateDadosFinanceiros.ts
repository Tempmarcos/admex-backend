import { NextFunction, Request, Response } from 'express';
import { PrismaEmpresaRepository } from '../../infra/repositories/prisma/prismaEmpresaRepo';
import { dadosFinanceirosSchema } from '../../dtos/createDadosFinanceirosDTO';
import { UpdateDadosFinanceirosUseCase } from '../../application/use-cases/update/updateDadosFinanceirosUseCase';




export async function updateDadosFinanceiros(request: Request, response: Response, next: NextFunction) {
    const dados = request.body;
    const id = request.params.id;
    try {
      const updateEmpresaUseCase = new UpdateDadosFinanceirosUseCase(new PrismaEmpresaRepository)
      const data = dadosFinanceirosSchema.parse(dados)

      await updateEmpresaUseCase.execute(data, id)
      return response.status(201).send({ message: "Dados financeiros alterados com sucesso!" })
    } catch (err) {
      next(err)
    }
  }