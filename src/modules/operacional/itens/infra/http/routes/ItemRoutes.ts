import { authMiddleware } from "../../../../../user-management/middlewares/authMiddleware/authMiddleware";
import { permissionMiddleware } from "../../../../../user-management/middlewares/permissionMiddleware/permissionMiddleware";
import { create } from "../../../interfaces/controllers/create";
import { deleteItem } from "../../../interfaces/controllers/deleteItem";
import { getItem } from "../../../interfaces/controllers/getItem";
import { list } from "../../../interfaces/controllers/list";
import { update } from "../../../interfaces/controllers/update";

const express = require('express');

const itemRoutes = express.Router();

itemRoutes.post("/:tipo", authMiddleware, permissionMiddleware(['adicionarItens'], 'ALL'), create) 

itemRoutes.get("/:tipo", authMiddleware, permissionMiddleware(['verItens'], 'ALL'), list) 

itemRoutes.get("/:tipo/:id", authMiddleware, permissionMiddleware(['verItens'], 'ALL'), getItem)

itemRoutes.patch("/:tipo/:id", authMiddleware, permissionMiddleware(['editarItens'], 'ALL'), update)

itemRoutes.delete("/:tipo/:id", authMiddleware, permissionMiddleware(['deletarItens'], 'ALL'), deleteItem)

export { itemRoutes }