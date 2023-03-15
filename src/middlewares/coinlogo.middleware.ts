import { HttpException } from "@/exceptions/HttpException";
import { NextFunction, Request, Response } from "express";
import { isEmpty } from "lodash";

const coinLogoMiddleware = (req: Request, _: Response, next: NextFunction) => {
  const errorMessages = {};
  if (!req.body["coinName"])
    errorMessages["coinName"] = "Ensure coinName exist in formdata";
  if (!req.file)
    errorMessages["coinLogo"] = "Ensure coinLogo exist in formdata";
  if (!isEmpty(errorMessages)) {
    next(new HttpException(400, JSON.stringify(errorMessages)));
  } else {
    next();
  }
};

export default coinLogoMiddleware;
