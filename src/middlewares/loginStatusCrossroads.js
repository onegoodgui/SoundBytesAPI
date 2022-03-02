import db from "../db.js";
import { verifyToken } from "./verifyToken.js";
import { noLoginSession } from "../controllers/authController.js";

export async function loginStatusCrossroads(req, res, next){

if(req.cookies.user === undefined){
    noLoginSession(req, res, next)
}
else{
    verifyToken(req, res, next)
}
}