import express from 'express';
import createViewsRouter from './views.routes.js'; 
import productRouter from './product.routes.js'; 
import cartRouter from './cart.routes.js'; 
import { productManager } from '../managers/ProductManager.js';

const router = express.Router();

router.use('/products', productRouter);
router.use('/carts', cartRouter);

router.use('/views', createViewsRouter(productManager)); 

export default router;
