import { NextFunction, Request, Response } from "express";
import { DeleteItemUseCase } from "../../application/use-cases/deleteItemUseCase";
import { ItemFactory } from "../../domain/ItemFactory";

export async function deleteItem(request: Request, response: Response, next: NextFunction){
    const tipo = request.params.tipo;
    const id = request.params.id;

    try {
      const deleteItemUseCase = new DeleteItemUseCase(
        ItemFactory.criarRepositorio(tipo)
      );
  
      await deleteItemUseCase.execute(id);
  
      return response.status(201).json({ message: `${tipo} deletado com sucesso!` });
    } catch (err) {
      next(err);
    }
}