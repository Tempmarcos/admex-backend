import { authMiddleware } from "../../../../../user-management/middlewares/authMiddleware/authMiddleware";
import { create } from "../../../interfaces/controllers/create";
import { deleteProposta } from "../../../interfaces/controllers/deleteProposta";
import { getProposta } from "../../../interfaces/controllers/getProposta";
import { list } from "../../../interfaces/controllers/list";
import { update } from "../../../interfaces/controllers/update";
import { createVersao } from "../../../interfaces/controllers/versao/createVersao";
import { updateVersao } from "../../../interfaces/controllers/versao/updateVersao";

const express = require('express');

const propostaRoutes = express.Router();

propostaRoutes.post("/", authMiddleware, create)

propostaRoutes.get("/", authMiddleware, list)

propostaRoutes.get("/:id", authMiddleware, getProposta)

propostaRoutes.patch("/:id", authMiddleware, update)

propostaRoutes.delete("/:id", authMiddleware, deleteProposta)

propostaRoutes.patch("/versao/:id", authMiddleware, updateVersao)

propostaRoutes.post("/versao/", authMiddleware, createVersao)

// propostaRoutes.delete("/versao/:id", deleteVersao)


export { propostaRoutes }