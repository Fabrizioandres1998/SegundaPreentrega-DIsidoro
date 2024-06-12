import { Router } from "express";
import { productManager } from "../managers/ProductManager.js";
import Product from "../classes/Product.js";

const router = Router();

router.get("/", (req, res) => {
    res.json(productManager.getProducts());
});

router.get("/:pid", (req, res) => {
    const { pid } = req.params;
    try {
        const product = productManager.getProductsById(pid);
    } catch (error) {
        return res.status(404).json({
            error: "No se encontro el producto",
        });
    }
}
)

router.post("/", async (req, res) => {
    const { title, description, price, thumbnail, code, stock } = req.body;
    try {
        const product = new Product(title, description, price, thumbnail, code, stock);
        await productManager.addProduct(product);
        res.status(201).json(product);
    } catch (error) {
        return res.status(400).json({
            error: `No se pudo agregar el producto: ${error.message}`,
        });
    }
});


router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { title, description, price, thumbnail, code, stock, status } =
        req.body;

    try {
        const product = productManager.getProductsById(Number(id));

        if (!product) {
            return res.status(404).json({
                error: "No se encontro el producto",
            });
        }

        await productManager.updateProduct(id, {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            status,
        });

        const newProduct = productManager.getProductsById(Number(id));

        res.json(newProduct);
    } catch (error) {
        return res.status(400).json({
            error: `No se pudo actualizar el producto: ${error.message}`,
        });
    }
});

router.delete("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const product = productManager.getProductsById(Number(id));

        if (!product) {
            return res.status(404).json({
                error: "No se encontro el producto",
            });
        }

        await productManager.deleteProduct(Number(id));

        res.json(product);
    } catch (error) {
        return res.status(400).json({
            error: `No se pudo eliminar el producto: ${error.message}`,
        });
    }
});

export default router;