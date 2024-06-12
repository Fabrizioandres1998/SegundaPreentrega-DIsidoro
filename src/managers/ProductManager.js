import fs from "fs";
import __dirname from "../dirname.js";

class ProductManager {
    constructor(path) {
        this.path = path;
    }
    async getProducts() {
        try {
            const data = this.products = await fs.promises.readFile(this.path, 'utf-8');
            return JSON.parse(data)
        } catch (error) {
            this.products = [];
        }
    }

    async getProductsById(productId) {
        try {
            const data = await this.getProducts();
            const products = JSON.parse(data);
            const product = products.find(product => product.id === productId)
            return product;
        } catch (error) {
            console.error("Error al obtener el producto:", error);
            throw new Error("No se pudo obtener el producto");
        }
    }

    async addProduct(product) {
        try {
            const products = await this.getProducts();
            const newId = products.length > 0 ? products[products.length - 1].id + 1 : 1;
            const newProduct = { ...product, id: newId };
            products.push(newProduct);
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
            return newProduct;
        } catch (error) {
            console.error("Error al añadir el producto:", error);
            throw new Error(`Error al añadir el producto: ${error.message}`);
        }
    }

    async updateProduct(productId, updatedProduct) {
        try {
            const data = await this.getProducts();
            const products = JSON.parse(data);
            const index = products.findIndex(producto => producto.id === productId);
            if (index !== -1) {
                products[index] = { ...products[index], ...updatedProduct, id: productId };
                await fs.writeFile(this.path, JSON.stringify(products, null, 2));
                return products[index];
            } else {
                throw new Error(`Producto con ID ${productId} no encontrado`);
            }
        } catch (error) {
            console.error("Error al actualizar el producto:", error);
            throw new Error(`Error al actualizar el producto: ${error.message}`);
        }
    }

    async deleteProduct(productId) {
        try {
            const data = await this.getProducts();
            const products = JSON.parse(data);
            const index = products.findIndex(producto => producto.id === productId);
            if (index !== -1) {
                products.splice(index, 1);
                await fs.writeFile(this.path, JSON.stringify(products, null, 2));
                return { message: 'Producto eliminado correctamente' };
            } else {
                throw new Error(`Producto con ID ${productId} no encontrado`);
            }
        } catch (error) {
            console.error("Error al eliminar el producto:", error);
            throw new Error(`Error al eliminar el producto: ${error.message}`);
        }
    }

}

export const productManager = new ProductManager(
    path.resolve(__dirname, "./data/products.json")
);