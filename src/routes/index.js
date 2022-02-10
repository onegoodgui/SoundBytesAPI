import express from "express";

import itemsRouter from "./itemsRouter.js";

const router = express.Router();

router.use(itemsRouter);

export default router;