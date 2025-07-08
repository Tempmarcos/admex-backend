import { gerarConvite } from "../../../interfaces/controllers/gerarConvite";
import { authMiddleware } from "../../../middlewares/authMiddleware/authMiddleware";
import { permissionMiddleware } from "../../../middlewares/permissionMiddleware/permissionMiddleware";

const express = require('express');

const conviteRoutes = express.Router();

conviteRoutes.get("/gerar-convite", authMiddleware, permissionMiddleware(['criarUsuarios']), gerarConvite)

conviteRoutes.get("/verificar-convite",)


export { conviteRoutes }

