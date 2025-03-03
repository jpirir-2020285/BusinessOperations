import User from "./user.model.js"
import {encrypt} from '../../utils/encrypt.js'
export const test = (req, res)=>{
    console.log('test is running')
    return res.send({message: 'Test is running'})
}

export const createDefaultAdmin = async () => {
    try {
        const existingAdmin = await User.findOne({ role: 'ADMIN' })
        if (!existingAdmin) {
            const defaultAdmin = new User({
                name: 'Jose Miguel',
                surname: 'Pirir',
                email: 'jpirir@gmail.com',
                username: 'jpirir123',
                phone: '13429786',
                password: await encrypt('Hola123.'),
                role: 'ADMIN'
            })

            await defaultAdmin.save() 
            console.log("Default ADMIN user created successfully")
        } else {
            console.log("Default ADMIN user already exists")
        }
    } catch (err) {
        console.error("Error creating default ADMIN user", err)
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
