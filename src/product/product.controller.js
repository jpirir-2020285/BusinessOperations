import Product from './product.model.js' 
import Category from '../category/category.model.js' 

export const save = async (req, res) => {
    try {
        const data = req.body 
        const category = await Category.findOne({ _id: data.category }) 

        if (!category) {
            return res.status(404).send({ success: false, message: 'Category not found' }) 
        }

        const product = new Product(data) 
        await product.save() 

        return res.send({
            success: true,
            message: `${product.name} saved successfully`,
            product
        }) 
    } catch (err) {
        console.error(err) 
        return res.status(500).send({
            success: false,
            message: 'General error when adding product',
            error: err.message
        }) 
    }
} 


export const getAll = async (req, res) => {
    try {
        const { limit, skip = 0 } = req.query 
        const products = await Product.find({ status: true }).skip(Number(skip)).limit(Number(limit)) 

        if (products.length === 0)
            return res.status(404).send({ success: false, message: 'No active products found' }) 

        return res.send({
            success: true,
            message: 'Active products found',
            products,
            total: products.length
        }) 
    } catch (err) {
        console.error(err) 
        return res.status(500).send({
            success: false,
            message: 'General error when adding product',
            error: err.message
        })
    }
}

export const getById = async (req, res) => {
    try {
        const { id } = req.params 
        const product = await Product.findOne({ _id: id, status: true }) 

        if (!product) return res.status(404).send({ success: false, message: 'Product not found or inactive' }) 

        return res.send({ success: true, message: 'Product found', product }) 
    } catch (err) {
        console.error(err) 
        return res.status(500).send({
            success: false,
            message: 'General error when adding product',
            error: err.message
        }) 
    }
} 

export const update = async (req, res) => {
    try {
        const { id } = req.params 
        const data = req.body 

        const updatedProduct = await Product.findByIdAndUpdate(id, data, { new: true }) 

        if (!updatedProduct)
            return res.status(404).send({ success: false, message: 'Product not found' }) 

        return res.send({ success: true, message: 'Product updated', product: updatedProduct }) 
    } catch (err) {
        console.error(err) 
        return res.status(500).send({
            success: false,
            message: 'General error when adding product',
            error: err.message
        }) 
    }
} 

export const eliminate = async (req, res) => {
    try {
        const { id } = req.params 
        const product = await Product.findByIdAndUpdate(id, { status: false }, { new: true }) 

        if (!product)
            return res.status(404).send({ success: false, message: 'Product not found' }) 

        return res.send({ success: true, message: 'Product deactivated', product }) 
    } catch (err) {
        console.error(err) 
        return res.status(500).send({
            success: false,
            message: 'General error when adding product',
            error: err.message
        }) 
    }
} 

export const getOutOfStock = async (req, res) => {
    try {
        const products = await Product.find({ stock: 0, status: true }).sort({ name: 1 });

        if (products.length === 0)
            return res.status(404).send({ success: false, message: "No out-of-stock products found" });

        return res.send({
            success: true,
            message: "Out-of-stock products retrieved successfully",
            products
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ success: false, message: "Error fetching out-of-stock products", error: err.message });
    }
};

// Buscar productos por nombre (solo productos activos)
export const searchByName = async (req, res) => {
    try {
        const { name, limit = 20, skip = 0 } = req.query;

        if (!name) {
            return res.status(400).send({ success: false, message: "Name query parameter is required" });
        }

        const products = await Product.find({ 
            name: { $regex: name, $options: "i" }, 
            status: true 
        })
        .skip(Number(skip))
        .limit(Number(limit));

        if (products.length === 0) {
            return res.status(404).send({ success: false, message: "No matching products found" });
        }

        return res.send({
            success: true,
            message: "Matching products found",
            products,
            total: products.length
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send({
            success: false,
            message: "Error searching products",
            error: err.message
        });
    }
};
