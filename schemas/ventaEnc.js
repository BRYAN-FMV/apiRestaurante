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

// Middleware de respaldo para eliminación en cascada
// (La eliminación principal se hace en el modelo)
ventaEncSchema.pre('deleteOne', { document: true, query: false }, async function() {
    try {
        console.log(`🔄 Middleware de respaldo ejecutándose para ventaEnc ${this._id}`);
    } catch (error) {
        console.error('❌ Error en middleware de respaldo:', error);
    }
});

export default mongoose.model("VentaEnc", ventaEncSchema);
