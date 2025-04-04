import { create } from "../../../interfaces/controllers/create";
import { deleteTarefa } from "../../../interfaces/controllers/deleteTarefa";
import { getTarefa } from "../../../interfaces/controllers/getTarefa";
import { list } from "../../../interfaces/controllers/list";
import { update } from "../../../interfaces/controllers/update";

const express = require('express');

const tarefaRoutes = express.Router();

tarefaRoutes.post("/", create)

tarefaRoutes.get("/", list)

tarefaRoutes.get("/:id", getTarefa)

tarefaRoutes.patch("/:id", update)

tarefaRoutes.delete("/:id", deleteTarefa)

export { tarefaRoutes }