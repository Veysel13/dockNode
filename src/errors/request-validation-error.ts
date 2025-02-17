import { ValidationError } from 'express-validator';
import { CustomError } from './custom-error';

interface ValidationErrorFormat {
  msg: string;
  param: string;
  location: string;
  value?: any;
}

export class RequestValidationError extends CustomError {
  statusCode = 400;

  constructor(public errors: ValidationErrorFormat[]) {
    super('Invalid request parameters');

    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this.errors.map((err) => ({
      message: err.msg,
      field: err.param,
      location: err.location,
      value: err.value,
    }));
  }
}
