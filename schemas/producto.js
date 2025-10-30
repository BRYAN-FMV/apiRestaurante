import mongoose from "mongoose";

const productoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    precio: {
        type: Number,
        required: true,
    },
    categoria: {
        type: String,
        required: true,
    },
    disponibilidad: {
        type: Boolean,
        default: true,
    },
});

const Producto = mongoose.model("Producto", productoSchema);

export default Producto;
