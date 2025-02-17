import { Router } from 'express'
import {eliminate, getAll, save, update}from './category.controller.js'
import { validateJwt } from '../../middlewares/validate.jwt.js'
import { validateAdmin, validateClient } from '../../helpers/validate.role.js'
import { addCategory } from '../../helpers/validators.js'

const api = Router()

api.post(
    '/',
    [validateJwt,validateAdmin],
    save
)

api.get(
    '/',
    [validateJwt,validateAdmin,addCategory],
    getAll
)

api.put(
    '/update/:id',
    [validateJwt,validateAdmin, addCategory],
    update
)

api.delete(
    '/delete/:id',
    [validateJwt,validateAdmin],
    eliminate
)
export default api