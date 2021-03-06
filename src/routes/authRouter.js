import express from "express";
import { SignUp } from "../controllers/authController.js";
import { SignIn } from "../controllers/authController.js";
import { authSchemaMiddleware } from "../middlewares/authSchemaMiddleware.js";
import verifyUserExistence from "../middlewares/verifyMiddleware.js";

const authRouter = express.Router();

authRouter.post('/soundbytes/auth/sign-up', authSchemaMiddleware, verifyUserExistence, SignUp);
authRouter.post('/soundbytes/auth/sign-in', SignIn);

export default authRouter;