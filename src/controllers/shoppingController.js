import db from "../db.js";
import { ObjectId } from "mongodb";

export async function addToCart(req, res){

    const userId = res.locals.user._id;
    const obj = res.locals.obj;
    const qnt = {qnt:req.body.qnt};
    const itemObj = {...obj, ...qnt};
    
    const purchaseObj = {userId, items:[itemObj]}

    try{
        const existentUserShoppingCart = await db.collection('shopping-cart-list').findOne({userId});
        if(!existentUserShoppingCart){
            const item = await db.collection('shopping-cart-list').insertOne(purchaseObj);
        }
        else{
        const existentItem = await db.collection('shopping-cart-list').find({"items.itemId": obj.itemId}).toArray();
        if(existentItem.length !== 0){
            const a = await db.collection('shopping-cart-list').updateOne(
                {"userId" : userId},
                 { $inc: { "items.$[current].qnt": req.body.qnt} },
                { arrayFilters: [{'current.itemId': obj.itemId} ]} 
            )
            console.log(a)
        }
        else{
            const b = await db.collection('shopping-cart-list').updateOne(
                { "userId": userId},
                { $push: { "items": itemObj }}
            )

        }
        }  
    }
    catch(error){
        console.log(error)
    }
    
}
