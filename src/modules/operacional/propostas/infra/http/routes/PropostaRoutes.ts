import { create } from "../../../interfaces/controllers/create";
import { deleteProposta } from "../../../interfaces/controllers/deleteProposta";
import { getProposta } from "../../../interfaces/controllers/getProposta";
import { list } from "../../../interfaces/controllers/list";
import { update } from "../../../interfaces/controllers/update";

const express = require('express');

const propostaRoutes = express.Router();

propostaRoutes.post("/", create)

propostaRoutes.get("/", list)

propostaRoutes.get("/:id", getProposta)

propostaRoutes.patch("/:id", update)

propostaRoutes.delete("/:id", deleteProposta)

// propostaRoutes.patch("/versao/:id", updateVersao)

// propostaRoutes.post("/versao/", createVersao)

// propostaRoutes.delete("/versao/:id", deleteVersao)


export { propostaRoutes }