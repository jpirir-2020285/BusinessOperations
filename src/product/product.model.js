import { Schema, model } from 'mongoose' 

const productSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Product name is required'],
            maxLength: [25, `Can't exceed 25 characters`],
            unique:true
        },
        description: {
            type: String,
            maxLength: [100, `Can't exceed 100 characters`]
        },
        price: {
            type: Number,
            required: [true, 'Price is required'],
            min: [0, 'Price cannot be negative']
        },
        stock: {
            type: Number,
            required: [true, 'Stock is required'],
            min: [0, 'Stock cannot be negative']
        },
        category: {
            type: String,
            required: [true, 'Category is required'],
            maxLength: [30, `Can't exceed 30 characters`]
        },
        status: {
            type: Boolean,
            default: true
        }
    }
)

export default model('Product', productSchema) 
