import { NextFunction, Request, Response } from "express";
import { EntidadeTerceiraFactory } from "../../domain/entities/entidadeTerceiraFactory";
import { GetEntidadeUseCase } from "../../application/use-cases/getEntityUseCase";

export async function getEntity(request: Request, response: Response, next: NextFunction){
    const id = request.params.id;
    const { tipo} = request.body

    try {
      const getEntidadeTerceiraUseCase = new GetEntidadeUseCase(
        EntidadeTerceiraFactory.criarRepositorio(tipo)
      );
  
      const entidade = await getEntidadeTerceiraUseCase.execute(id);
  
      return response.status(200).send(entidade)
    } catch (err) {
      next(err);
    }
}