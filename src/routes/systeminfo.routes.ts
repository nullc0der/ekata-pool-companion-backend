import SystemInfoController from "@/controllers/systeminfo.controller";
import SystemInfoDto from "@/dtos/systeminfo.dto";
import { Routes } from "@/interfaces/routes.interface";
import validationMiddleware from "@/middlewares/validation.middleware";
import { Router } from "express";

export default class SystemInfoRoute implements Routes {
  public path = "/systeminfo";
  public router = Router();
  public systemInfoController = new SystemInfoController();

  constructor() {
    this.initializeRoute();
  }

  private initializeRoute() {
    this.router.post(
      this.path,
      validationMiddleware(SystemInfoDto, "body"),
      this.systemInfoController.createSystemInfo,
    );
  }
}
