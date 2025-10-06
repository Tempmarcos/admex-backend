import { NextFunction, Request, Response } from 'express';
import { CreateEntidadeUseCase } from '../../application/use-cases/createEntityUseCase';
import { EntidadeTerceiraFactory } from '../../domain/entities/entidadeTerceiraFactory';

export async function create(request: Request, response: Response, next: NextFunction){
    const entidade = request.body
    const tipo = request.params.tipo
    const empresaId = response.locals.user.empresaId;

    try {
      const createEntidadeTerceiraUseCase = new CreateEntidadeUseCase(
        EntidadeTerceiraFactory.criarRepositorio(tipo)
      );

      const DTO = EntidadeTerceiraFactory.criarDTO(tipo)
      
      DTO.parse(entidade)
  
      await createEntidadeTerceiraUseCase.execute(entidade, empresaId);
  
      return response.status(201).json({ message: `${tipo} criado com sucesso!` });
    } catch (err) {
      next(err);
    }
}
