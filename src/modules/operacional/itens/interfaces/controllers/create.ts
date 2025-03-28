import { NextFunction, Request, Response } from "express";
import { CreateItemUseCase } from "../../application/use-cases/createItemUseCase";
import { ItemFactory } from "../../domain/ItemFactory";


export async function create(request: Request, response: Response, next: NextFunction){
    const { item, tipo, empresaId } = request.body

    try {
      const createItemUseCase = new CreateItemUseCase(
        ItemFactory.criarRepositorio(tipo)
      );
  
      const DTO = ItemFactory.criarDTO(tipo)

      DTO.parse(item)

      await createItemUseCase.execute(item, empresaId);
  
      return response.status(201).json({ message: `${tipo} criado com sucesso!` });
    } catch (err) {
      next(err);
    }
}