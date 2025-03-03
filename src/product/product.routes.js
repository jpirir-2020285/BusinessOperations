import { Router } from 'express';
import { save, getAll, getById, update, eliminate, searchByName, getOutOfStock, getByCategory } from './product.controller.js';
import { validateJwt } from '../../middlewares/validate.jwt.js';
import { validateAdmin, validateClient } from '../../helpers/validate.role.js';
import { addProduct } from '../../helpers/validators.js';

const router = Router();

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
    [validateJwt,validateAdmin],
    update
)

router.delete(
    '/:id',
    [validateJwt,validateAdmin],
    eliminate
)

router.get(
    '/category',
    [validateJwt,validateClient],
    getByCategory
)

export default router