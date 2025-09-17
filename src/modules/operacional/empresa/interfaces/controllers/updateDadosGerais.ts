import { NextFunction, Request, Response } from 'express';
import { UpdateDadosGeraisUseCase } from '../../application/use-cases/update/updateDadosGeraisUseCase';
import { PrismaEmpresaRepository } from '../../infra/repositories/prisma/prismaEmpresaRepo';
import { dadosGeraisSchema } from '../../dtos/createDadosGeraisDTO';



export async function updateDadosGerais(request: Request, response: Response, next: NextFunction) {
    const dados = request.body;
    const id = response.locals.user.empresaId;
    try {
      dados.endereco.codigoPostal = dados.endereco.codigoPostal.toString();
      const updateDadosGeraisUseCase = new UpdateDadosGeraisUseCase(new PrismaEmpresaRepository)
      const data = dadosGeraisSchema.parse(dados)

      await updateDadosGeraisUseCase.execute(data, id)
      return response.status(201).send({ message: "Dados gerais alterados com sucesso!" })
    } catch (err) {
      next(err)
    }
  }