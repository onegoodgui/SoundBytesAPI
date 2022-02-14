import express from "express";
import { validateBearerToken } from "../middlewares/validateBearerToken.js";
import { setOrder } from "../controllers/orderController.js";
const orderRouter = express.Router();

orderRouter.post('/soundbytes/order/success', validateBearerToken, setOrder)

export default orderRouter