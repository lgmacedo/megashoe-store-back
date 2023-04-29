import { Router } from "express";
import produtoRoutes from "./produto.routes.js";
import pedidoRoutes from "./pedido.routes.js";
import userRouter from "./user.routes.js";

const router = Router();
router.use(produtoRoutes);
router.use(userRouter);
router.use(pedidoRoutes);

export default router;
