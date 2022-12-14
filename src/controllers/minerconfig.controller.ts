import { NextFunction, Request, Response } from "express";

import MinerConfigDto from "@/dtos/minerconfig.dto";
import MinerConfigService from "@/services/minerconfig.service";

export default class MinerConfigController {
  public async createMinerConfig(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const minerConfigData: MinerConfigDto = req.body;
      await new MinerConfigService().createMinerConfig(minerConfigData);
      return res.status(201).json({ message: "created" });
    } catch (error) {
      next(error);
    }
  }
}
