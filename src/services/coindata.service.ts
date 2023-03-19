import { HttpException } from "@/exceptions/HttpException";
import { ICoinData } from "@/interfaces/coindata.interface";
import coindataModel from "@/models/coindata.model";
import { isEmpty } from "lodash";

export default class CoinDataService {
  public async getCoinData(coinDataId: string): Promise<ICoinData> {
    const coinData = await coindataModel.findById(coinDataId);
    if (!coinData) {
      throw new HttpException(404, "CoinData not found");
    }
    return coinData;
  }

  public async getCoinDatas(
    pageNumber: number,
    perPage: number,
    alphaSort: string,
    newestFirst: boolean,
    searchQuery: string,
  ): Promise<ICoinData[]> {
    const queries = {
      supportedMiningEngines: "xmrig",
    };
    if (searchQuery && searchQuery.length) {
      queries["coinName"] = {
        $regex: searchQuery,
        $options: "i",
      };
    }
    return await coindataModel
      .find(queries)
      .skip(perPage * pageNumber)
      .limit(perPage)
      .collation({ locale: "en" })
      .sort({ _id: newestFirst ? -1 : 1 })
      .sort({ coinName: alphaSort === "asc" ? -1 : 1 });
  }

  public async createCoinData(coinData: object): Promise<ICoinData> {
    if (isEmpty(coinData)) {
      throw new HttpException(400, "CoinData is empty");
    }
    return await coindataModel.create(coinData);
  }

  public async updateCoinData(
    coinDataId: string,
    coinData: object,
  ): Promise<ICoinData> {
    if (isEmpty(coinData)) {
      throw new HttpException(400, "CoinData is empty");
    }
    const updatedCoinData = await coindataModel.findOneAndUpdate(
      { _id: coinDataId },
      coinData,
      {
        returnDocument: "after",
      },
    );
    if (!updatedCoinData) {
      throw new HttpException(404, "CoinData not found");
    }
    return updatedCoinData;
  }

  public async deleteCoinData(coinDataId: string): Promise<boolean> {
    const coinData: ICoinData = await coindataModel.findOneAndDelete({
      _id: coinDataId,
    });
    if (coinData) {
      return true;
    }
    return false;
  }
}
