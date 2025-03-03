import { Router } from 'express'
import { test, update, eliminate, updateProfile } from './user.controller.js'
import { validateJwt } from '../../middlewares/validate.jwt.js'
import { validateAdmin, validateClient } from '../../helpers/validate.role.js'

const api = Router()

api.get('/test',[validateJwt], test)
export default api

api.put(
    '/admin/update/:id',
    [validateJwt,validateAdmin],
    update
)

api.put(
    '/client/update/:id',
    [validateJwt,validateClient],
    updateProfile
)


api.delete(
    '/admin/delete/:id',
    [validateJwt,validateAdmin],
    eliminate
)

api.put(
    '/client/update/:id',
    [validateClient,validateJwt],
    updateProfile
)

