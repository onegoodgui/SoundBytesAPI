import db from "../db.js";
import { ObjectId } from "mongodb";

export default async function findCartItem (req, res, next){

    const itemId = req.body.itemId;
    
    try{
        const item = await db.collection('itens').findOne({_id: ObjectId(itemId)});

        if(!item){
            res.status(422);
            return
        }

        const obj = {itemId, itemName: item.itemName ,price: item.itemPrice, image: item.itemThumbnail}
        res.locals.obj = obj;
        next()
    }
    catch(error){

    }
}