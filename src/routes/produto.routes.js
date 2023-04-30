import { Router } from "express";
import {
  getTodosProdutos,
  checarDisponibilidadeProduto,
  getProduto,
  getProdutosComIds,
} from "../controllers/produto.controller.js";

const produtoRoutes = Router();
produtoRoutes.get("/produtos", getTodosProdutos);
produtoRoutes.get("/produtos/muitos", getProdutosComIds);
produtoRoutes.get("/produtos/:idProduto", getProduto);
produtoRoutes.get("/produtos/checar/:idProduto", checarDisponibilidadeProduto);

export default produtoRoutes;
