import { authMiddleware } from "../../../../../user-management/middlewares/authMiddleware/authMiddleware";
import { permissionMiddleware } from "../../../../../user-management/middlewares/permissionMiddleware/permissionMiddleware";
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

// empresaRoutes.get("/", list) //Desativar em produção

empresaRoutes.get("/:id", authMiddleware, permissionMiddleware(['verDados'], 'ALL'), getEmpresa)

empresaRoutes.patch("/dados-gerais/:id", authMiddleware, permissionMiddleware(['editarDados']), updateDadosGerais)

empresaRoutes.patch("/dados-fiscais/:id", authMiddleware, permissionMiddleware(['editarDados']), updateDadosFiscais)

empresaRoutes.patch("/dados-financeiros/:id", authMiddleware, permissionMiddleware(['editarDados']), updateDadosFinanceiros)

empresaRoutes.post("/testar-registro", testarRegistro)

// empresaRoutes.delete("/:id", deleteEmpresa)

export { empresaRoutes }