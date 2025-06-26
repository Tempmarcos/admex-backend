import { authMiddleware } from "../../../../../user-management/middlewares/authMiddleware/authMiddleware";
import { create } from "../../../interfaces/controllers/create";
import { deleteItem } from "../../../interfaces/controllers/deleteItem";
import { getItem } from "../../../interfaces/controllers/getItem";
import { list } from "../../../interfaces/controllers/list";
import { update } from "../../../interfaces/controllers/update";

const express = require('express');

const itemRoutes = express.Router();

itemRoutes.post("/", authMiddleware, create) 

itemRoutes.get("/", list) 

itemRoutes.get("/:id", getItem)

itemRoutes.patch("/:id", update)

itemRoutes.delete("/:id", deleteItem)

export { itemRoutes }