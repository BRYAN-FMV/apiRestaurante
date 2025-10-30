import express from 'express';
const router = express.Router();
import VentaEncController from '../controllers/ventaEnc.js';

router.post('/', VentaEncController.createVentaEnc);
router.get('/', VentaEncController.getVentaEncs);
router.get('/:id', VentaEncController.getVentaEncById);
router.put('/:id', VentaEncController.updateVentaEnc);
router.delete('/:id', VentaEncController.deleteVentaEnc);

export default router;