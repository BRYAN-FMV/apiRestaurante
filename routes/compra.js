import compraController from '../controllers/compra.js';
import express from 'express';
const router = express.Router();

// Rutas básicas CRUD
router.post('/', compraController.crearCompra);
router.get('/', compraController.obtenerCompras);
router.get('/:id', compraController.obtenerCompraPorId);
router.put('/:id', compraController.actualizarCompra);
router.delete('/:id', compraController.eliminarCompra);

export default router;