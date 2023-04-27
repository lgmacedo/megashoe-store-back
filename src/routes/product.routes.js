import { Router } from "express";
import { getProdutos, addToCart } from "../controllers/product.controller.js";

const productRoutes = Router();
productRoutes.get("/produtos", getProdutos);
productRoutes.post("/pedidos", addToCart);

export default productRoutes;