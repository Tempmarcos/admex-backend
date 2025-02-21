import { NextFunction, Request, Response } from 'express';
import { JWTService } from '../../infra/services/auth/jwtService';
import { PrismaUserRepository } from '../../infra/repositories/prisma/prismaUserRepo';



export async function confirmarUpdateEmail(request: Request, response: Response, next: NextFunction){
    const token = request.params.token

    if (typeof token !== "string") {
        return response.status(400).json({ error: "Token inválido" });
      }

    try {
        const jwt = new JWTService;
        const userRepository = new PrismaUserRepository;

        const decoded = await jwt.verify(token)
        console.log(decoded)
        await userRepository.updateEmail(decoded.id, decoded.email);
        return response.json({ success: true });
    }  catch (error) {
        // response.status(400).json({ error: 'Token inválido ou expirado' });
        return response.json({error})
  }
}