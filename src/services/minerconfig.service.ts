import { isEmpty } from "lodash";

import MinerConfigDto from "@/dtos/minerconfig.dto";
import { IMinerConfig } from "@/interfaces/minerconfig.interface";
import { HttpException } from "@/exceptions/HttpException";
import { IUserId } from "@/interfaces/userid.interface";
import userIdModel from "@/models/userid.model";
import minerConfigModel from "@/models/minerconfig.model";

export default class MinerConfigService {
  public async createMinerConfig(
    minerConfigData: MinerConfigDto,
  ): Promise<IMinerConfig> {
    if (isEmpty(minerConfigData))
      throw new HttpException(400, "MinerConfig is empty");
    const userId: IUserId = await userIdModel.findOne({
      userId: minerConfigData.userId,
    });
    if (!userId) throw new HttpException(400, "Invalid user id");
    try {
      JSON.parse(minerConfigData.minerConfig.trim());
    } catch (error) {
      if (error instanceof SyntaxError) {
        throw new HttpException(400, "Bad minerconfig data");
      }
    }
    const minerConfig = JSON.parse(minerConfigData.minerConfig.trim());
    if (
      !(await minerConfigModel.findOne({
        userId: minerConfigData.userId,
        minerConfig,
      }))
    ) {
      return await minerConfigModel.create({
        userId: minerConfigData.userId,
        minerConfig,
      });
    }
  }
}
