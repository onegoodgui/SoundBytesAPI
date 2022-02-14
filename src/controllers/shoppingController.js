import db from "../db.js";
import { ObjectId } from "mongodb";


export async function getShoppingCart(req, res){
    const user = res.locals.user;
    
    try{

        const orderData = await db.collection('shopping-cart-list').findOne({userId:user._id});
        console.log(orderData);

        res.status(200).send(orderData);
    }
    catch(error){
        res.status(500).send(error)
    }
}


export async function getCartData(req, res){
    const user = res.locals.user;
    console.log(user);


    try{

        const itemsQnt = await db.collection('shopping-cart-list').aggregate(
            [
                 { "$project": {
                    "userId": user._id,
                    "totalQnty": {
                       "$sum": "$items.qnt"
                       }
                    }}
                 ]
             ).toArray();
        
        res.status(201).send(itemsQnt)
        return
    }
    catch(error){
        res.status(500).send(error)
    }
}


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
            const existentItem = await db.collection('shopping-cart-list').findOne({
                "items.itemId": obj.itemId,
                "userId": userId
            })
            if(existentItem !== null){
                const a = await db.collection('shopping-cart-list').updateOne(
                    {"userId" : userId},
                    { $inc: { "items.$[current].qnt": req.body.qnt} },
                    { arrayFilters: [{'current.itemId': obj.itemId} ]} 
                )

                res.status(200).send('OK');
            }
            else{
                const b = await db.collection('shopping-cart-list').updateOne(
                    { "userId": userId},
                    { $push: { "items": itemObj }}
                )
                res.status(200).send('OK');
            }
        }  
    }
    catch(error){
        res.status(500).send(error)
    }
    
}

