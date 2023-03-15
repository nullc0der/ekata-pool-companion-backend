import CoinLogoController from "@/controllers/coinlogo.controller";
import { Routes } from "@/interfaces/routes.interface";
import authMiddleware from "@/middlewares/auth.middleware";
import coinLogoMiddleware from "@/middlewares/coinlogo.middleware";
import { Router } from "express";
import multer from "multer";

export default class CoinLogoRoute implements Routes {
  public path = "/coinlogo";
  public router = Router();
  public coinLogoController = new CoinLogoController();
  public multerMiddleWare = multer({
    storage: multer.diskStorage({
      destination: "media/coinlogos",
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        callback(
          null,
          `${file.fieldname}-${uniqueSuffix}.${file.mimetype.split("/")[1]}`,
        );
      },
    }),
    fileFilter: (req, file, cb) => {
      if (
        file.mimetype == "image/png" ||
        file.mimetype == "image/jpg" ||
        file.mimetype == "image/jpeg"
      ) {
        cb(null, true);
      } else {
        cb(
          new Error(
            JSON.stringify({
              coinLogo: "Only .png, .jpg and .jpeg format allowed!",
            }),
          ),
        );
      }
    },
  });

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      this.path,
      authMiddleware("apiKey"),
      this.coinLogoController.getCoinLogos,
    );
    this.router.get(
      `${this.path}/:logoId`,
      authMiddleware("apiKey"),
      this.coinLogoController.getCoinLogo,
    );
    this.router.post(
      this.path,
      authMiddleware("apiKey"),
      this.multerMiddleWare.single("coinLogo"),
      coinLogoMiddleware,
      this.coinLogoController.createCoinLogo,
    );
    this.router.delete(
      `${this.path}/:logoId`,
      authMiddleware("apiKey"),
      this.coinLogoController.deleteCoinLogo,
    );
  }
}
