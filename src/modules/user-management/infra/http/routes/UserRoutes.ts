import { confirmarUpdateEmail } from "../../../interfaces/controllers/confirmarUpdateEmail";
import { create } from "../../../interfaces/controllers/create";
import { deleteUser } from "../../../interfaces/controllers/deleteUser";
import { getUser } from "../../../interfaces/controllers/getUser";
import { list } from "../../../interfaces/controllers/list";
import { update } from "../../../interfaces/controllers/update";
import { updateEmail } from "../../../interfaces/controllers/updateEmail";
import { updatePerfil } from "../../../interfaces/controllers/updatePerfil";
import { updateSenha } from "../../../interfaces/controllers/updateSenha";

const express = require('express');

const usersRoutes = express.Router();

usersRoutes.post("/", create) //esse create vai ser pro convite com token

usersRoutes.get("/", list)

usersRoutes.get("/:id", getUser)

usersRoutes.patch("/:id", update)

usersRoutes.patch("/email/:id", updateEmail)

usersRoutes.get("/confirmar-email-update/:token", confirmarUpdateEmail)

usersRoutes.patch("/senha/:id", updateSenha)

usersRoutes.patch("/perfil/:id", updatePerfil)

usersRoutes.delete("/:id", deleteUser)

export { usersRoutes }