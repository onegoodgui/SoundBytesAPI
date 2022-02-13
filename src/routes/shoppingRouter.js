import express from "express";
import findCartItem from "../middlewares/findCartItem.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { addToCart, getCartData } from "../controllers/shoppingController.js";

const shoppingRouter = express.Router();

shoppingRouter.post('/soundbytes/shoppingcart/additems', verifyToken, findCartItem, addToCart);
shoppingRouter.get('/soundbytes/shoppingcart/qty', verifyToken, getCartData);


export default shoppingRouter;