import db from "../db.js";
import dayjs from "dayjs";
import cookieParser from 'cookie-parser'
import { ObjectId } from "mongodb";


export async function getCartData(req, res) {
  const user = res.locals.user;

  if(req.cookies.user === undefined){
    if(req.cookies.shoppingCart === '{}'){

      req.cookies.shoppingCart = null;
    }

    res.send('chegou aqui');
    return
  }

  try {

    const itemsQnt = await db.collection('shopping-cart-list').aggregate(
      [
        {
          "$project": {
            "userId": user._id,
            "totalQnty": {
              "$sum": "$items.qnt"
            }
          }
        }
      ]
    ).toArray();

    res.status(201).send(itemsQnt)
    return
  }
  catch (error) {
    res.status(500).send(error)
  }

}


export async function addToCart(req, res) {

  
  const obj = res.locals.obj;
  const qnt = { qnt: req.body.qnt };
  const itemObj = { ...obj, ...qnt };

  let purchaseObj = {items: [itemObj] };

  if(req.cookies.user === undefined){
    
    let shopCartObj = JSON.parse(req.cookies.shoppingCart);

    if(shopCartObj.items === 'empty'){
      shopCartObj = purchaseObj;
    }
    else{
      const foundItem = shopCartObj.items.find((item) => { 

      if(item.itemId === req.body.itemId){
        item.qnt = item.qnt + req.body.qnt;
        return (true)
      }
      });
      if (!foundItem){

        shopCartObj.items = [...shopCartObj.items, itemObj];
      }
  
    }


    let shopCartString = JSON.stringify(shopCartObj);

    res.cookie('shoppingCart',shopCartString,{
      secure: false,
      encode: String,
      Path: '/',
      expires: dayjs().add(500, "minutes").toDate(),
      overwrite: true
    });
    
    res.send('chegou aqui');
    return
  }



  
  const userId = res.locals.user._id;
  purchaseObj = { userId, items: [itemObj] }

  try {
    const existentUserShoppingCart = await db.collection('shopping-cart-list').findOne({ userId });
    if (!existentUserShoppingCart) {
      const item = await db.collection('shopping-cart-list').insertOne(purchaseObj);
      res.send(200)
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
  catch (error) {
    console.log(error)
  }

}

export async function updateCart(req, res){

  const updatedItem = req.body.updatedItem;

  const cookieItems = JSON.parse(req.cookies.shoppingCart);
  
  cookieItems.items.filter(item => {
    if(item.itemId === updatedItem.itemId){
      item.qnt = updatedItem.qnt;
    }
  })
  
  let shopCartString = JSON.stringify(cookieItems);

  res.cookie('shoppingCart',shopCartString,{
    secure: false,
    encode: String,
    Path: '/',
    expires: dayjs().add(500, "minutes").toDate(),
    overwrite: true
  });

  res.send('ok');

}















export async function getCartAllItens(req, res) {
  if(res.locals.user !== undefined){

    const user = res.locals.user;
  
    try {
  
      const AllItens = await db.collection('shopping-cart-list').findOne({ "userId": user._id })
      res.status(200).send(AllItens)
      return
    }
    catch (error) {
      res.status(500).send(error)
    }
  }
  else{
    res.send('hi');
  }
}

export async function setShoppingCartItens(req, res) {

  const user = res.locals.user;
  const shoppingCart = req.body;

  let newItens = [...shoppingCart.items]

  try {

    const shoppinglist = await db.collection('shopping-cart-list').findOne({ "userId": user._id })
    await db.collection('shopping-cart-list').updateOne({ "userId": user._id },
      {
        $set: {
          "items": newItens
        }
      }
    )
    res.status(201).send(newItens)
    return
  }
  catch (error) {
    res.status(500).send(error)
  }
}