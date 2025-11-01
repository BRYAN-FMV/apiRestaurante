import ventaEnc from "../schemas/ventaEnc.js";

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
        return await ventaEnc.findByIdAndDelete(id);
    }
}

export default new VentaEncModel();
