import Joi from "joi";

const postRequestSchema = Joi.object({
    title: Joi.string().trim().required().min(3).max(99),
    description: Joi.string().trim().required().min(3).max(99),
})

export default postRequestSchema;