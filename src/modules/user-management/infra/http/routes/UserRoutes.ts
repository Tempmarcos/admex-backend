import { confirmarUpdateEmail } from "../../../interfaces/controllers/confirmarUpdateEmail";
import { create } from "../../../interfaces/controllers/create";
import { deleteUser } from "../../../interfaces/controllers/deleteUser";
import { enviarCodigoEmail } from "../../../interfaces/controllers/enviarCodigoEmail";
import { getUser } from "../../../interfaces/controllers/getUser";
import { list } from "../../../interfaces/controllers/list";
import { testarEmail } from "../../../interfaces/controllers/testarEmail";
import { update } from "../../../interfaces/controllers/update";
import { updateEmail } from "../../../interfaces/controllers/updateEmail";
import { updatePerfil } from "../../../interfaces/controllers/updatePerfil";
import { updateSenha } from "../../../interfaces/controllers/updateSenha";
import { authMiddleware } from "../../../middlewares/authMiddleware/authMiddleware";
import { permissionMiddleware } from "../../../middlewares/permissionMiddleware/permissionMiddleware";

const express = require('express');

const usersRoutes = express.Router();

usersRoutes.post("/", create) //esse create vai ser pro convite com token

usersRoutes.get("/", authMiddleware, permissionMiddleware(['verUsuarios'], 'ALL'), list)

usersRoutes.get("/:id", authMiddleware, permissionMiddleware(['verInfoUsuario'], 'ALL',), getUser)

usersRoutes.patch("/:id", update)

usersRoutes.patch("/email/:id", updateEmail)

usersRoutes.get("/confirmar-email-update/:token", confirmarUpdateEmail)

usersRoutes.post("/testar-email", testarEmail)

usersRoutes.post("/enviar-codigo-email", enviarCodigoEmail)

usersRoutes.patch("/senha/:id", updateSenha)

usersRoutes.patch("/perfil/:id", updatePerfil)

usersRoutes.delete("/:id", deleteUser)

export { usersRoutes }