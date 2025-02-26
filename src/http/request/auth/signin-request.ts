import Joi from "joi";

const siginRequestSchema = Joi.object({
    email: Joi.string().email().trim().required(),
    password:Joi.string().trim().required().min(8).max(25),
})

export default siginRequestSchema;