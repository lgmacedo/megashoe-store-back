import { Router } from "express";
import { getProdutos, addToCart, getProduto } from "../controllers/product.controller.js";

const productRoutes = Router();
productRoutes.get("/produtos", getProdutos);
productRoutes.post("/pedidos", addToCart);
productRoutes.get("/detalhes/:idProduto", getProduto);

export default productRoutes;