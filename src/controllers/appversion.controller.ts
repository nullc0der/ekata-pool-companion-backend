import AppVersionDto from "@/dtos/appversion.dto";
import AppVersionService from "@/services/appversion.service";
import { NextFunction, Request, Response } from "express";

export default class AppVersionController {
  public async addAppVersion(req: Request, res: Response, next: NextFunction) {
    try {
      const appVersionData: AppVersionDto = req.body;
      await new AppVersionService().addAppVersion(appVersionData);
      return res.status(201).json({ message: "created" });
    } catch (error) {
      next(error);
    }
  }
}
