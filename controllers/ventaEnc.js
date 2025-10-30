import VentaEncModel from "../models/ventaEnc.js";

class VentaEncController {
    async createVentaEnc(req, res) {
        try {
            const nuevaVentaEnc = await VentaEncModel.create(req.body);
            res.status(201).json(nuevaVentaEnc);
        } catch (error) {
            res.status(500).json({ error: "Error al crear la ventaEnc" });
        }
    }

    async getVentaEncs(req, res) {
        try {
            const ventaEncs = await VentaEncModel.findAll();
            res.status(200).json(ventaEncs);
        } catch (error) {
            res.status(500).json({ error: "Error al obtener las ventas" });
        }
    }

    async getVentaEncById(req, res) {
        try {
            const ventaEnc = await VentaEncModel.findById(req.params.id);
            if (!ventaEnc) {
                return res.status(404).json({ error: "VentaEnc no encontrada" });
            }
            res.status(200).json(ventaEnc);
        } catch (error) {
            res.status(500).json({ error: "Error al obtener la ventaEnc" });
        }
    }

    async updateVentaEnc(req, res) {    
        try {
            const ventaEncActualizada = await VentaEncModel.update(req.params.id, req.body);
            if (!ventaEncActualizada) {
                return res.status(404).json({ error: "VentaEnc no encontrada" });
            }
            res.status(200).json(ventaEncActualizada);
        } catch (error) {
            res.status(500).json({ error: "Error al actualizar la ventaEnc" });
        }
    }
    async deleteVentaEnc(req, res) {
        try {
            const ventaEncEliminada = await VentaEncModel.delete(req.params.id);
            if (!ventaEncEliminada) {
                return res.status(404).json({ error: "VentaEnc no encontrada" });
            }
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: "Error al eliminar la ventaEnc" });
        }
    }
}

export default new VentaEncController();
