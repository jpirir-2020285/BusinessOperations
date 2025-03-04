import { body } from "express-validator"
import { existEmail, existProduct, existUsername, objectIdValid } from "./db.validators.js"

export const registerValidator = [
    body('name', 'Name cannot be empty').notEmpty(),
    body('surname', 'Surname cannot be empty').notEmpty(),
    body('email', 'Email cannot be empty or is not a valid email').notEmpty().isEmail().custom(existEmail),
    body('username', 'Username cannot be empty').notEmpty().toLowerCase().custom(existUsername),
    body('password', 'Password cannot be empty').notEmpty().isStrongPassword().withMessage('The password must be strong'),
    body('phone', 'Phone cannot be empty or is not a valid phone').notEmpty()
]

export const updateValidator = [
    body('name', 'Name cannot be empty').notEmpty(),
    body('surname', 'Surname cannot be empty').notEmpty(),
    body('email', 'Email cannot be empty or is not a valid email').notEmpty().isEmail().custom(existEmail),
    body('username', 'Username cannot be empty').notEmpty().toLowerCase().custom(existUsername),
    body('phone', 'Phone cannot be empty or is not a valid phone').notEmpty()
]

export const updateClient = [
    body('name', 'Name cannot be empty').notEmpty(),
    body('surname', 'Surname cannot be empty').notEmpty(),
    body('phone', 'Phone cannot be empty or is not a valid phone').notEmpty()
]

export const addCategory = [
    body('name', 'Name cannot be empty').notEmpty(),
    body('description', 'Description cannot be empty').notEmpty(),
    body('status', 'Status cannot be empty').notEmpty().isBoolean().withMessage('Status must be true or false')
]

export const addProduct = [
    body('name', 'Name cannot be empty').notEmpty().custom(existProduct),
    body('description', 'Description cannot be empty').notEmpty(),
    body('price', 'Price is required and must be a positive number').notEmpty().isFloat({ min: 0 }).withMessage('Price must be a positive number'),
    body('category', 'Category ID must be valid').notEmpty().custom(objectIdValid),
    body('stock', 'Stock is required and must be a non-negative integer').notEmpty().isInt({ min: 0 }).withMessage('Stock cannot be negative'),
    body('status', 'Status cannot be empty').notEmpty().isBoolean().withMessage('Status must be true or false')
]

export const updateProduct = [
    body('name', 'Name cannot be empty').optional().custom(existProduct),
    body('description', 'Description cannot be empty').optional(),
    body('price', 'Price must be a positive number').optional().isFloat({ min: 0 }).withMessage('Price must be a positive number'),
    body('category', 'Category ID must be valid').optional().custom(objectIdValid),
    body('stock', 'Stock must be a non-negative integer').optional().isInt({ min: 0 }).withMessage('Stock cannot be negative'),
    body('status', 'Status must be true or false').optional().isBoolean()
]

export const deleteProduct = [
    body('product', 'Product ID is required and must be valid').notEmpty().custom(objectIdValid)
]

export const addCart = [
    body('product', 'Product ID is required and must be valid').notEmpty().custom(objectIdValid),
    body('quantity', 'Quantity is required and must be a positive number').notEmpty().isInt({ min: 1 }).withMessage('Quantity must be at least 1')
]

export const removeCart = [
    body('product', 'Product ID is required and must be valid').notEmpty().custom(objectIdValid)
]

export const checkout = [
    body('paymentMethod', 'Payment method is required').notEmpty(),
]

export const createInvoice = [
    body('products', 'Products must be an array').isArray().notEmpty(),
    body('products.*.product', 'Each product ID must be valid').notEmpty().custom(objectIdValid),
    body('products.*.quantity', 'Quantity must be a positive integer').notEmpty().isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
    body('totalAmount', 'Total amount is required and must be a positive number').notEmpty().isFloat({ min: 0 }).withMessage('Total amount must be a positive number'),
    body('paymentMethod', 'Payment method is required').notEmpty(),
]

export const updateInvoice = [
    body('status', 'Status must be true or false').optional().isBoolean(),
]
