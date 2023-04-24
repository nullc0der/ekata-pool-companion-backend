import { HttpException } from "@/exceptions/HttpException";
import { ICoinData, IPool } from "@/interfaces/coindata.interface";
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
    cpuMineable: boolean,
  ): Promise<ICoinData[]> {
    const queries = {};
    if (!!searchQuery) {
      queries["coinName"] = {
        $regex: searchQuery,
        $options: "i",
      };
    }
    if (cpuMineable) {
      queries["cpuMineable"] = true;
    }
    // TODO: Alphasort and newestfirst both doesn't
    // work simultaneously
    return await coindataModel
      .find(queries)
      .skip(perPage * pageNumber)
      .limit(perPage)
      .collation({ locale: "en", caseLevel: true })
      .sort({
        coinName: alphaSort === "asc" ? 1 : -1,
        _id: newestFirst ? -1 : 1,
      });
  }

  public async createCoinData(coinData: object): Promise<ICoinData> {
    if (isEmpty(coinData)) {
      throw new HttpException(400, "CoinData is empty");
    }
    const coinDataDb: ICoinData = await coindataModel.findOne({
      coinName: coinData["coinName"],
    });
    if (!isEmpty(coinDataDb))
      throw new HttpException(
        400,
        `coinData for ${coinData["coinName"]} exist`,
      );
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

  public async addPoolData(
    coinDataId: string,
    pools: IPool[],
  ): Promise<IPool[]> {
    const coinData = await coindataModel.findOne({
      _id: coinDataId,
    });
    if (isEmpty(coinData)) {
      throw new HttpException(404, "CoinData not found");
    }
    coinData.pools.push(...pools);
    await coinData.save();
    return coinData.pools;
  }

  public async updatePoolData(
    coinDataId: string,
    poolDataId: string,
    poolData: IPool,
  ): Promise<IPool[]> {
    const coinData = await coindataModel.findOne({
      _id: coinDataId,
    });
    if (isEmpty(coinData)) {
      throw new HttpException(404, "CoinData not found");
    }
    const poolsInDb = coinData.pools.filter(
      (pool) => pool._id.toString() === poolDataId,
    );
    if (isEmpty(poolsInDb)) {
      throw new HttpException(404, "pool not found");
    }
    coinData.pools = coinData.pools.map((pool) =>
      pool._id.toString() === poolDataId ? { ...pool, ...poolData } : pool,
    );
    await coinData.save();
    return coinData.pools;
  }

  public async deletePoolData(
    coinDataId: string,
    poolDataId: string,
  ): Promise<boolean> {
    const coinData = await coindataModel.findOne({
      _id: coinDataId,
    });
    if (isEmpty(coinData)) {
      throw new HttpException(404, "CoinData not found");
    }
    const pools = coinData.pools.filter(
      (pool) => pool._id.toString() === poolDataId,
    );
    if (isEmpty(pools)) {
      throw new HttpException(404, "pool not found");
    }
    coinData.pools = coinData.pools.filter(
      (pool) => pool._id.toString() !== poolDataId,
    );
    await coinData.save();
    return true;
  }
}
