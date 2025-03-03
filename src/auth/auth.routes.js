import { Router } from 'express'
import { register, login } from './auth.controller.js'
import { registerValidator } from '../../helpers/validators.js'


const api = Router()

api.post(
    '/register', 
    [registerValidator],
    register
)

api.post('/login', login)

export default api