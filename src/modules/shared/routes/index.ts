import { loginRoutes } from "../../user-management/infra/http/routes/loginRoutes";
import { usersRoutes } from "../../user-management/infra/http/routes/UserRoutes";

const express = require('express');

const router = express.Router();

router.use("/users", usersRoutes);

router.use("/login", loginRoutes)

export { router };