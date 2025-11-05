import CompraModel from "../models/compra.js";

class CompraController {
    async crearCompra(req, res) {
        try {
            const nuevaCompra = await CompraModel.crearCompra(req.body);
            res.status(201).json(nuevaCompra);
        } catch (error) {
            console.error('Error al crear compra:', error);
            res.status(500).json({ error: "Error al crear la compra" });
        }
    }
    
    async obtenerCompras(req, res) {
        try {
            const compras = await CompraModel.obtenerCompras();
            res.status(200).json(compras);
        } catch (error) {
            console.error('Error al obtener compras:', error);
            res.status(500).json({ error: "Error al obtener las compras" });
        }
    }
    
    async obtenerCompraPorId(req, res) {
        try {
            const compra = await CompraModel.obtenerCompraPorId(req.params.id);
            if (!compra) {
                return res.status(404).json({ error: "Compra no encontrada" });
            }
            res.status(200).json(compra);
        } catch (error) {
            console.error('Error al obtener compra por ID:', error);
            res.status(500).json({ error: "Error al obtener la compra" });
        }
    }
    
    async actualizarCompra(req, res) {
        try {
            const compraActualizada = await CompraModel.actualizarCompra(req.params.id, req.body);
            if (!compraActualizada) {
                return res.status(404).json({ error: "Compra no encontrada" });
            }
            res.status(200).json(compraActualizada);
        } catch (error) {
            console.error('Error al actualizar compra:', error);
            res.status(500).json({ error: "Error al actualizar la compra" });
        }
    }
    
    async eliminarCompra(req, res) {
        try {
            const compraEliminada = await CompraModel.eliminarCompra(req.params.id);
            if (!compraEliminada) {
                return res.status(404).json({ error: "Compra no encontrada" });
            }
            res.status(204).send();
        } catch (error) {
            console.error('Error al eliminar compra:', error);
            res.status(500).json({ error: "Error al eliminar la compra" });
        }
    }
}

export default new CompraController();