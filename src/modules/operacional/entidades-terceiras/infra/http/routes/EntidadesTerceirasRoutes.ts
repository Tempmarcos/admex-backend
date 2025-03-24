import { create } from "../../../interfaces/controllers/create";
import { deleteEntity } from "../../../interfaces/controllers/deleteEntity";
import { getEntity } from "../../../interfaces/controllers/getEntity";
import { list } from "../../../interfaces/controllers/list";


const express = require('express');

const entidadesTerceirasRoutes = express.Router();

entidadesTerceirasRoutes.post("/", create) 

entidadesTerceirasRoutes.get("/", list) 

entidadesTerceirasRoutes.get("/:id", getEntity)

// entidadesTerceirasRoutes.patch("/dados-gerais/:id", updateDadosGerais)

// entidadesTerceirasRoutes.patch("/dados-fiscais/:id", updateDadosFiscais)

// entidadesTerceirasRoutes.patch("/dados-financeiros/:id", updateDadosFinanceiros)

entidadesTerceirasRoutes.delete("/:id", deleteEntity)

export { entidadesTerceirasRoutes }