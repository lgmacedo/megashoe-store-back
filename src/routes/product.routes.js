import { Router } from "express";
import {
  getProdutos,
  addToCart,
  getProdutoById,
} from "../controllers/product.controller.js";

const productRoutes = Router();
productRoutes.get("/produtos", getProdutos);
productRoutes.post("/pedidos", addToCart);
productRoutes.get("/produto/:id", getProdutoById);

export default productRoutes;
