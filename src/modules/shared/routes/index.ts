import { empresaRoutes } from "../../operacional/empresa/infra/http/routes/EmpresaRoutes";
import { entidadesTerceirasRoutes } from "../../operacional/entidades-terceiras/infra/http/routes/EntidadesTerceirasRoutes";
import { itemRoutes } from "../../operacional/itens/infra/http/routes/ItemRoutes";
import { tarefaRoutes } from "../../operacional/tarefas/infra/http/routes/TarefaRoutes";
import { loginRoutes } from "../../user-management/infra/http/routes/loginRoutes";
import { usersRoutes } from "../../user-management/infra/http/routes/UserRoutes";

const express = require('express');

const router = express.Router();

router.use("/users", usersRoutes);

router.use("/login", loginRoutes)

router.use("/empresa", empresaRoutes)

router.use("/entidade", entidadesTerceirasRoutes)

router.use("/item", itemRoutes)

router.use("/tarefa", tarefaRoutes)

export { router };