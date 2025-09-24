import { NextFunction, Request, Response } from "express";
import { ItemFactory } from "../../domain/ItemFactory";
import { ListItemUseCase } from "../../application/use-cases/listItemUseCase";


export async function list(request: Request, response: Response, next: NextFunction){
    const tipo = request.params.tipo
    const empresaId = response.locals.user.empresaId;

    try {
      const listItemUseCase = new ListItemUseCase(
        ItemFactory.criarRepositorio(tipo)
      );
  
      const itens =  await listItemUseCase.execute(empresaId);
  
      return response.status(200).send(itens)
    } catch (err) {
      next(err);
    }
}