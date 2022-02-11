import authSchema from "../schemas/authSchema.js";

export function authSchemaMiddleware(req, res, next){

const user = req.body;

const validation = authSchema.validate(user);
if(validation.error){
    return res.sendStatus(422);
}

next()
}