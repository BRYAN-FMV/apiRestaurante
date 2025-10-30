import ventaDetSchema from "../schemas/ventaDet.js";

class VentaDetModel {
    async create(data) {
        const ventaDet = new ventaDetSchema(data);
        return await ventaDet.save();
    }
    async findAll() {
        return await ventaDetSchema.find();
    }
    async findById(id) {
        return await ventaDetSchema.findById(id);
    }
    async update(id, data) {
        return await ventaDetSchema.findByIdAndUpdate(id, data, { new: true });
    }
    async delete(id) {
        return await ventaDetSchema.findByIdAndDelete(id);
    }
}

export default new VentaDetModel();
