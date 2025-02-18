import { PrismaClient } from "@prisma/client";


export async function logErrorToDB(error: Error, metadata?: object) {
  const prisma = new PrismaClient();

  try {
    await prisma.errorLog.create({
      data: {
        message: error.message,
        stack: error.stack,
        metadata: metadata || {}
      }
    });
  } catch (dbError) {
    console.error('Falha ao salvar erro no banco:', dbError);
  }
}