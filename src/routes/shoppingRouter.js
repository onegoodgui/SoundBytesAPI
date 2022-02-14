import express from "express";
import findCartItem from "../middlewares/findCartItem.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { addToCart, getCartData, getCartAllItens, setShoppingCartItens } from "../controllers/shoppingController.js";


const shoppingRouter = express.Router();


shoppingRouter.get('/soundbytes/shoppingcart/qty', verifyToken, getCartData);

shoppingRouter.post('/soundbytes/shoppingcart/additems', verifyToken, findCartItem, addToCart);

shoppingRouter.get("/soundbytes/shoppingcart", verifyToken, getCartAllItens);


export default shoppingRouter;