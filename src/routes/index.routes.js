import {Router} from 'express';
import authRoutes from './auth.routes.js';
import productRoutes from './product.routes.js';
import userRouter from './user.routes.js';

const router = Router();
router.use(authRoutes);
router.use(productRoutes);
router.use(userRouter);

export default router;