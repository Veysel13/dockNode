import Joi from "joi";

const commentRequestSchema = Joi.object({
    postId: Joi.allow(null),
    rating: Joi.number().required().min(1).max(5),
    description: Joi.string().trim().required().min(3).max(99),
})

export default commentRequestSchema;