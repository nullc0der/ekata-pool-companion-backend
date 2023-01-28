import MinerConfigController from "@/controllers/minerconfig.controller";
import MinerConfigDto, {
  MinerConfigDeleteDto,
  MinerConfigQueryDto,
  MinerConfigUpdateDto,
} from "@/dtos/minerconfig.dto";
import { Routes } from "@/interfaces/routes.interface";
import validationMiddleware from "@/middlewares/validation.middleware";
import { Router } from "express";

export default class MinerConfigRoute implements Routes {
  public path = "/minerconfig";
  public router = Router();
  public minerConfigController = new MinerConfigController();

  constructor() {
    this.initializeRoutes();
  }

  // TODO: Check what if this function is arrow, is 'this' preserved to enclosing object?
  private initializeRoutes() {
    this.router.post(
      this.path,
      validationMiddleware(MinerConfigDto, "body"),
      this.minerConfigController.createMinerConfig,
    );
    this.router.get(
      this.path,
      validationMiddleware(MinerConfigQueryDto, "query"),
      this.minerConfigController.getUserUploadedMinerConfig,
    );
    this.router.put(
      this.path,
      validationMiddleware(MinerConfigUpdateDto, "body"),
      this.minerConfigController.updateMinerConfig,
    );
    this.router.delete(
      this.path,
      validationMiddleware(MinerConfigDeleteDto, "query"),
      this.minerConfigController.deleteMinerConfig,
    );
  }
}
