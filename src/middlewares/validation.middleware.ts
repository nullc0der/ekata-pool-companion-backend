import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { RequestHandler } from "express";
import { HttpException } from "@exceptions/HttpException";

//NOTE: This validation middleware is not complete,
// It consolidates the error messages into one, which is not
// a good practice also when there is nested of nested error it
// might fail, need to review more on this, check systemInfo.dto
// for nested of nested idea

const validationMiddleware = (
  type: any,
  value: string | "body" | "query" | "params" = "body",
  skipMissingProperties = false,
  whitelist = true,
  forbidNonWhitelisted = true,
): RequestHandler => {
  return (req, res, next) => {
    validate(plainToInstance(type, req[value]), {
      skipMissingProperties,
      whitelist,
      forbidNonWhitelisted,
    }).then((errors: ValidationError[]) => {
      if (errors.length > 0) {
        const message = errors
          .map((error: ValidationError) => {
            const errorStrings = [];
            if (error.constraints) {
              errorStrings.push(Object.values(error.constraints));
            }
            if (error.children?.length) {
              errorStrings.push(
                error.children.map((error: ValidationError) =>
                  Object.values(error.constraints),
                ),
              );
            }
            return errorStrings;
          })
          .join(", ");
        next(new HttpException(400, message));
      } else {
        next();
      }
    });
  };
};

export default validationMiddleware;
