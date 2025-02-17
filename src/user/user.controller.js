import User from "./user.model.js"
import {checkPassword, encrypt} from '../../utils/encrypt.js'
import { generateJwt } from '../../utils/jwt.js'

export const test = (req, res)=>{
    console.log('test is running')
    return res.send({message: 'Test is running'})
}

export const register = async(req, res)=>{
    try{
        let data = req.body
        let user = new User(data)

        user.password = await encrypt(user.password)

        user.role = 'CLIENT'
        await user.save()
        return res.send({message: `Registered successfully, can be logged with username: ${user.username}`})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'General error with registering user', err})
    }
}

export const login = async(req, res)=>{
    try{
        let { username, password } = req.body
        let user = await User.findOne({username})
        if(user && await checkPassword(user.password, password)) {
            let loggedUser = {
                uid: user._id,
                name: user.name,
                username: user.username,
                role: user.role
            }
            let token = await generateJwt(loggedUser)
            return res.send(
                {
                    message: `Welcome ${user.name}`,
                    loggedUser,
                    token
                }
            )
        }
        return res.status(400).send({message: 'Wrong email or password'})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'General error with login function'})
    }
}


export const update = async(req,res)=>{
    try {
        const id = req.params.id
        const data = req.body
        const update = await User.findByIdAndUpdate(id,data,{new:true})

        if (data.password) return res.status(400).send({message: 'Password not editable'})

        if (!update)return res.status(404).send({message: 'User not found'})
            return res.send({message: 'User updated succesfully', update})
    } catch (err) {
        console.console.log(err)
        return res.status(500).send({message: 'General Error',err})
    }
}

export const eliminate = async(req, res)=>{
    try {
        let id = req.params.id
        let eliminate= await User.findByIdAndDelete(id)
        
        

        if (!id) return res.status(400).send({message: 'Invalid ID'})
        if (!eliminate)return res.status(404).send({Message: 'User not found'})
            return res.send({message: 'User deleted succesfully'})
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error', 
                err
            }
        )
    }   
}

export const updateProfile = async(req,res)=>{
    try {
        const id = req.params.id
        const data = req.body
        const update = await User.findByIdAndUpdate(id,data,{new:true})
        
        if (data.role) return res.status(400).send({message: 'Role not editable'})
        if (data.email) return res.status(400).send({message: 'Email not editable'})
        if (data.username) return res.status(400).send({message: 'UserName not editable'})

        if (!update)return res.status(404).send({message: 'User not found'})
            return res.send({message: 'User updated succesfully', update})
    } catch (err) {
        console.console.log(err)
        return res.status(500).send({message: 'General Error',err})
    }
}
