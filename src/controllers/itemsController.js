import { ObjectId } from 'mongodb';
import db from '../db.js';
import { v4 as uuid } from 'uuid';
import dayjs from 'dayjs';

export async function getAllItens(req, res) {

  try {

    const itens = await db.collection("itens").find({}).toArray()
    const token = JSON.stringify({ token: uuid()});

    if(req.cookies.shoppingCart === undefined || req.cookies.shoppingCart === '{}'){

      const shoppingCart = JSON.stringify({items:'empty'});
      
      res.cookie('shoppingCart',shoppingCart,{
        secure: false,
        Path: '/',
        encode: String,
        expires: dayjs().add(500, "minutes").toDate(),
      });

    }
   

    res.cookie('token',token,{
      secure: false,
      Path: '/',
      encode: String,
      expires: dayjs().add(500, "minutes").toDate(),
    });



    res.send(itens);

  } catch {
    res.sendStatus(500)
  }

}

export async function getCategoryItens(req, res) {

  const { name } = req.params
  try {
    if (name === "Todos") {
      const itens = await db.collection("itens").find({}).toArray()

      res.send(itens);
    }
    else {

      const itens = await db.collection("itens").find({ itemCategory: `${name}` }).toArray()

      res.send(itens);

    }
  } catch {
    res.sendStatus(500)
  }

}

export async function getItem(req, res) {

  const { id } = req.params;

  try {
    const item = await db.collection('itens').findOne({ _id: ObjectId(id) });
    console.log(item);
    res.status(201).send(item);
  }
  catch (error) {
    res.status(500).send(error);
    return
  }
}