//Validaciones en relación a la BD

import User from '../src/user/user.model.js'
import Product from '../src/product/product.model.js'
import { isValidObjectId } from 'mongoose'

export const existUsername = async(username)=>{
    const alreadyUsername = await User.findOne({username})
    if(alreadyUsername){
        console.error(`Username ${username} is already taken`)
        throw new Error(`Username ${username} is already taken`)
    }
}

export const existProduct = async(name)=>{
    const alreadyProduct = await Product.findOne({name})
    if(alreadyProduct){
        console.error(`Product ${Product} is already taken`)
        throw new Error(`Product ${Product} is already taken`)
    }
}

export const objectIdValid = async(objectId)=>{
    if (!isValidObjectId(objectId)){
        throw new Error (`Keeper is not object valid`)
    }
        
}

export const existEmail = async(email)=>{
    const alreadyEmail = await User.findOne({email})
    if(alreadyEmail){
        console.error(`Email ${email} is already taken`)
        throw new Error(`Email ${email} is already taken`)
    }
}