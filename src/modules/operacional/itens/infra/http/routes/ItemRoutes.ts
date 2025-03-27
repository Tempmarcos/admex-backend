import { create } from "../../../interfaces/controllers/create";
import { deleteItem } from "../../../interfaces/controllers/deleteItem";
import { getItem } from "../../../interfaces/controllers/getItem";
import { list } from "../../../interfaces/controllers/list";
import { update } from "../../../interfaces/controllers/update";

const express = require('express');

const entidadesTerceirasRoutes = express.Router();

entidadesTerceirasRoutes.post("/", create) 

entidadesTerceirasRoutes.get("/", list) 

entidadesTerceirasRoutes.get("/:id", getItem)

entidadesTerceirasRoutes.patch("/:id", update)

entidadesTerceirasRoutes.delete("/:id", deleteItem)

export { entidadesTerceirasRoutes }