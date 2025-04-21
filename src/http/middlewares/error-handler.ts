import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../../errors/custom-error';
import { logger } from '../../lib/logger';

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {

  logger.error(`${req.method} ${req.url} - ${err.message}`);

  if (err instanceof CustomError) {
    return res.status(err.statusCode || 500).send({ errors: err.serializeErrors() });
  }

  res.status(400).send({
    errors: [err.message || 'Something went wrong' ]
  });
};


export default errorHandler;
