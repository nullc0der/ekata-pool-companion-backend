import AppVersionController from "@/controllers/appversion.controller";
import AppVersionDto from "@/dtos/appversion.dto";
import { Routes } from "@/interfaces/routes.interface";
import validationMiddleware from "@/middlewares/validation.middleware";
import { Router } from "express";

export default class AppVersionRoute implements Routes {
  public path = "/appversion";
  public router = Router();
  public appVersionController = new AppVersionController();

  constructor() {
    this.initializeRoute();
  }

  private initializeRoute() {
    this.router.post(
      this.path,
      validationMiddleware(AppVersionDto, "body"),
      this.appVersionController.addAppVersion,
    );
  }
}
