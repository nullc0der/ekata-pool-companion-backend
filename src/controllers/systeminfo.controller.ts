import SystemInfoDto from "@/dtos/systeminfo.dto";
import SystemInfoService from "@/services/systeminfo.service";
import { logger } from "@/utils/logger";
import { NextFunction, Request, Response } from "express";

export default class SystemInfoController {
  public async createSystemInfo(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const systemInfoData: SystemInfoDto = req.body;
      const userIpAddress = req.headers["x-real-ip"] as string;
      logger.info(`useripaddress: ${userIpAddress}`);
      logger.info(`headers`);
      Object.keys(req.headers).forEach((k) =>
        logger.info(`${k}:${req.headers[k]}`),
      );
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
