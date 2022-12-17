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
      await new SystemInfoService().createSystemInfo(systemInfoData);
      return res.status(201).json({ message: "created" });
    } catch (error) {
      next(error);
    }
  }
}
