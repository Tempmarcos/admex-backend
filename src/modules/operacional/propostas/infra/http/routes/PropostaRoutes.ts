import { create } from "../../../interfaces/controllers/create";
import { getProposta } from "../../../interfaces/controllers/getProposta";
import { list } from "../../../interfaces/controllers/list";

const express = require('express');

const propostaRoutes = express.Router();

propostaRoutes.post("/", create)

propostaRoutes.get("/", list)

propostaRoutes.get("/:id", getProposta)

// propostaRoutes.patch("/:id", update)

// propostaRoutes.patch("/versao/:id", updateVersao)

// propostaRoutes.post("/versao/", createVersao)

// propostaRoutes.delete("/:id", deleteProposta)

// propostaRoutes.delete("/versao/:id", deleteVersao)


export { propostaRoutes }