import { NextFunction, Request, Response } from "express";
import { PrismaPropostaRepository } from "../../infra/repositories/prisma/prismaPropostaRepository";
import { CreatePDFUseCase, PDFInputData } from "../../application/use-cases/createPDFUseCase";
import { PrismaEmpresaRepository } from "../../../empresa/infra/repositories/prisma/prismaEmpresaRepo";
import { PDFKitGenerator } from "../../infra/pdf/PDFKitGenerator";



export async function createPDF(request: Request, response: Response, next: NextFunction){
    const data : PDFInputData = request.body;
    const empresaId = response.locals.user.empresaId;

    try {
      const createPropostaUseCase = new CreatePDFUseCase(new PDFKitGenerator(), 
      new PrismaPropostaRepository, new PrismaEmpresaRepository());
  
      //const data = createPropostaSchema.parse(proposta)

      const pdfBuffer = await createPropostaUseCase.execute(data, empresaId);

      response.setHeader('Content-Type', 'application/pdf');
      response.setHeader(
        'Content-Disposition', 
        `attachment; filename=proposta-${data.propostaId}.pdf`
      );
      response.setHeader('Content-Length', pdfBuffer.length);

      // Envia o arquivo
      return response.send(pdfBuffer);

    } catch (err) {
      next(err);
    }
}