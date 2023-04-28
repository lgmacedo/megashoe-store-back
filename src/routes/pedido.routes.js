import { Router } from "express";
import {
  criarPedido,
  listarPedidos,
} from "../controllers/pedido.controllers.js";

const pedidoRoutes = Router();

pedidoRoutes.get("/order", listarPedidos);
pedidoRoutes.post("/order", criarPedido);

export default pedidoRoutes;
