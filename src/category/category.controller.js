import Category from "./category.model.js" 

export const save = async(req, res) => {
    try {
        let data = req.body
        let category = new Category(data)
 
        
        await category.save()
        return res.send({success: true, message: `${category.name} saved successfully`})
    } catch (err) {
        console.error(err)
        return res.status(500).send({success: false, message: 'General error when adding category'})
    }
}

export const getAll = async (req,res) => {
    try {
        const {limit=20,skip=0} = req.body
        const category = await Category.find().skip().limit(limit)

        if(category.length === 0) return res.status(404).send({message: 'Category not found', success: false})
            return res.send(
                {
                    success: true,
                    message: 'Category found: ', 
                    category,
                    total: category.length
                }
            )
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

export const update = async (req,res) => {
    try {
        const id = req.params.id
        const data = req.body
        const update = await Category.findByIdAndUpdate(id,data,{new:true})
        if (!update) return res.status(404).send({
            sucess: false,
            message: 'Category not found'
        })
        return res.send({
            success: true,
            message: 'Category Updated',
            update
        })
    } catch (err) {
        console.error(err)
        return res.status(500).send({
            success: false,
            message: 'General error', 
            err
        })
    }
}

export const eliminate = async (req,res) => {
    try {
        let id = req.params.id
        let eliminate = await Category.findByIdAndDelete(id)
        if (!id) return res.status(400).send({message: 'Invalid ID'})
            if (!eliminate) return res.status(400).send(
                {
                    success:false,
                    message:'Category not found'
                }
            )
            return res.send(
                {
                    success: true,
                    message: 'Category Removed'
                }
            )
    } catch (err) {
        console.error(err)
        return res.status(500).send({
            success: false,
            message: 'General error', 
            err
        })
    }
}