import Joi from "joi";

const userRequestSchema = Joi.object({
    name: Joi.string().trim().required().min(3).max(99),
    lastname: Joi.string().trim().required().min(3).max(99),
    email: Joi.string().email().trim().required(),
})

export default userRequestSchema;