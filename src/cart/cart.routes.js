import { Router } from 'express';
import { addToCart, getCart, removeFromCart, clearCart } from './cart.controller.js'
import { validateJwt } from '../../middlewares/validate.jwt.js';
import { validateClient } from '../../helpers/validate.role.js';

const router = Router();

router.post('/',[validateJwt,validateClient], addToCart)
router.get('/',[validateJwt,validateClient], getCart)
router.delete('/remove',[validateJwt,validateClient], removeFromCart)
router.delete('/clear',[validateJwt,validateClient], clearCart)

export default router;
