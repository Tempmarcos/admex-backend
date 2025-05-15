import { create } from "../../../interfaces/controllers/create";
import { deleteEmpresa } from "../../../interfaces/controllers/deleteEmpresa";
import { getEmpresa } from "../../../interfaces/controllers/getEmpresa";
import { list } from "../../../interfaces/controllers/list";
import { testarRegistro } from "../../../interfaces/controllers/testarRegistro";
import { updateDadosFinanceiros } from "../../../interfaces/controllers/updateDadosFinanceiros";
import { updateDadosFiscais } from "../../../interfaces/controllers/updateDadosFiscais";
import { updateDadosGerais } from "../../../interfaces/controllers/updateDadosGerais";


const express = require('express');

const empresaRoutes = express.Router();

empresaRoutes.post("/", create) 

empresaRoutes.get("/", list) //Desativar em produção

empresaRoutes.get("/:id", getEmpresa)

empresaRoutes.patch("/dados-gerais/:id", updateDadosGerais)

empresaRoutes.patch("/dados-fiscais/:id", updateDadosFiscais)

empresaRoutes.post("/testar-registro", testarRegistro)

empresaRoutes.patch("/dados-financeiros/:id", updateDadosFinanceiros)

empresaRoutes.delete("/:id", deleteEmpresa)

export { empresaRoutes }