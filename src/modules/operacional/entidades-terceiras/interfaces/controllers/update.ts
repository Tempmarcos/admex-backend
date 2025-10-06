import { NextFunction, Request, Response } from 'express';
import { EntidadeTerceiraFactory } from '../../domain/entities/entidadeTerceiraFactory';
import { UpdateEntidadeUseCase } from '../../application/use-cases/updateEntityUseCase';

export async function update(request: Request, response: Response, next: NextFunction){
    const tipo = request.params.tipo;
    const id = request.params.id;
    const entidade = request.body;

    try {
      const updateEntidadeTerceiraUseCase = new UpdateEntidadeUseCase(
        EntidadeTerceiraFactory.criarRepositorio(tipo)
      );

      const DTO = EntidadeTerceiraFactory.criarDTO(tipo)
      
      DTO.parse(entidade)
      // console.log(entidade)
  
      await updateEntidadeTerceiraUseCase.execute(entidade, id);
  
      return response.status(201).json({ message: `${tipo} editado com sucesso!` });
    } catch (err) {
      next(err);
    }
}