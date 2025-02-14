const createError = require('http-errors')
import { Request, Response, NextFunction } from "express";
import schemas from '../request/schema'

const validationOptions = {
  abortEarly: false,
  allowUnknown: false,
  stripUnknown: false,
};

const schemaValidator = (key:keyof typeof schemas, useJoiError = true) => {
  const schema = schemas[key];

  if (!schema) {
    throw new Error(`Schema not found for path: ${key}`);
  }

  return (req:Request, res:Response, next:NextFunction) => {
    const { error, value } = schema.validate(req.body, validationOptions);
   
    if (error) {
        throw createError(422, error)
    }

    return next();
  };
};

export default schemaValidator;
