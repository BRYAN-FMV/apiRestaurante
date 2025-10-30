import mongoose from "mongoose";

const ventaDetSchema = new mongoose.Schema({
    ventaEncId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "VentaEnc",
        required: true
    },
    productoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Producto",
        required: true
    },
    cantidad: {
        type: Number,
        required: true
    },
    precio: {
        type: Number,
        required: true
    }
});

const VentaDetModel = mongoose.model("VentaDet", ventaDetSchema);
export default VentaDetModel;
