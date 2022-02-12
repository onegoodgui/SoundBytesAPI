import express from "express";
import { getAllItens, getCategoryItens, getItem } from "../controllers/itemsController.js";

const itemsRouter = express.Router();

itemsRouter.get("/soundbytes/itens/", getAllItens);

itemsRouter.get("/soundbytes/category/:name", getCategoryItens);

itemsRouter.get("/soundbytes/item/:id", getItem);




export default itemsRouter;