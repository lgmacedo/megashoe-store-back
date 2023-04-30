import { Router } from "express";
import { validate } from "../middlewares/validate.middlewares.js";
import { cadastro, login } from "../controllers/user.controllers.js";
import { cadastroSchema, loginSchema } from "../schemas/user.schema.js";

const userRouter = Router();

userRouter.post("/", validate(loginSchema), login);
userRouter.post("/cadastro", validate(cadastroSchema), cadastro);

export default userRouter;
