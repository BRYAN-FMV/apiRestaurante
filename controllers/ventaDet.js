import ventaDet from "../models/ventaDet.js";
import ventaDetSchema from "../schemas/ventaDet.js";

class VentaDetController {
    // Crear un nuevo detalle de venta
    async createVentaDet(req, res) {
        try {
            const nuevaVentaDet = await ventaDet.create(req.body);
            res.status(201).json(nuevaVentaDet);
        } catch (error) {
            console.error("Error al crear ventaDet:", error);
            res.status(500).json({ error: "Error al crear la ventaDet" });
        }
    }

    // Obtener todos los detalles de venta
    async getVentaDets(req, res) {
        try {
            const ventaDets = await ventaDet.findAll();
            res.status(200).json(ventaDets);
        } catch (error) {
            console.error("Error al obtener ventaDets:", error);
            res.status(500).json({ error: "Error al obtener los detalles de venta" });
        }
    }

    // Obtener todos los detalles con información relacionada (populate)
    async getVentaDetsWithDetails(req, res) {
        try {
            const ventaDets = await ventaDetSchema
                .find()
                .populate('ventaEncId', 'cliente fecha total entrega')
                .populate('productoId', 'nombre precio categoria disponibilidad')
                .sort({ _id: -1 }); // Ordenar por más recientes
            res.status(200).json(ventaDets);
        } catch (error) {
            console.error("Error al obtener ventaDets con detalles:", error);
            res.status(500).json({ error: "Error al obtener los detalles de venta con información relacionada" });
        }
    }

    // Obtener un detalle de venta por ID
    async getVentaDetById(req, res) {
        try {
            const ventaDetItem = await ventaDet.findById(req.params.id);
            if (!ventaDetItem) {
                return res.status(404).json({ error: "Detalle de venta no encontrado" });
            }
            res.status(200).json(ventaDetItem);
        } catch (error) {
            console.error("Error al obtener ventaDet por ID:", error);
            res.status(500).json({ error: "Error al obtener el detalle de venta" });
        }
    }

    // Obtener un detalle de venta por ID con información relacionada
    async getVentaDetByIdWithDetails(req, res) {
        try {
            const ventaDetItem = await ventaDetSchema
                .findById(req.params.id)
                .populate('ventaEncId', 'cliente fecha total entrega')
                .populate('productoId', 'nombre precio categoria disponibilidad');
            
            if (!ventaDetItem) {
                return res.status(404).json({ error: "Detalle de venta no encontrado" });
            }
            res.status(200).json(ventaDetItem);
        } catch (error) {
            console.error("Error al obtener ventaDet por ID con detalles:", error);
            res.status(500).json({ error: "Error al obtener el detalle de venta con información relacionada" });
        }
    }

    // Obtener todos los detalles de una venta específica
    async getVentaDetsByVentaEnc(req, res) {
        try {
            const { ventaEncId } = req.params;
            const ventaDets = await ventaDetSchema
                .find({ ventaEncId })
                .populate('productoId', 'nombre precio categoria disponibilidad')
                .sort({ _id: 1 }); // Ordenar por orden de creación
            
            res.status(200).json(ventaDets);
        } catch (error) {
            console.error("Error al obtener ventaDets por ventaEnc:", error);
            res.status(500).json({ error: "Error al obtener los detalles de la venta" });
        }
    }

    // Obtener todos los detalles de un producto específico
    async getVentaDetsByProducto(req, res) {
        try {
            const { productoId } = req.params;
            const ventaDets = await ventaDetSchema
                .find({ productoId })
                .populate('ventaEncId', 'cliente fecha total entrega')
                .sort({ _id: -1 }); // Ordenar por más recientes
            
            res.status(200).json(ventaDets);
        } catch (error) {
            console.error("Error al obtener ventaDets por producto:", error);
            res.status(500).json({ error: "Error al obtener los detalles del producto" });
        }
    }

    // Actualizar un detalle de venta
    async updateVentaDet(req, res) {
        try {
            const ventaDetActualizada = await ventaDet.update(req.params.id, req.body);
            if (!ventaDetActualizada) {
                return res.status(404).json({ error: "Detalle de venta no encontrado" });
            }
            res.status(200).json(ventaDetActualizada);
        } catch (error) {
            console.error("Error al actualizar ventaDet:", error);
            res.status(500).json({ error: "Error al actualizar el detalle de venta" });
        }
    }

    // Eliminar un detalle de venta
    async deleteVentaDet(req, res) {
        try {
            const ventaDetEliminada = await ventaDet.delete(req.params.id);
            if (!ventaDetEliminada) {
                return res.status(404).json({ error: "Detalle de venta no encontrado" });
            }
            res.status(200).json({ message: "Detalle de venta eliminado exitosamente" });
        } catch (error) {
            console.error("Error al eliminar ventaDet:", error);
            res.status(500).json({ error: "Error al eliminar el detalle de venta" });
        }
    }

    // Obtener estadísticas de ventas por producto
    async getProductSalesStats(req, res) {
        try {
            const stats = await ventaDetSchema.aggregate([
                {
                    $group: {
                        _id: "$productoId",
                        totalVendido: { $sum: "$cantidad" },
                        ingresoTotal: { $sum: { $multiply: ["$cantidad", "$precio"] } },
                        numeroVentas: { $sum: 1 },
                        precioPromedio: { $avg: "$precio" }
                    }
                },
                {
                    $lookup: {
                        from: "productos",
                        localField: "_id",
                        foreignField: "_id",
                        as: "producto"
                    }
                },
                {
                    $unwind: "$producto"
                },
                {
                    $project: {
                        _id: 1,
                        nombreProducto: "$producto.nombre",
                        categoria: "$producto.categoria",
                        totalVendido: 1,
                        ingresoTotal: 1,
                        numeroVentas: 1,
                        precioPromedio: { $round: ["$precioPromedio", 2] }
                    }
                },
                {
                    $sort: { totalVendido: -1 }
                }
            ]);
            
            res.status(200).json(stats);
        } catch (error) {
            console.error("Error al obtener estadísticas:", error);
            res.status(500).json({ error: "Error al obtener las estadísticas de ventas" });
        }
    }
}

export default new VentaDetController();
