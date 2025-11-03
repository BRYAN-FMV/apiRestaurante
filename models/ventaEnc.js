import ventaEnc from "../schemas/ventaEnc.js";
import ventaDetSchema from "../schemas/ventaDet.js";

class VentaEncModel {
    async create(data) {
        const venta = new ventaEnc(data);
        return await venta.save();
    }

    async findAll() {
        return await ventaEnc.find();
    }

    async findById(id) {
        return await ventaEnc.findById(id);
    }

    async update(id, data) {
        return await ventaEnc.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id) {
        try {
            // Buscar el documento primero
            const documento = await ventaEnc.findById(id);
            if (!documento) {
                return null;
            }

            // ELIMINACIÓN EN CASCADA MANUAL
            // Eliminar todos los ventaDet relacionados ANTES de eliminar el ventaEnc
            const VentaDet = ventaDetSchema;
            const resultadoDetalles = await VentaDet.deleteMany({ ventaEncId: id });
            console.log(`✅ Eliminados ${resultadoDetalles.deletedCount} detalles de venta relacionados al ventaEnc ${id}`);

            // Ahora eliminar el ventaEnc
            await documento.deleteOne();
            console.log(`✅ VentaEnc ${id} eliminado correctamente`);
            
            return documento;
        } catch (error) {
            console.error('❌ Error en eliminación en cascada:', error);
            throw error;
        }
    }
}

export default new VentaEncModel();
