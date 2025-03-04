import { Schema, model } from 'mongoose'

const invoiceSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        products: [
            {
                product: {
                    type: Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true
                },
                quantity: {
                    type: Number,
                    required: true,
                    min: [1, 'Quantity must be at least 1']
                },
                price: {
                    type: Number,
                    required: true
                }
            }
        ],
        total: {
            type: Number,
            required: true,
            min: [0, 'Total amount cannot be negative']
        },
        status: {
            type: String,
            enum: ['Pending', 'Paid', 'Cancelled'],
            default: 'Pending'
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    },
    { timestamps: true }
)

export default model('Invoice', invoiceSchema)
