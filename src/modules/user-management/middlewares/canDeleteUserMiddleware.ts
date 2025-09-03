import { NextFunction, Request, Response } from "express";
import { permissionMiddleware } from "./permissionMiddleware/permissionMiddleware";
import { isLastAdmin } from "../interfaces/controllers/isLastAdmin";
import { UserRepository } from "../infra/repositories/interfaceDB/UserRepository";

interface AuthRequest extends Request {
  user?: {
    permissions: string[];
  };
}
export function canDeleteUserMiddleware(userRepository: UserRepository){
    return async(req: AuthRequest, res: Response, next: NextFunction) => {
        const requester = res.locals.user;
        const targetId = req.params.id;

        if (!targetId) {
        return res.status(400).json({ message: 'ID do usuário é obrigatório.' });
        }

        if (requester.id === targetId) {
            if (await isLastAdmin(requester.id, userRepository)) {
                return res.status(403).json({ message: 'Não é possível remover o último administrador.' });
            }
            return next(); // pode se deletar
        }

        const targetUser = await userRepository.findById(targetId);
        if (!targetUser) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        if (targetUser.admin) {
            return res.status(403).json({ message: 'Apenas o próprio administrador pode se deletar.' });
        }

        return permissionMiddleware('deletarUsuarios')(req, res, next);
    }
}