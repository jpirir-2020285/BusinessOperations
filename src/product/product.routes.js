import { Router } from 'express';
import { save, getAll, getById, update, eliminate, searchByName } from './product.controller.js';
import { validateJwt } from '../../middlewares/validate.jwt.js';
import { validateAdmin } from '../../helpers/validate.role.js';
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
    [validateJwt,validateAdmin],
    searchByName
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

export default router