import { body } from "express-validator"
import { existEmail, existUsername, objectIdValid } from "./db.validators.js"

export const registerValidator = [
    body('name', 'Name cannot be empty').notEmpty(),
    body('surname', 'Surname cannot be empty').notEmpty(),
    body('email', 'Email cannot be empty or is not a valid email').notEmpty().isEmail().custom(existEmail),
    body('username', 'Username cannot be empty').notEmpty().toLowerCase().custom(existUsername),
    body('password', 'Password cannot be empty').notEmpty().isStrongPassword().withMessage('The password must be'),
    body('phone', 'Phone cannot be empty or is not a valid phone').notEmpty()
]

export const updateValidator = [
    body('name', 'Name cannot be empty').notEmpty(),
    body('surname', 'Surname cannot be empty').notEmpty(),
    body('email', 'Email cannot be empty or is not a valid email').notEmpty().isEmail().custom(existEmail),
    body('username', 'Username cannot be empty').notEmpty().toLowerCase().custom(existUsername),
    //body('password', 'Password cannot be empty').notEmpty().isStrongPassword().withMessage('The password must be'),
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
    body('status', 'Status cannot be empty').notEmpty()
]

