import express from "express";
import authRouter from "./authRouter.js";
import itemsRouter from "./itemsRouter.js";
const router = express.Router();

router.use(authRouter);
router.use(itemsRouter);

export default router;