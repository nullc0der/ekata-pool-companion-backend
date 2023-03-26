import CoinDataService from "@/services/coindata.service";
import { NextFunction, Request, Response } from "express";

export default class CoinDataController {
  public coinDataService = new CoinDataService();

  public getCoinDatas = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const {
        pageNumber,
        perPage,
        alphaSort,
        newestFirst,
        searchQuery,
        cpuMineable,
      } = req.query;
      const coinDatas = await this.coinDataService.getCoinDatas(
        parseInt(pageNumber as string),
        parseInt(perPage as string),
        alphaSort as string,
        newestFirst === "true",
        searchQuery as string,
        cpuMineable === "true",
      );
      return res.status(200).json({ results: coinDatas });
    } catch (error) {
      next(error);
    }
  };

  public getCoinData = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { id } = req.params;
      const coinData = await this.coinDataService.getCoinData(id);
      return res.status(200).json(coinData);
    } catch (error) {
      next(error);
    }
  };

  public createCoinData = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const coinDataCreated = await this.coinDataService.createCoinData(
        req.body,
      );
      return res.status(201).json(coinDataCreated);
    } catch (error) {
      next(error);
    }
  };

  public updateCoinData = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { id } = req.params;
      const coinDataUpdated = await this.coinDataService.updateCoinData(
        id,
        req.body,
      );
      return res.status(200).json(coinDataUpdated);
    } catch (error) {
      next(error);
    }
  };

  public deleteCoinData = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { id } = req.params;
      const coinDataDeleted = await this.coinDataService.deleteCoinData(id);
      return res.status(200).json({ deleted: coinDataDeleted });
    } catch (error) {
      next(error);
    }
  };

  public addPoolData = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { coinDataId } = req.params;
      const poolDataUpdated = await this.coinDataService.addPoolData(
        coinDataId,
        req.body,
      );
      return res.status(200).json(poolDataUpdated);
    } catch (error) {
      next(error);
    }
  };

  public updatePoolData = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { coinDataId, poolDataId } = req.params;
      const poolDataUpdated = await this.coinDataService.updatePoolData(
        coinDataId,
        poolDataId,
        req.body,
      );
      return res.status(200).json(poolDataUpdated);
    } catch (error) {
      next(error);
    }
  };

  public deletePoolData = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { coinDataId, poolDataId } = req.params;
      await this.coinDataService.deletePoolData(coinDataId, poolDataId);
      return res.status(200).json();
    } catch (error) {
      next(error);
    }
  };
}
