import Joi from "joi";

const postRequestSchema = Joi.object({
    id:Joi.allow(null),
    image:Joi.string().allow(null),
    title: Joi.string().trim().required().min(3).max(99),
    description: Joi.string().trim().required().min(3).max(99),
})

export default postRequestSchema;