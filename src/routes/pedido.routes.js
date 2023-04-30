import { Router } from "express";
import {
  criarPedido,
  listarPedidos,
} from "../controllers/pedido.controllers.js";
import pedidoSchema from "../schemas/pedido.schema.js";
import { autentica } from "../middlewares/auth.middlewares.js";
import { validate } from "../middlewares/validate.middlewares.js";

const pedidoRoutes = Router();

pedidoRoutes.get("/pedidos", autentica, listarPedidos);
pedidoRoutes.post("/pedidos", autentica, validate(pedidoSchema), criarPedido);

export default pedidoRoutes;
