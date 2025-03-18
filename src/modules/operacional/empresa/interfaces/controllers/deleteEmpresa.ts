import { NextFunction, Request, Response } from 'express';
import { PrismaEmpresaRepository } from '../../infra/repositories/prisma/prismaEmpresaRepo';
import { DeleteEmpresaUseCase } from '../../application/use-cases/deleteEmpresaUseCase';




export async function deleteEmpresa(request: Request, response: Response, next: NextFunction) {
    const id = request.params.id;
    // console.log(id)
    try{
        const deleteEmpresaUseCase = new DeleteEmpresaUseCase(new PrismaEmpresaRepository)
        await deleteEmpresaUseCase.execute(id)
        return response.status(201).send({message: "Empresa deletada com sucesso!"});
    }catch (err){
        next(err)
    }
}