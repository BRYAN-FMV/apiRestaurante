import mongoose from "mongoose";

const ventaDetSchema = new mongoose.Schema({
    ventaEncId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "VentaEnc",
        required: [true, 'El ID de venta encabezado es requerido']
    },
    productoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Producto",
        required: [true, 'El ID del producto es requerido']
    },
    cantidad: {
        type: Number,
        required: [true, 'La cantidad es requerida'],
        min: [1, 'La cantidad debe ser mayor a 0']
    },
    precio: {
        type: Number,
        required: [true, 'El precio es requerido'],
        min: [0, 'El precio no puede ser negativo']
    }
}, {
    timestamps: true // Agrega createdAt y updatedAt automáticamente
});

const VentaDet = mongoose.model("VentaDet", ventaDetSchema);
export default VentaDet;
