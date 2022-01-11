import Validations from "../utils/validations.js"
import rn from "random-number";
import mailer from "../utils/nodemailer.js";
import jwt from "../utils/jwt.js";

export default class userController {
    static async SignUp(req,res) {
        try {
            let data = await Validations.UserValidation().validateAsync(req.body);
            console.log(req.db);
            let userIsExists = await req.db.users.findOne({
                where:{
                    user_email: data.email
                }
            })

            if (userIsExists) throw ("User already exists");

            const user = await req.db.users.create({
                user_name: data.name,
                user_email: data.email,
            })

            const gen = rn.generator({
                min: 10000,
                max: 99999,
                integer: true
            })

            const genNumber = gen();
            let attempts = await req.db.attempts.create({
                code:genNumber,
                user_id:user.user_id
            })
            await mailer(data.email,genNumber)
            
            res.status(200).json({
                ok: true,
                message: 'Code sent on your gmail',
                data: {
                    user: user.dataValues,
                    code_id: attempts.dataValues.id
                },
            })
            
        } catch (error) {
            console.log(error);
            return res.status(400).json({
                ok:false,
                message:error + ""
            })
        }
    }

    static async code_validation(req,res) {
        try {
            const data = await Validations.codeValidation().validateAsync(req.body);

            const attempt = await req.db.attempts.findOne({
                where: {
                    id: data.code_validation_id
                },
                include: {
                    model: req.db.users,
                }
            })

            if (!attempt) throw new Error('Validation code is not found!');
            if (Number(data.code) !== Number(attempt.dataValues.code)) {
                throw ("Your validation code is incorrect!")
            }

            const token = jwt.genToken({
                id:attempt.dataValues.user.dataValues.user_id
            })

            res.status(201).json({
                ok: true,
                message: "Logged in!",
                data: {
                    token
                }
            })
        } catch (error) {
            console.log(error);
            res.status(400).json({
                ok:false,
                message:error + ""
            })
        }
    }
}