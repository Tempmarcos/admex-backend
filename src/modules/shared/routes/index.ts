import { usersRoutes } from "../../user-management/infra/http/routes/UserRoutes";

const express = require('express');

const router = express.Router();

router.use("/users", usersRoutes);



export { router };