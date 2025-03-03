'use strict'

import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import userRoutes from '../src/user/user.routes.js'
import productRoutes from '../src/product/product.routes.js'
import categoryRoutes from "../src/category/category.routes.js"
import authRoutes from '../src/auth/auth.routes.js'
import { createDefaultAdmin } from '../src/user/user.controller.js'
import { limiter } from '../middlewares/rate.limit.js'


const configs = (app)=>{
    app.use(express.json())
    app.use(express.urlencoded({extended: false})) 
    app.use(cors())
    app.use(helmet())
    app.use(limiter)
    app.use(morgan('dev'))
}

const routes = (app)=>{
    app.use('/v1/user', userRoutes)
    app.use('/v1/product',productRoutes)
    app.use('/v1/category', categoryRoutes)
    app.use('/v1/auth', authRoutes)
}

export const initServer = async()=>{
    const app = express()
    try{
        await createDefaultAdmin()
        configs(app)
        routes(app)
        app.listen(process.env.PORT)
        console.log(`Server running in port ${process.env.PORT}`)
    }catch(err){
        console.error('Server init failed', err)
    }
}