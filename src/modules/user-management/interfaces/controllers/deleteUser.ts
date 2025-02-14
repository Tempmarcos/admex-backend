import { NextFunction, Request, Response } from 'express';
import { DeleteUserUseCase } from '../../application/use-cases/deleteUserUseCase';
import { PrismaUserRepository } from '../../infra/repositories/prisma/prismaUserRepo';



export async function deleteUser(request: Request, response: Response, next: NextFunction) {
    const id = request.params.id;
    // console.log(id)
    try{
        const deleteUserUseCase = new DeleteUserUseCase(new PrismaUserRepository)
        await deleteUserUseCase.execute(id)
        return response.status(204).send({message: "Usuário deletado com sucesso!"});
    }catch (err){
        next(err)
    }
}