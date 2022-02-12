import express from "express";
import { validateBearerToken } from "../middlewares/validateBearerToken.js";
import { getUserInformation } from "../controllers/accountControllers.js";
const accountRouter = express.Router();


accountRouter.use(validateBearerToken)
accountRouter.get("/soundbytes/account", getUserInformation);


export default accountRouter;