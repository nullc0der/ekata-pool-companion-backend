import { NextFunction, Request, Response } from "express";
import { isEmpty } from "lodash";

const coinLogoMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errorMessages = {};
  if (!req.body["coinName"])
    errorMessages["coinName"] = "Ensure coinName exist in formdata";
  if (!req.file)
    errorMessages["coinLogo"] = "Ensure coinLogo exist in formdata";
  if (!isEmpty(errorMessages)) {
    res.status(400).json({ error: errorMessages });
  } else {
    next();
  }
};

export default coinLogoMiddleware;
