import Producto from "../schemas/producto.js";

class ProductoModel {
    async create(data) {
        const producto = new Producto(data);
        return await producto.save();
    }

    async findAll() {
        return await Producto.find();
    }

    async findById(id) {
        return await Producto.findById(id);
    }

    async update(id, data) {
        return await Producto.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id) {
        return await Producto.findByIdAndDelete(id);
    }
}

export default new ProductoModel();
