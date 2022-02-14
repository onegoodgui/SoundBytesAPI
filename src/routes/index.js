import express from "express";
import authRouter from "./authRouter.js";
import itemsRouter from "./itemsRouter.js";
import shoppingRouter from "./shoppingRouter.js";
import accountRouter from "./accountRouter.js";
import orderRouter from "./orderRouter.js";


const router = express.Router();

router.use(authRouter);
router.use(itemsRouter);
router.use(shoppingRouter);
router.use(accountRouter);
router.use(orderRouter);


export default router;