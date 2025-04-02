import { NextFunction, Request, Response } from 'express';
import { DeleteTarefaUseCase } from '../../application/use-cases/deleteTarefaUseCase';
import { PrismaTarefaRepository } from '../../infra/repositories/prisma/prismaTarefaRepo';



export async function deleteTarefa(request: Request, response: Response, next: NextFunction) {
    const id = request.params.id;
    try{
        const deleteTarefaUseCase = new DeleteTarefaUseCase(new PrismaTarefaRepository)
        await deleteTarefaUseCase.execute(id)
        return response.status(201).send({message: "Usuário deletado com sucesso!"});
    }catch (err){
        next(err)
    }
}