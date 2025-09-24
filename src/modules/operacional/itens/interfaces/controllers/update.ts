import { NextFunction, Request, Response } from "express";
import { ItemFactory } from "../../domain/ItemFactory";
import { UpdateItemUseCase } from "../../application/use-cases/updateItemUseCase";

export async function update(request: Request, response: Response, next: NextFunction){
    const item = request.body
    const tipo = request.params.tipo;
    const id = request.params.id;

    try {
      const updateItemUseCase = new UpdateItemUseCase(
        ItemFactory.criarRepositorio(tipo)
      );
  
      const DTO = ItemFactory.criarDTO(tipo)

      DTO.parse(item)

      await updateItemUseCase.execute(item, id);
  
      return response.status(201).json({ message: `${tipo} editado com sucesso!` });
    } catch (err) {
      next(err);
    }
}