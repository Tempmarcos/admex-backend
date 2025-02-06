import { create } from "../../../interfaces/controllers/create";
import { deleteUser } from "../../../interfaces/controllers/deleteUser";
import { list } from "../../../interfaces/controllers/list";
import { update } from "../../../interfaces/controllers/update";

const express = require('express');

const usersRoutes = express.Router();

usersRoutes.post("/", create)

usersRoutes.get("/", list)

// usersRoutes.get("/:id", getUser)

usersRoutes.put("/", update)

usersRoutes.delete("/:id", deleteUser)

export { usersRoutes }