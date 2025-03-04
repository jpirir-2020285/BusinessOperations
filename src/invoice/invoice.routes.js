import { Router } from 'express'
import { validateJwt } from '../../middlewares/validate.jwt.js'
import { createInvoice, getAllInvoices, getUserInvoices, getInvoiceById, updateInvoice, cancelInvoice } from './invoice.controller.js'
import { validateAdmin, validateClient } from '../../helpers/validate.role.js'
import { createInvoice, updateInvoice } from './invoice.controller.js'

const router = Router()

router.post('/', [validateJwt,validateClient,createInvoice], createInvoice)
router.get('/', [validateJwt,validateAdmin], getAllInvoices)
router.get('/user', [validateJwt ,validateClient], getUserInvoices)
router.get('/:id', [validateJwt,validateAdmin], getInvoiceById)
router.put('/:id', [validateJwt,validateAdmin, updateInvoice], updateInvoice)
router.delete('/:id', [validateJwt,validateAdmin], cancelInvoice)

export default router
