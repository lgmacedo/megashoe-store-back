import {Router} from 'express';
import authRoutes from './auth.routes.js';
import productRoutes from './product.routes.js';

const router = Router();
router.use(authRoutes);
router.use(productRoutes);

export default router;