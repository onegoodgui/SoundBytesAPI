import db from '../db.js';

export async function getAllItens(req, res) {

  try {

    const itens = await db.collection("itens").find({}).toArray()

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