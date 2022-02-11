import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import db from '../db.js';

export async function SignUp(req, res){
    const user = req.body;

    console.log('chegou aqui');
    const passwordHash = bcrypt.hashSync(user.password, 10);

    if(res.locals.existentUser === 'E-mail já cadastrado'){
        res.sendStatus(409)
        return
    }

    try{
        await db.collection('users').insertOne({...user, password:passwordHash});
        res.sendStatus(201);
    }
    catch(error){
        res.status(500).send(error)
    }
}

export async function SignIn(req, res) {
    console.log(req.body);
    const { email, password } = req.body;
  
    const user = await db.collection('users').findOne({ email });
  
    if (user && bcrypt.compareSync(password, user.password)) {

      const token = uuid();
      const currentSession = { token, user:{ userId: user._id, name: user.name }};
      await db.collection('sessions').insertOne(currentSession);
  
      res.send(currentSession);
    } 
    else {
      res.sendStatus(401);
    }
  }