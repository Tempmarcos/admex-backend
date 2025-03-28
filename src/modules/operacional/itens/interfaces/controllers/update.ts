import { NextFunction, Request, Response } from "express";
import { ItemFactory } from "../../domain/ItemFactory";
import { UpdateItemUseCase } from "../../application/use-cases/updateItemUseCase";

export async function update(request: Request, response: Response, next: NextFunction){
    const { item, tipo, id } = request.body

    try {
      const createItemUseCase = new UpdateItemUseCase(
        ItemFactory.criarRepositorio(tipo)
      );
  
      const DTO = ItemFactory.criarDTO(tipo)

      DTO.parse(item)

      await createItemUseCase.execute(item, id);
  
      return response.status(201).json({ message: `${tipo} criado com sucesso!` });
    } catch (err) {
      next(err);
    }
}