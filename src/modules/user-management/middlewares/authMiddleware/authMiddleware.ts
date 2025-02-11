import { Request, Response, NextFunction } from 'express';
import { JWTService } from '../../infra/services/auth/jwtService';
import { PrismaUserRepository } from '../../infra/repositories/prisma/prismaUserRepo';


export async function authMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Token não fornecido' });
    }
  
    const token = authHeader.split(' ')[1];
  
    // 2. Verificar o token
    const decoded = JWTService.verify(token);
  
    if (!decoded) {
      return res.status(401).json({ error: 'Token inválido ou expirado' });
    }
  
    // 3. Buscar o usuário no banco (opcional, mas recomendado)
    try {
      const user = await  PrismaUserRepository.findById({
        where: { id: decoded.id },
      });
  
      if (!user) {
        return res.status(401).json({ error: 'Usuário não encontrado' });
      }
  
      // 4. Anexar o usuário ao request
      req.params.user= user;
      next();
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao validar token' });
    }
  }