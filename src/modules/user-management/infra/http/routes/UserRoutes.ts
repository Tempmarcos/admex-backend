import { confirmarUpdateEmail } from "../../../interfaces/controllers/confirmarUpdateEmail";
import { create } from "../../../interfaces/controllers/create";
import { deleteUser } from "../../../interfaces/controllers/deleteUser";
import { enviarCodigoEmail } from "../../../interfaces/controllers/enviarCodigoEmail";
import { getUser } from "../../../interfaces/controllers/getUser";
import { list } from "../../../interfaces/controllers/list";
import { testarEmail } from "../../../interfaces/controllers/testarEmail";
import { updatePermissions } from "../../../interfaces/controllers/updatePermissions";
import { updateEmail } from "../../../interfaces/controllers/updateEmail";
import { updatePerfil } from "../../../interfaces/controllers/updatePerfil";
import { updateSenha } from "../../../interfaces/controllers/updateSenha";
import { authMiddleware } from "../../../middlewares/authMiddleware/authMiddleware";
import { canDeleteUserMiddleware } from "../../../middlewares/canDeleteUserMiddleware";
import { permissionMiddleware } from "../../../middlewares/permissionMiddleware/permissionMiddleware";
import { PrismaUserRepository } from "../../repositories/prisma/prismaUserRepo";

const express = require('express');

const usersRoutes = express.Router();

usersRoutes.post("/testar-email", testarEmail) //testar email para cadastro

usersRoutes.post("/enviar-codigo-email", enviarCodigoEmail) //enviar código de confirmação para cadastro

usersRoutes.post("/:token", create) //create com convite

usersRoutes.get("/", authMiddleware, permissionMiddleware(['verUsuarios'], 'ALL'), list)

usersRoutes.get("/:id", authMiddleware, permissionMiddleware(['verInfoUsuario'], 'ALL',), getUser)

usersRoutes.patch("/permissoes/:id", authMiddleware, permissionMiddleware(['editarUsuarios'], 'ALL',), updatePermissions)

// usersRoutes.patch("/email/:id", authMiddleware, updateEmail)

// usersRoutes.get("/confirmar-email-update/:token", confirmarUpdateEmail)

// usersRoutes.patch("/senha/:id", authMiddleware, updateSenha)

// usersRoutes.patch("/perfil/:id", authMiddleware, updatePerfil)

usersRoutes.delete("/:id", authMiddleware, canDeleteUserMiddleware(new PrismaUserRepository), deleteUser)

export { usersRoutes }