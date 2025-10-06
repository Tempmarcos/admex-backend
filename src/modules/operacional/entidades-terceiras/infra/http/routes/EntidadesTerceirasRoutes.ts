import { authMiddleware } from "../../../../../user-management/middlewares/authMiddleware/authMiddleware";
import { permissionMiddleware } from "../../../../../user-management/middlewares/permissionMiddleware/permissionMiddleware";
import { create } from "../../../interfaces/controllers/create";
import { deleteEntity } from "../../../interfaces/controllers/deleteEntity";
import { getEntity } from "../../../interfaces/controllers/getEntity";
import { list } from "../../../interfaces/controllers/list";
import { update } from "../../../interfaces/controllers/update";


const express = require('express');

const entidadesTerceirasRoutes = express.Router();

entidadesTerceirasRoutes.post("/:tipo", authMiddleware, permissionMiddleware(['adicionarEntidades'], 'ALL'), create) 

entidadesTerceirasRoutes.get("/:tipo", authMiddleware, permissionMiddleware(['verEntidades'], 'ALL'), list) 

entidadesTerceirasRoutes.get("/:tipo/:id", authMiddleware, permissionMiddleware(['verEntidades'], 'ALL'), getEntity)

entidadesTerceirasRoutes.patch("/:tipo/:id", authMiddleware, permissionMiddleware(['editarEntidades'], 'ALL'), update)

entidadesTerceirasRoutes.delete("/:tipo/:id", authMiddleware, permissionMiddleware(['deletarEntidades'], 'ALL'), deleteEntity)

export { entidadesTerceirasRoutes }