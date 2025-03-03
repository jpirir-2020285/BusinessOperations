import { Router } from 'express';
import { validateJwt } from '../../middlewares/validate.jwt.js';
import { createInvoice, getAllInvoices, getUserInvoices, getInvoiceById, updateInvoice, cancelInvoice } from './invoice.controller.js';
import { validateAdmin, validateClient } from '../../helpers/validate.role.js';

const router = Router();

router.post('/', [validateJwt,validateClient], createInvoice);        // Crear una factura (CLIENT)
router.get('/', [validateJwt,validateAdmin], getAllInvoices);        // Obtener todas las facturas (ADMIN)
router.get('/user', [validateJwt ,validateClient], getUserInvoices);  // Obtener facturas del usuario (CLIENT)
router.get('/:id', [validateJwt,validateAdmin], getInvoiceById);    // Obtener factura específica
router.put('/:id', [validateJwt,validateAdmin], updateInvoice);     // Actualizar factura (ADMIN)
router.delete('/:id', [validateJwt,validateAdmin], cancelInvoice); // Cancelar factura (ADMIN)

export default router;
