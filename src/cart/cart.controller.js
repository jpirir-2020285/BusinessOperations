import Cart from './cart.model.js'
import Product from '../product/product.model.js'

export const addToCart = async (req, res) => {
    try {
        const user = req.user.uid
        let { product, quantity } = req.body
        let cart = await Cart.findOne({ user })

        if (!product || !quantity) {
            return res.status(400).send({ success: false, message: "Product and quantity are required" })
        }

        quantity = Number(quantity)

        const productExists = await Product.findById(product)
        if (!productExists) {
            return res.status(404).send({ success: false, message: "Product not found" })
        }

        if (productExists.stock < quantity) {
            return res.status(400).send({ success: false, message: `Not enough stock for ${productExists.name}` })
        }


        if (cart) {
            const productIndex = cart.products.findIndex(item => item.product.toString() === product)
            if (productIndex > -1) {
                cart.products[productIndex].quantity += quantity
            } else {
                cart.products.push({ product, quantity })
            }
            await cart.save()
        } else {
            cart = new Cart({ user, products: [{ product, quantity }] })
            await cart.save()
        }
        productExists.stock -= quantity
        await productExists.save()

        return res.send({ success: true, message: "Product added to cart successfully and stock updated", cart })

    } catch (err) {
        console.error(err)
        return res.status(500).send({ success: false, message: "Error adding product to cart", error: err.message })
    }
}


export const getCart = async (req, res) => {
    try {
        const user = req.user.uid

        const cart = await Cart.findOne({ user: user }).populate('products.product')
        if (!cart || cart.products.length === 0) {
            return res.status(404).send({ success: false, message: "Cart is empty" })
        }

        return res.send({ success: true, message: "Cart retrieved", cart })

    } catch (err) {
        return res.status(500).send({ success:   false, message: "Error retrieving cart", error: err.message })
    }
}

export const removeFromCart = async (req, res) => {
    try {
        const user = req.user.uid
        const { product } = req.body

        if (!product) {
            return res.status(400).send({ success: false, message: "Product ID is required" })
        }

        let cart = await Cart.findOne({ user })
        if (!cart) {
            return res.status(404).send({ success: false, message: "Cart not found" })
        }

        const productIndex = cart.products.findIndex(item => item.product.toString() === product)

        if (productIndex === -1) {
            return res.status(404).send({ success: false, message: "Product not found in cart" })
        }

        const productExists = await Product.findById(product)
        if (productExists) {
            productExists.stock += cart.products[productIndex].quantity
            await productExists.save()
        }

        cart.products.splice(productIndex, 1)
        await cart.save()

        return res.send({ success: true, message: "Product removed from cart successfully", cart })

    } catch (err) {
        console.error(err)
        return res.status(500).send({ success: false, message: "Error removing product from cart", error: err.message })
    }
}


export const clearCart = async (req, res) => {
    try {
        const user = req.user.uid

        let cart = await Cart.findOne({ user })
        if (!cart) {
            return res.status(404).send({ success: false, message: "Cart not found" })
        }

        for (let item of cart.products) {
            let productExists = await Product.findById(item.product)
            if (productExists) {
                productExists.stock += item.quantity
                await productExists.save()
            }
        }

        cart.products = []
        await cart.save()

        return res.send({ success: true, message: "Cart cleared successfully", cart })

    } catch (err) {
        console.error(err)
        return res.status(500).send({ success: false, message: "Error clearing cart", error: err.message })
    }
}