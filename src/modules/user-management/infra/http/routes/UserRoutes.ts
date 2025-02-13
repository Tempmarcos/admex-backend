import { create } from "../../../interfaces/controllers/create";
import { deleteUser } from "../../../interfaces/controllers/deleteUser";
import { getUser } from "../../../interfaces/controllers/getUser";
import { list } from "../../../interfaces/controllers/list";
import { update } from "../../../interfaces/controllers/update";

const express = require('express');

const usersRoutes = express.Router();

usersRoutes.post("/", create) //esse create vai ser pro convite com token

usersRoutes.get("/", list)

usersRoutes.get("/:id", getUser)

usersRoutes.patch("/:id", update)

// usersRoutes.patch("/email", updateEmail)

// usersRoutes.patch("/senha", updateSenha)

// usersRoutes.patch("/perfil", updatePerfil)

usersRoutes.delete("/:id", deleteUser)

export { usersRoutes }