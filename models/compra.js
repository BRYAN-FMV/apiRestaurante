import compraSchemas from "../schemas/compra.js";

class CompraModel {
  constructor() {
    this.compra = compraSchemas;
  }

  async crearCompra(data) {
    const nuevaCompra = new this.compra(data);
    return await nuevaCompra.save();
  }

  async obtenerCompras() {
    return await this.compra.find();
  }

  async obtenerCompraPorId(id) {
    return await this.compra.findById(id);
  }

  async actualizarCompra(id, data) {
    return await this.compra.findByIdAndUpdate(id, data, { new: true });
  }

  async eliminarCompra(id) {
    return await this.compra.findByIdAndDelete(id);
  }
}

export default new CompraModel();

