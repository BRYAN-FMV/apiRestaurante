import express from 'express';
const router = express.Router();
import ProductoController  from '../controllers/producto.js';

router.post('/', ProductoController.createProducto);
router.get('/', ProductoController.getProductos);
router.get('/:id', ProductoController.getProductoById);
router.put('/:id', ProductoController.updateProducto);
router.delete('/:id', ProductoController.deleteProducto);

export default router;