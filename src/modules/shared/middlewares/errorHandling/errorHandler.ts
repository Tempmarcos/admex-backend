import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { env } from "../../../../env";
import { BaseError } from "../../errors/baseError/BaseError";
import { Prisma } from "@prisma/client";
import { logErrorToDB } from "../../utils/dbLogger";
import { sendErrorEmail } from "../../services/emailService";


export async function errorHandler (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) : Promise<any> {

    const metadata= {
      path: req.path,
      method: req.method,
      body: req.body,
      params: req.params,
      query: req.query
    };
    await logErrorToDB(err, metadata);


    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        return res.status(409).json({
          error: {
            message: "Registro duplicado",
            details: `O campo ${err.meta?.target} já existe.`,
          },
        });
      }
      return res.status(400).json({
        error: {
          message: "Erro no banco de dados",
          details: err.meta,
          code: err.code,
        },
      });
    }


    if (err instanceof BaseError) {
        return res.status(err.statusCode).json({
          error: {
            message: err.message,
            details: err.details,
            // Adicione stack apenas em desenvolvimento
            stack: env.NODE_ENV === "dev" ? err.stack : undefined,
          },
        });
      } else {
        // sendErrorEmail(err, metadata).catch(console.error);
        console.error("Erro não tratado:", err);
        res.status(500).json({
            error: {
                message: "Erro interno no servidor",
                // Mostre stack apenas em desenvolvimento
                stack: env.NODE_ENV === "dev" ? err.stack : undefined,
                },
         });
      }


}