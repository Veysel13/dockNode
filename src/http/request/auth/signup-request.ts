import Joi from "joi";

const signupRequestSchema = Joi.object({
    name: Joi.string().trim().required().min(3).max(99),
    lastname: Joi.string().trim().required().min(3).max(99),
    email: Joi.string().email().trim().required(),
    password:Joi.string().trim().required().min(8).max(25),
})

export default signupRequestSchema;