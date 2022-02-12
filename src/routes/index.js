import express from "express";
import authRouter from "./authRouter.js";
import itemsRouter from "./itemsRouter.js";
import accountRouter from "./accountRouter.js";
const router = express.Router();

router.use(authRouter);
router.use(itemsRouter);
router.use(accountRouter);

export default router;