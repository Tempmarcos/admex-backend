import { NextFunction, Request, Response } from "express";
import { DeleteEntidadeUseCase } from "../../application/use-cases/deleteEntidadeUseCase";
import { EntidadeTerceiraFactory } from "../../domain/entities/entidadeTerceiraFactory";

export async function deleteEntity(request: Request, response: Response, next: NextFunction){
    const { tipo, id } = request.body

    try {
      const createEntidadeTerceiraUseCase = new DeleteEntidadeUseCase(
        EntidadeTerceiraFactory.criarRepositorio(tipo)
      );
  
      await createEntidadeTerceiraUseCase.execute(id);
  
      return response.status(201).json({ message: `${tipo} deletado com sucesso!` });
    } catch (err) {
      next(err);
    }
}