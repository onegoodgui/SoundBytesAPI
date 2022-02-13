import express from "express";
import { validateBearerToken } from "../middlewares/validateBearerToken.js";
import { getUserInformation } from "../controllers/accountControllers.js";
import { getUserPayment, setPaymentMethod, getUserAddress, setUserAddress } from "../controllers/accountControllers.js";
import { } from "../controllers/accountControllers.js";
const accountRouter = express.Router();


accountRouter.use(validateBearerToken)
accountRouter.get("/soundbytes/account", getUserInformation);
accountRouter.get("/soundbytes/account/payment/:id", getUserPayment)
accountRouter.put("/soundbytes/account/payment/:id", setPaymentMethod)
accountRouter.get("/soundbytes/account/address/:id", getUserAddress)
accountRouter.put("/soundbytes/account/address/:id", setUserAddress)

export default accountRouter;