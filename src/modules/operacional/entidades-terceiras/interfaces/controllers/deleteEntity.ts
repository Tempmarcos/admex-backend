import { NextFunction, Request, Response } from "express";
import { DeleteEntidadeUseCase } from "../../application/use-cases/deleteEntidadeUseCase";
import { EntidadeTerceiraFactory } from "../../domain/entities/entidadeTerceiraFactory";

export async function deleteEntity(request: Request, response: Response, next: NextFunction){
    const id = request.params.id;
    const { tipo} = request.body

    try {
      const deleteEntidadeTerceiraUseCase = new DeleteEntidadeUseCase(
        EntidadeTerceiraFactory.criarRepositorio(tipo)
      );
  
      await deleteEntidadeTerceiraUseCase.execute(id);
  
      return response.status(201).json({ message: `${tipo} deletado com sucesso!` });
    } catch (err) {
      next(err);
    }
}