import CoinLogoService from "@/services/coinlogo.service";
import { NextFunction, Request, Response } from "express";

export default class CoinLogoController {
  public coinLogoService = new CoinLogoService();

  public createCoinLogo = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { coinName } = req.body;
      const coinLogo = await this.coinLogoService.createCoinLogo(
        coinName,
        req.file,
      );
      return res.status(201).json(coinLogo);
    } catch (error) {
      next(error);
    }
  };

  public getCoinLogos = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const coinLogos = await this.coinLogoService.getCoinLogos();
      return res.status(200).json({ results: coinLogos });
    } catch (error) {
      next(error);
    }
  };

  public getCoinLogo = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const coinLogo = await this.coinLogoService.getCoinLogo(
        req.params["logoId"],
      );
      if (coinLogo) {
        return res.status(200).json(coinLogo);
      } else {
        return res.status(404).json({ message: "not found" });
      }
    } catch (error) {
      next(error);
    }
  };

  public deleteCoinLogo = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const coinLogoDeleted = await this.coinLogoService.deleteCoinLogo(
        req.params["logoId"],
      );
      return res.status(200).json({ deleted: coinLogoDeleted });
    } catch (error) {
      next(error);
    }
  };
}
