import express from "express";
import findCartItem from "../middlewares/findCartItem.js";
import { loginStatusCrossroads } from "../middlewares/loginStatusCrossroads.js";
import { addToCart, updateCart,getCartData, getCartAllItens, setShoppingCartItens } from "../controllers/shoppingController.js";

const shoppingRouter = express.Router();

shoppingRouter.post('/soundbytes/shoppingcart/additems', loginStatusCrossroads, findCartItem, addToCart);
shoppingRouter.get('/soundbytes/shoppingcart/qty', loginStatusCrossroads, getCartData);
shoppingRouter.get("/soundbytes/shoppingcart", loginStatusCrossroads, getCartAllItens);
shoppingRouter.put("/soundbytes/shoppingcart", loginStatusCrossroads, setShoppingCartItens);
shoppingRouter.post('/soundbytes/shoppingcart/updateCart', loginStatusCrossroads, updateCart);


export default shoppingRouter;