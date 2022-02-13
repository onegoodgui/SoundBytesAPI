import express from "express";
import authRouter from "./authRouter.js";
import itemsRouter from "./itemsRouter.js";
import shoppingRouter from "./shoppingRouter.js";
const router = express.Router();

router.use(authRouter);
router.use(itemsRouter);
router.use(shoppingRouter);

export default router;