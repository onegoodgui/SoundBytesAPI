import db from '../db.js';

export async function getAllItens(req, res) {

  try {

    const itens = await db.collection("itens").find({}).toArray()

    res.send(itens);

  } catch {
    res.sendStatus(500)
  }

}