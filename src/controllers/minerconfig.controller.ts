import { NextFunction, Request, Response } from "express";

import MinerConfigDto, {
  MinerConfigDeleteDto,
  MinerConfigQueryDto,
  MinerConfigUpdateDto,
} from "@/dtos/minerconfig.dto";
import MinerConfigService from "@/services/minerconfig.service";
import { plainToInstance } from "class-transformer";

export default class MinerConfigController {
  public minerConfigService = new MinerConfigService();

  public createMinerConfig = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const minerConfigData: MinerConfigDto = req.body;
      const minerConfig = await this.minerConfigService.createMinerConfig(
        minerConfigData,
      );
      return res
        .status(201)
        .json({ minerConfigMd5: minerConfig.minerConfigMd5 });
    } catch (error) {
      next(error);
    }
  };

  public getUserUploadedMinerConfig = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const minerConfigQueryData: MinerConfigQueryDto = plainToInstance(
        MinerConfigQueryDto,
        req.query,
      );
      const minerConfigs =
        await this.minerConfigService.getUserUploadedMinerConfigs(
          minerConfigQueryData,
        );
      return res.status(200).json(minerConfigs);
    } catch (error) {
      next(error);
    }
  };

  public updateMinerConfig = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const minerConfigUpdateData: MinerConfigUpdateDto = req.body;
      const minerConfig = await this.minerConfigService.updateMinerConfig(
        minerConfigUpdateData,
      );
      return res
        .status(200)
        .json({ minerConfigMd5: minerConfig.minerConfigMd5 });
    } catch (error) {
      next(error);
    }
  };

  public deleteMinerConfig = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const minerConfigDeleteData: MinerConfigDeleteDto = plainToInstance(
        MinerConfigDeleteDto,
        req.query,
      );
      return res.status(200).json({
        deleted: await this.minerConfigService.deleteMinerConfig(
          minerConfigDeleteData,
        ),
      });
    } catch (error) {
      next(error);
    }
  };
}
