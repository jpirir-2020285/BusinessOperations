import { Router } from 'express'
import { save, getAll, getById, update, eliminate, searchByName, getOutOfStock, getByCategory, getTopSellingProducts } from './product.controller.js'
import { validateJwt } from '../../middlewares/validate.jwt.js'
import { validateAdmin, validateClient } from '../../helpers/validate.role.js'
import { addProduct, deleteProduct, updateProduct } from '../../helpers/validators.js'

const router = Router()

router.post(
    '/',
    [validateJwt,validateAdmin, addProduct],
    save
)

router.get(
    '/', 
    [validateJwt,validateAdmin],
    getAll
)

router.get(
    '/name/', 
    [validateJwt,validateClient],
    searchByName
)

router.get(
    '/ofstock', 
    [validateJwt,validateAdmin],
    getOutOfStock
)

router.get(
    '/:id', 
    [validateJwt,validateAdmin],
    getById
)

router.put(
    '/:id',
    [validateJwt,validateAdmin,updateProduct],
    update
)

router.delete(
    '/:id',
    [validateJwt,validateAdmin,deleteProduct],
    eliminate
)

router.get(
    '/category',
    [validateJwt,validateClient],
    getByCategory
)

router.get(
    '/topselling', 
    [validateJwt, validateAdmin],
    getTopSellingProducts
)

export default router