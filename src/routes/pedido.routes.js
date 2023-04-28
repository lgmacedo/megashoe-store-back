import { Router } from "express";
import {
  criarPedido,
  listarPedidos,
} from "../controllers/pedido.controllers.js";
import validateSchema from "../middlewares/schema.middleware.js";
import pedidoSchema from "../schemas/pedido.schema.js";

const pedidoRoutes = Router();

pedidoRoutes.get("/order", listarPedidos);
pedidoRoutes.post("/order", validateSchema(pedidoSchema), criarPedido);

export default pedidoRoutes;
