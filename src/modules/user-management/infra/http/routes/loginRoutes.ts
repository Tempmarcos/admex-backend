import { login } from "../../../interfaces/controllers/login";


const express = require('express');

const loginRoutes = express.Router();


loginRoutes.post("/", login)

export { loginRoutes }
