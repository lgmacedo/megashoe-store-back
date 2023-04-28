import { Router } from "express";
import {
  getTodosProdutos,
  checarDisponibilidadeProduto,
  getProduto,
  getProdutosComIds,
} from "../controllers/product.controller.js";

const productRoutes = Router();
productRoutes.get("/produtos", getTodosProdutos);
productRoutes.get("/produtos/muitos", getProdutosComIds);
productRoutes.get("/produtos/:idProduto", getProduto);
productRoutes.get("/produtos/checar/:idProduto", checarDisponibilidadeProduto);

export default productRoutes;
