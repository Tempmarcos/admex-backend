import { Request, Response, NextFunction } from 'express';
import { erroNaoAutenticado } from '../../../shared/errors/user/auth/erroNaoAutenticado';
import { acessoNegadoError } from '../../../shared/errors/permissoes/acessoNegadoError';


type Permission = string | string[];
type PermissionCheck = 'ALL' | 'ANY';

interface AuthRequest extends Request {
  user?: {
    permissions: string[];
  };
}

export function permissionMiddleware(requiredPermissions: Permission,
                                 checkType: PermissionCheck = 'ALL') {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      if (!res.locals.user) {
        throw new erroNaoAutenticado();
      }

      const required = Array.isArray(requiredPermissions)
        ? requiredPermissions
        : [requiredPermissions];

      const userPermissions = res.locals.user.permissoes || [];

      const userAdmin = res.locals.user.admin;

      let hasPermission = false;
      if(userAdmin){
        hasPermission = true; //ADM tem todas as permissões
      } else if (checkType === 'ALL') {
          hasPermission = required.every(perm => 
          userPermissions.includes(perm)
        );
      } else {
        hasPermission = required.some(perm => 
          userPermissions.includes(perm)
        );
      }

      if (!hasPermission) {
        throw new acessoNegadoError();
      }

      next();
    } catch (error) {
      console.error('Erro na verificação de permissões:', error);
      throw new acessoNegadoError();
    }
  };
}