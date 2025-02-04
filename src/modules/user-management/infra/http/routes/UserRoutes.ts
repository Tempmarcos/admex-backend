import { create } from "../../../interfaces/controllers/create";
import { list } from "../../../interfaces/controllers/list";

const express = require('express');


// import { list } from "../controllers/user/list";
// import { getUser } from "../controllers/user/getUser";
// import { update } from "../controllers/user/update";
// import { deleteUser } from "../controllers/user/deleteUser";

const usersRoutes = express.Router();

usersRoutes.post("/", create)

usersRoutes.get("/", list)

usersRoutes.get("/:id", getUser)

usersRoutes.put("/", update)

usersRoutes.delete("/:id", deleteUser)

export { usersRoutes }