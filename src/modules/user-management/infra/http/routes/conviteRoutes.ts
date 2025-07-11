import { cancelarConvite } from "../../../interfaces/controllers/convite/cancelarConvite";
import { gerarConvite } from "../../../interfaces/controllers/convite/gerarConvite";
import { list } from "../../../interfaces/controllers/convite/list";
import { verificarConvite } from "../../../interfaces/controllers/convite/verificarConvite";

import { authMiddleware } from "../../../middlewares/authMiddleware/authMiddleware";
import { permissionMiddleware } from "../../../middlewares/permissionMiddleware/permissionMiddleware";

const express = require('express');

const conviteRoutes = express.Router();

conviteRoutes.get("/gerar-convite", authMiddleware, permissionMiddleware(['criarUsuarios']), gerarConvite)

conviteRoutes.get("/verificar-convite", verificarConvite)

conviteRoutes.get("/", authMiddleware, permissionMiddleware(['criarUsuarios']), list)

conviteRoutes.patch("/", authMiddleware, permissionMiddleware(['criarUsuarios']), cancelarConvite)

export { conviteRoutes }

