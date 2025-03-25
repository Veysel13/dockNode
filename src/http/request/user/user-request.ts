import Joi from "joi";

const userRequestSchema = Joi.object({
    id:Joi.allow(null),
    name: Joi.string().trim().required().min(3).max(99),
    lastname: Joi.string().trim().required().min(3).max(99),
    email: Joi.string().email().trim().required(),
    password:Joi.allow(null)
})

export default userRequestSchema;