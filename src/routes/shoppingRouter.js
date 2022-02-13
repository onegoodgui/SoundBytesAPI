import express from "express";
import findCartItem from "../middlewares/findCartItem.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { addToCart } from "../controllers/shoppingController.js";

const shoppingRouter = express.Router();

shoppingRouter.post('/soundbytes/shoppingcart/additems', verifyToken, findCartItem, addToCart);


export default shoppingRouter;