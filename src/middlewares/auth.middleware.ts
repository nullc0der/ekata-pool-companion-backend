// TODO: Bring userId validation here

import { INTERNAL_API_KEY } from "@/config";
import { HttpException } from "@/exceptions/HttpException";
import { NextFunction, Request, RequestHandler, Response } from "express";
import { isEmpty } from "lodash";

const authMiddleware =
  (authType: "apiKey" | "userId"): RequestHandler =>
  (req: Request, _: Response, next: NextFunction) => {
    const errorMessages = {};
    if (authType === "apiKey") {
      const apiKey = req.headers["x-api-key"];
      if (!apiKey)
        errorMessages["apiKey"] = "Ensure X-API-KEY header exist and not empty";
      if (apiKey && apiKey !== INTERNAL_API_KEY)
        errorMessages["apiKey"] = "Invalid API key";
    }
    if (!isEmpty(errorMessages)) {
      next(new HttpException(400, JSON.stringify(errorMessages)));
    } else {
      next();
    }
  };

export default authMiddleware;
