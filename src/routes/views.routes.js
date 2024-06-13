import express from 'express';
import { productManager } from '../managers/ProductManager.js';

const createViewsRouter = (io) => {
    const router = express.Router();

    router.get('/', async (req, res) => {
        try {
            const products = await productManager.getProducts();
            res.render('home', { products });
        } catch (error) {
            console.error('Error cargando productos:', error);
            res.status(500).send('Error cargando productos');
        }
    });

    router.get('/realtimeproducts', async (req, res) => {
        try {
            const products = await productManager.getProducts();
            res.render('realTimeProducts', { products });
        } catch (error) {
            console.error('Error cargando productos:', error);
            res.status(500).send('Error cargando productos');
        }
    });

    return router;
};

export default createViewsRouter;
