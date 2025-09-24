import { NextFunction, Request, Response } from "express";
import { GetItemUseCase } from "../../application/use-cases/getItemUseCase";
import { ItemFactory } from "../../domain/ItemFactory";

export async function getItem(request: Request, response: Response, next: NextFunction){
    const tipo = request.params.tipo
    const id = request.params.id;

    try {
      const getItemUseCase = new GetItemUseCase(
        ItemFactory.criarRepositorio(tipo)
      );
  
      const item = await getItemUseCase.execute(id);

      return response.status(200).send(item)
    } catch (err) {
      next(err);
    }
}