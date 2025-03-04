import Invoice from './invoice.model.js'
import Cart from '../cart/cart.model.js'
import Product from '../product/product.model.js'

export const createInvoice = async (req, res) => {
    try {
        const user = req.user.uid

        let cart = await Cart.findOne({ user }).populate('products.product')

        if (!cart || cart.products.length === 0) {
            return res.status(400).send({ success: false, message: "Cart is empty" })
        }

        let totalAmount = 0
        let invoiceProducts = []

        for (let item of cart.products) {
            let product = item.product

            if (product.stock < item.quantity) {
                return res.status(400).send({ success: false, message: `Not enough stock for ${product.name}` })
            }

            product.stock -= item.quantity
            await product.save()

            totalAmount += product.price * item.quantity
            invoiceProducts.push({
                product: product._id,
                quantity: item.quantity,
                price: product.price
            })
        }

        const invoice = new Invoice({
            user,
            products: invoiceProducts,
            total: totalAmount
        })

        await invoice.save()

        await Cart.findOneAndDelete({ user })

        return res.send({ success: true, message: "Invoice created successfully", invoice })

    } catch (err) {
        console.error(err)
        return res.status(500).send({ success: false, message: "Error creating invoice", error: err.message })
    }
}

export const getAllInvoices = async (req, res) => {
    try {
        const invoices = await Invoice.find().populate('user', 'username email').populate('products.product', 'name price')

        if (!invoices.length) {
            return res.status(404).send({ success: false, message: "No invoices found" })
        }

        return res.send({ success: true, message: "Invoices retrieved successfully", invoices })
    } catch (err) {
        return res.status(500).send({ success: false, message: "Error retrieving invoices", error: err.message })
    }
}

export const getUserInvoices = async (req, res) => {
    try {
        const user = req.user.uid

        const invoices = await Invoice.find({ user }).populate('products.product', 'name price')

        if (!invoices.length) {
            return res.status(404).send({ success: false, message: "No invoices found for this user" })
        }

        return res.send({ success: true, message: "User invoices retrieved successfully", invoices })
    } catch (err) {
        return res.status(500).send({ success: false, message: "Error retrieving user invoices", error: err.message })
    }
}

export const getInvoiceById = async (req, res) => {
    try {
        const { id } = req.params

        const invoice = await Invoice.findById(id).populate('user', 'username email').populate('products.product', 'name price')

        if (!invoice) {
            return res.status(404).send({ success: false, message: "Invoice not found" })
        }

        return res.send({ success: true, message: "Invoice retrieved successfully", invoice })
    } catch (err) {
        return res.status(500).send({ success: false, message: "Error retrieving invoice", error: err.message })
    }
}

export const updateInvoice = async (req, res) => {
    try {
        const { id } = req.params
        const { status } = req.body

        if (!['Pending', 'Paid', 'Cancelled'].includes(status)) {
            return res.status(400).send({ success: false, message: "Invalid status value" })
        }

        const updatedInvoice = await Invoice.findByIdAndUpdate(id, { status }, { new: true })

        if (!updatedInvoice) {
            return res.status(404).send({ success: false, message: "Invoice not found" })
        }

        return res.send({ success: true, message: "Invoice updated successfully", updatedInvoice })
    } catch (err) {
        return res.status(500).send({ success: false, message: "Error updating invoice", error: err.message })
    }
}

export const cancelInvoice = async (req, res) => {
    try {
        const { id } = req.params

        const invoice = await Invoice.findById(id).populate('products.product')

        if (!invoice) {
            return res.status(404).send({ success: false, message: "Invoice not found" })
        }

        if (invoice.status === "Cancelled") {
            return res.status(400).send({ success: false, message: "Invoice is already cancelled" })
        }

        for (let item of invoice.products) {
            let product = await Product.findById(item.product._id)
            if (product) {
                product.stock += item.quantity
                await product.save()
            }
        }

        invoice.status = "Cancelled"
        await invoice.save()

        return res.send({ success: true, message: "Invoice cancelled successfully and stock restored", invoice })

    } catch (err) {
        return res.status(500).send({ success: false, message: "Error cancelling invoice", error: err.message })
    }
}