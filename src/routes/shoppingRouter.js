import express from "express";
import findCartItem from "../middlewares/findCartItem.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { addToCart, getCartData, getShoppingCart } from "../controllers/shoppingController.js";

const shoppingRouter = express.Router();

shoppingRouter.get('/soundbytes/shoppingcart', verifyToken, getShoppingCart)
shoppingRouter.get('/soundbytes/shoppingcart/qty', verifyToken, getCartData);
shoppingRouter.post('/soundbytes/shoppingcart/additems', verifyToken, findCartItem, addToCart);


export default shoppingRouter;