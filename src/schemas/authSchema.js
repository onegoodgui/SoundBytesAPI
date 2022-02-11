import joi from "joi";


    const authSchema = joi.object({
        name: joi.string().required(),
        email: joi.string().email().required(),
        password: joi.string().required().regex(/(?=.*[A-Z])(?=.*[0-9])(?=.*[\.\,\<\>\:\;\"\'\+\@\-\=\*\?\^\&\%\!\$\(\)\[\]\{\}\|\\]).{8,32}/).required()
      });



export default authSchema;