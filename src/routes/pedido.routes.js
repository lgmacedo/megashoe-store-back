import { Router } from "express";
import {
  criarPedido,
  getPedido,
  listarPedidos,
} from "../controllers/pedido.controllers.js";
import pedidoSchema from "../schemas/pedido.schema.js";
import { autentica } from "../middlewares/auth.middlewares.js";
import { validate } from "../middlewares/validate.middlewares.js";

const pedidoRoutes = Router();

pedidoRoutes.get("/pedidos", autentica, listarPedidos);
pedidoRoutes.get("/pedidos/:idPedido", autentica, getPedido);
pedidoRoutes.post("/pedidos", autentica, validate(pedidoSchema), criarPedido);

export default pedidoRoutes;
