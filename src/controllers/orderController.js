import { ObjectId } from 'mongodb';
import db from '../db.js';

export async function setOrder(req, res){

    const teste = req.body;
    const id = req.body.userData._id

    try{
        await db.collection('orders').insertOne(teste)
        await db.collection('shopping-cart-list').deleteOne({userId: new ObjectId(id)})

        res.status(200).send('OK');
    }
    catch(error){
        console.log(error)
    }
}