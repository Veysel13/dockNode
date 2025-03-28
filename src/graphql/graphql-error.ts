import { NextFunction, Request, Response } from "express";
import { GraphQLError } from "graphql";

class GraphqlErrorVustomError extends GraphQLError {
  constructor(message: string, code: string, statusCode: number) {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype);

    Object.assign(this, {
      extensions: {
        code,
        statusCode,
      },
    });
  }
}

export class GraphqlValidationError extends GraphqlErrorVustomError {
  constructor(message: string) {
    super(message, "BAD_REQUEST", 400);
  }
}

export class GraphqlNotAuthorizedError extends GraphqlErrorVustomError {
  constructor() {
    super("Not Authorized", "UNAUTHORIZED", 401);
  }
}

export const graphqlRequireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.currentUser) {
    throw new GraphqlNotAuthorizedError();
  }

  next();
};
