import MinerConfigController from "@/controllers/minerconfig.controller";
import MinerConfigDto from "@/dtos/minerconfig.dto";
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

  private initializeRoutes() {
    this.router.post(
      this.path,
      validationMiddleware(MinerConfigDto, "body"),
      this.minerConfigController.createMinerConfig,
    );
  }
}
