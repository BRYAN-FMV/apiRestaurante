import mongoose from "mongoose";
import Producto from "../schemas/producto.js";
import productoModel from "../models/producto.js";

class ProductoController {
    async createProducto(req, res) {
        try {
            const nuevoProducto = await productoModel.create(req.body);
            res.status(201).json(nuevoProducto);
        } catch (error) {
            res.status(500).json({ error: "Error al crear el producto" });
        }
    }
    async getProductos(req, res) {
        try {
            const productos = await productoModel.findAll();
            res.status(200).json(productos);
        } catch (error) {
            res.status(500).json({ error: "Error al obtener los productos" });
        }
    }

    async getProductoById(req, res) {
        try {
            const producto = await productoModel.findById(req.params.id);
            if (!producto) {
                return res.status(404).json({ error: "Producto no encontrado" });
            }
            res.status(200).json(producto);
        } catch (error) {
            res.status(500).json({ error: "Error al obtener el producto" });
        }
    }

    async updateProducto(req, res) {
        try {
            const productoActualizado = await productoModel.update(req.params.id, req.body);
            if (!productoActualizado) {
                return res.status(404).json({ error: "Producto no encontrado" });
            }
            res.status(200).json(productoActualizado);
        } catch (error) {
            res.status(500).json({ error: "Error al actualizar el producto" });
        }
    }

    async deleteProducto(req, res) {
        try {
            const productoEliminado = await productoModel.delete(req.params.id);
            if (!productoEliminado) {
                return res.status(404).json({ error: "Producto no encontrado" });
            }
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: "Error al eliminar el producto" });
        }
    }
}

export default new ProductoController();
