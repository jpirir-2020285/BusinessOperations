import { Router } from 'express'
import { test, register, login, update, eliminate, updateProfile } from './user.controller.js'
import { validateJwt } from '../../middlewares/validate.jwt.js'
import { validateAdmin, validateClient } from '../../helpers/validate.role.js'
import {registerValidator } from '../../helpers/validators.js'


const api = Router()

api.post(
    '/register', 
    [registerValidator],
    register
)

api.get('/test',[validateJwt], test)
export default api

api.post('/login', login)

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

