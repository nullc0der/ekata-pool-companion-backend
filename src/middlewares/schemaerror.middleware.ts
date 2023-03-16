import { NextFunction, Request, Response } from "express";
import { ValidationError } from "express-json-validator-middleware";

export default function schemaErrorMiddleware(
  error: Error,
  _: Request,
  response: Response,
  next: NextFunction,
) {
  if (response.headersSent) {
    return next(error);
  }
  const isValidationError = error instanceof ValidationError;
  if (!isValidationError) {
    return next(error);
  }
  response.status(400).json({
    errors: error.validationErrors,
  });
  next();
}
