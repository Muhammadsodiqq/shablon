import Joi from "joi";

export default class Validations {
    static UserValidation () {
        return Joi.object({
            name:Joi.string()
                .required()
                .min(3)
                .error(Error("name is invalid"))
                .max(100),
            email:Joi.string()
                .pattern(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
                .required()
                .error(Error("Phone number is invalid")),
        })
    }

    static codeValidation () {
        return Joi.object({
            code: Joi.number()
                .required()
                .min(10000)
                .max(99999)
                .error(Error("Invalid code!")),
            code_validation_id:Joi.string()
                .required()
                .error(Error("Invalid validation token!"))
                .pattern(/[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}/
                    )
        })
    }

    static categoryValidation () {
        return Joi.object({
            token: Joi.string()
                .required()
                .error(Error("token is invalid!")),
            category_name:Joi.string()
                .required()
                .error(Error("Invalid  category name!"))
                
        })
    }
    static getValidation () {
        return Joi.object({
            token: Joi.string()
                .required()
                .error(Error("token is invalid!")),
            id:Joi.string()
                .required()
                .error(Error("id is invalid!"))
        })
    }

    static updateValidation () {
        return Joi.object({
            token: Joi.string()
                .required()
                .error(Error("token is invalid!")),
            id:Joi.string()
                .required()
                .error(Error("id is invalid!")),
            name:Joi.string()
                .required()
                .error(Error("id is invalid!"))
        })
    }
}