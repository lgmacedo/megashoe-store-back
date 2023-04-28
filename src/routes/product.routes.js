import { Router } from "express";
import {
  getProdutos,
  addToCart,
  getProduto,
  getProdutoById,
} from "../controllers/product.controller.js";

const productRoutes = Router();
productRoutes.get("/produtos", getProdutos);
productRoutes.post("/pedidos", addToCart);
productRoutes.get("/detalhes/:idProduto", getProduto);
productRoutes.get("/produto/:id", getProdutoById);

export default productRoutes;