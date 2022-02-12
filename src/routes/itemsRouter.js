import express from "express";
import { getAllItens, getCategoryItens } from "../controllers/itemsController.js";

const itemsRouter = express.Router();

itemsRouter.get("/soundbytes/itens", getAllItens);

itemsRouter.get("/soundbytes/category/:name", getCategoryItens);




export default itemsRouter;