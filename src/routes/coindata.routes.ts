import CoinDataController from "@/controllers/coindata.controller";
import { Routes } from "@/interfaces/routes.interface";
import authMiddleware from "@/middlewares/auth.middleware";
import coinDataSchema, { coinDataGetSchema } from "@/schemas/coindata.schema";
import { Router } from "express";
import { Validator } from "express-json-validator-middleware";
import addFormats from "ajv-formats";

export default class CoinDataRoute implements Routes {
  public path = "/coindata";
  public router = Router();
  public coinDataController = new CoinDataController();
  public schemaValidator = new Validator({});

  constructor() {
    addFormats(this.schemaValidator.ajv);
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      this.path,
      this.schemaValidator.validate({ query: coinDataGetSchema }),
      this.coinDataController.getCoinDatas,
    );
    this.router.get(`${this.path}/:id`, this.coinDataController.getCoinData);
    this.router.post(
      this.path,
      authMiddleware("apiKey"),
      this.schemaValidator.validate({ body: coinDataSchema }),
      this.coinDataController.createCoinData,
    );
    this.router.put(
      `${this.path}/:id`,
      authMiddleware("apiKey"),
      this.schemaValidator.validate({ body: coinDataSchema }),
      this.coinDataController.updateCoinData,
    );
    this.router.delete(
      `${this.path}/:id`,
      authMiddleware("apiKey"),
      this.coinDataController.deleteCoinData,
    );
  }
}
