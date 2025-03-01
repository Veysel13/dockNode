import { NextFunction, Request, Response } from "express"
import { BadRequestError } from "../../errors/bad-request-error";

const maintance = async (req:Request, res:Response, next:NextFunction) => {
    try {
        if (true) {
            next()
        } else {
            throw new BadRequestError(res.__('errors.maintance'));
        }
    } catch (error) {
        next(error)
    }
}

export default maintance