const createError = require('http-errors')
import { Request, Response, NextFunction } from "express";
import schemas from '../request/schema'
import { ValidationErrorItem } from "joi";
import { RequestValidationError } from "../../errors/request-validation-error";
import { FieldValidationError } from "express-validator";

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
    
      const formattedErrors = error.details.map((err: ValidationErrorItem) => ({
        msg: err.message,
        param: err.path.join("."),
        location: "body",
        value: err.context?.value,
      }));


      throw new RequestValidationError(formattedErrors);
    }

    return next();
  };
};

export default schemaValidator;
