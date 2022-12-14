import { NextFunction, Request, Response } from "express";

import UserIdService from "@/services/userid.service";

class UserIdController {
  public userIdService = new UserIdService();

  public createUserId = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const userId = await this.userIdService.createUserId();
      return res
        .status(201)
        .json({ data: { userId: userId.userId }, message: "created" });
    } catch (error) {
      next(error);
    }
  };
}

export default UserIdController;
