import { create } from "../../../interfaces/controllers/create";
// import { deleteEmpresa } from "../../../interfaces/controllers/deleteUser";
// import { getEmpresa } from "../../../interfaces/controllers/getEmpresa";
// import { updateDadosGerais } from "../../../interfaces/controllers/updateDadosGerais";
// import { updateDadosFinanceiros } from "../../../interfaces/controllers/updateDadosFinanceiros";
// import { updateDadosFiscais } from "../../../interfaces/controllers/updateDadosFiscais";


const express = require('express');

const empresaRoutes = express.Router();

empresaRoutes.post("/", create) 

// empresaRoutes.get("/:id", getEmpresa)

// empresaRoutes.patch("/dados-gerais/:id", updateDadosGerais)

// empresaRoutes.patch("/dados-fiscais/:id", updateDadosFiscais)

// empresaRoutes.patch("/dados-financeiros/:id", updateDadosFinanceiros)

// empresaRoutes.delete("/:id", deleteEmpresa)

export { empresaRoutes }