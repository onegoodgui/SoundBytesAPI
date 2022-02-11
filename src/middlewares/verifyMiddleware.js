import db from "../db.js";

export default async function verifyUserExistence(req, res, next){

    const user = req.body;
    const existentUser = await db.collection('users').findOne({email: user.email})

    if(existentUser){
        res.locals.existentUser = 'E-mail já cadastrado'
        next()
    }
    else{
        next()
    }
}