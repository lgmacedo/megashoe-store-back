import { Router } from "express";
import { createOrder, listOrders } from "../controllers/order.controllers.js";

const orderRoutes = Router();

orderRoutes.get("/order", listOrders);
orderRoutes.post("/order", createOrder);

export default orderRoutes;
