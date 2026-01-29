import { authMiddleware } from "../../../../../user-management/middlewares/authMiddleware/authMiddleware";
import { permissionMiddleware } from "../../../../../user-management/middlewares/permissionMiddleware/permissionMiddleware";
import { create } from "../../../interfaces/controllers/create";
import { deleteProposta } from "../../../interfaces/controllers/deleteProposta";
import { getProposta } from "../../../interfaces/controllers/getProposta";
import { list } from "../../../interfaces/controllers/list";
import { update } from "../../../interfaces/controllers/update";
import { createRevisao } from "../../../interfaces/controllers/revisao/createRevisao";
import { updateRevisao } from "../../../interfaces/controllers/revisao/updateRevisao";
import { createPDF } from "../../../interfaces/controllers/createPDF";

const express = require('express');

const propostaRoutes = express.Router();

propostaRoutes.post("/", authMiddleware, permissionMiddleware(['criarPropostas'], 'ALL'), create)

propostaRoutes.get("/", authMiddleware, permissionMiddleware(['verPropostas'], 'ALL'), list)

propostaRoutes.get("/:id", authMiddleware, permissionMiddleware(['verPropostas'], 'ALL'), getProposta)

propostaRoutes.patch("/:id", authMiddleware, permissionMiddleware(['criarPropostas'], 'ALL'), update)

propostaRoutes.delete("/:id", authMiddleware, permissionMiddleware(['deletarPropostas'], 'ALL'), deleteProposta)

propostaRoutes.post("/revisao/:id", authMiddleware, permissionMiddleware(['criarPropostas'], 'ALL'), createRevisao)

propostaRoutes.post("/pdf", authMiddleware, permissionMiddleware(['criarPropostas'], 'ALL'), createPDF)

//propostaRoutes.patch("/revisao/:id", authMiddleware, permissionMiddleware(['criarPropostas'], 'ALL'), updateRevisao)

// propostaRoutes.delete("/revisao/:id", deleteRevisao)


export { propostaRoutes }