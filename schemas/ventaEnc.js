import mongoose from 'mongoose';

const ventaEncSchema = new mongoose.Schema({
    cliente: {
        type: String,
        required: true,
    },
    fecha: {
        type: Date,
        default: Date.now,
    },
    total: {
        type: Number,
        required: true,
    },
    entrega: {
        type: String,
        required: true,
        enum: ['domicilio 1', 'domicilio 2', 'recoger en comedor', 'comer en el lugar']
    }
});

export default mongoose.model("VentaEnc", ventaEncSchema);
