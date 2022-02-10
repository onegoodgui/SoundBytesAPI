import express from "express";
import { getAllItens } from "../controllers/itemsController.js";

const itemsRouter = express.Router();

itemsRouter.get("/soundbytes/itens/", getAllItens);


//Essa Rota é de teste (deletar quando enviar!)
itemsRouter.get("/hello", (req, res) => {
  res.send("Hello!");
});



export default itemsRouter;