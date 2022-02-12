import { ObjectId } from 'mongodb';
import db from '../db.js';

export async function getUserInformation(req, res) {

  try {

    const user = res.locals.user;

    delete user.password

    res.send(user);

  } catch {
    res.sendStatus(500)
  }


}

export async function getUserPayment(req, res) {

  try {

    const user = res.locals.user;

    res.send(user.payment);

  } catch {
    res.sendStatus(500)
  }


}

export async function setPaymentMethod(req, res) {

  const { id } = req.params;
  const paymentMethod = req.body;

  const user = res.locals.user;

  const newUser = { ...user, ...paymentMethod }


  try {

    await db.collection("users").updateOne({ _id: new ObjectId(id) },
      { $set: newUser }
    )

    res.sendStatus(200);

  } catch {
    res.sendStatus(500)
  }
}

export async function getUserAddress(req, res) {

  try {

    const user = res.locals.user;

    res.send(user.address);

  } catch {
    res.sendStatus(500)
  }


}

export async function setUserAddress(req, res) {

  const { id } = req.params;
  const address = req.body;

  const user = res.locals.user;

  const newUser = { ...user, "address": address }

  try {

    await db.collection("users").updateOne({ _id: new ObjectId(id) },
      { $set: newUser }
    )

    res.sendStatus(200);

  } catch {
    res.sendStatus(500)
  }
}