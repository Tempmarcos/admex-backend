import { NextFunction, Request, Response } from "express";
import { EntidadeTerceiraFactory } from "../../domain/entities/entidadeTerceiraFactory";
import { ListEntidadeUseCase } from "../../application/use-cases/listEntityUseCase";

export async function list(request: Request, response: Response, next: NextFunction){
    const { tipo, empresaId } = request.body

    try {
      const listEntidadeTerceiraUseCase = new ListEntidadeUseCase(
        EntidadeTerceiraFactory.criarRepositorio(tipo)
      );
  
      const entidades =  await listEntidadeTerceiraUseCase.execute(empresaId);
  
      return response.status(200).send(entidades)
    } catch (err) {
      next(err);
    }
}