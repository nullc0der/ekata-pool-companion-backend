import SystemInfoDto from "@/dtos/systeminfo.dto";
import SystemInfoService from "@/services/systeminfo.service";
import { NextFunction, Request, Response } from "express";

export default class SystemInfoController {
  public async createSystemInfo(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const systemInfoData: SystemInfoDto = req.body;
      const userIpAddress = req.headers["cf-connecting-ip"] as string;
      await new SystemInfoService().createSystemInfo(
        systemInfoData,
        userIpAddress,
      );
      return res.status(201).json({ message: "created" });
    } catch (error) {
      next(error);
    }
  }
}
