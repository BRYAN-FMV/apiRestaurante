import mongoose from "mongoose";

const compraSchema = new mongoose.Schema({
  producto: { type: String, required: true },
  cantidad: { type: Number, required: true },
  precio: { type: Number, required: true },
  fecha: { type: Date, default: Date.now }
});

const Compra = mongoose.model("Compra", compraSchema);

export default Compra;
