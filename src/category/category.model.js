import { Schema, model } from 'mongoose';

const categorySchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Category name is required'],
            maxLength: [50, `Can't exceed 50 characters`],
            unique: true,
        },
        description: {
            type: String,
            maxLength: [200, `Can't exceed 200 characters`]
        },
        status: {
            type: Boolean,
            required: [true, 'Status is required']
        }
    }
)

export default model('Category', categorySchema);