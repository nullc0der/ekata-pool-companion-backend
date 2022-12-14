import { Router } from "express";

import { Routes } from "@/interfaces/routes.interface";
import UserIdController from "@/controllers/userid.controller";

class UserIdRoute implements Routes {
  public path = "/userid";
  public router = Router();
  public userIdController = new UserIdController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(this.path, this.userIdController.createUserId);
  }
}

export default UserIdRoute;
