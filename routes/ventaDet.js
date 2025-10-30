import express from 'express';
const router = express.Router();
import VentaDetController from '../controllers/ventaDet.js';

// Rutas básicas CRUD
router.post('/', VentaDetController.createVentaDet);
router.get('/', VentaDetController.getVentaDets);
router.get('/with-details', VentaDetController.getVentaDetsWithDetails);
router.get('/stats', VentaDetController.getProductSalesStats);
router.get('/:id', VentaDetController.getVentaDetById);
router.get('/:id/with-details', VentaDetController.getVentaDetByIdWithDetails);
router.put('/:id', VentaDetController.updateVentaDet);
router.delete('/:id', VentaDetController.deleteVentaDet);

// Rutas específicas para relaciones
router.get('/venta/:ventaEncId', VentaDetController.getVentaDetsByVentaEnc);
router.get('/producto/:productoId', VentaDetController.getVentaDetsByProducto);

export default router;