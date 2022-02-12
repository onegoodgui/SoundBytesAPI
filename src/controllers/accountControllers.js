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