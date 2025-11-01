import CompraModel from "../models/compra.js";

class CompraController {
    constructor() {
        this.compraModel = new CompraModel();
    }
    async crearCompra(req, res) {
        try {
            const nuevaCompra = await this.compraModel.crearCompra(req.body);
            res.status(201).json(nuevaCompra);
        } catch (error) {
            res.status(500).json({ error: "Error al crear la compra" });
        }
    }
    async obtenerCompras(req, res) {
        try {
            const compras = await this.compraModel.obtenerCompras();
            res.status(200).json(compras);
        } catch (error) {
            res.status(500).json({ error: "Error al obtener las compras" });
        }
    }
    async obtenerCompraPorId(req, res) {
        try {
            const compra = await this.compraModel.obtenerCompraPorId(req.params.id);
            if (!compra) {
                return res.status(404).json({ error: "Compra no encontrada" });
            }
            res.status(200).json(compra);
        } catch (error) {
            res.status(500).json({ error: "Error al obtener la compra" });
        }
    }
    async actualizarCompra(req, res) {
        try {
            const compraActualizada = await this.compraModel.actualizarCompra(req.params.id, req.body);
            if (!compraActualizada) {
                return res.status(404).json({ error: "Compra no encontrada" });
            }
            res.status(200).json(compraActualizada);
        } catch (error) {
            res.status(500).json({ error: "Error al actualizar la compra" });
        }
    }
    async eliminarCompra(req, res) {
        try {
            const compraEliminada = await this.compraModel.eliminarCompra(req.params.id);
            if (!compraEliminada) {
                return res.status(404).json({ error: "Compra no encontrada" });
            }
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: "Error al eliminar la compra" });
        }
    }
}

export default new CompraController();