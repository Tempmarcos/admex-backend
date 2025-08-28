import { authMiddleware } from "../../../../../user-management/middlewares/authMiddleware/authMiddleware";
import { create } from "../../../interfaces/controllers/create";
import { deleteTarefa } from "../../../interfaces/controllers/deleteTarefa";
import { getTarefa } from "../../../interfaces/controllers/getTarefa";
import { list } from "../../../interfaces/controllers/list";
import { update } from "../../../interfaces/controllers/update";

const express = require('express');

const tarefaRoutes = express.Router();

tarefaRoutes.post("/", authMiddleware, create)

tarefaRoutes.get("/", authMiddleware, list)

tarefaRoutes.get("/:id", authMiddleware, getTarefa)

tarefaRoutes.patch("/:id", authMiddleware, update)

tarefaRoutes.delete("/:id", authMiddleware, deleteTarefa)

export { tarefaRoutes }