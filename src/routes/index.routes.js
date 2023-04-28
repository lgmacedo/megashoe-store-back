import { Router } from "express";
import authRoutes from "./auth.routes.js";
import produtoRoutes from "./produto.routes.js";
import pedidoRoutes from "./pedido.routes.js";
import userRouter from "./user.routes.js";

const router = Router();
router.use(authRoutes);
router.use(produtoRoutes);
router.use(pedidoRoutes);
router.use(userRouter);

export default router;
