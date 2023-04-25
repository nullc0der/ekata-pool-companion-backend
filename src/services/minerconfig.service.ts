import { isEmpty } from "lodash";
import { ObjectID } from "bson";
import { createHash } from "crypto";

import MinerConfigDto, {
  MinerConfigDeleteDto,
  MinerConfigQueryDto,
  MinerConfigUpdateDto,
} from "@/dtos/minerconfig.dto";
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
    const minerConfigJSON = JSON.parse(minerConfigData.minerConfig.trim());
    const minerConfigMd5 = createHash("md5")
      .update(minerConfigData.minerConfig.trim(), "utf-8")
      .digest("hex");
    const minerConfig: IMinerConfig = await minerConfigModel.findOne({
      userId: minerConfigData.userId,
      minerConfig: minerConfigJSON,
      userUploaded: minerConfigData.userUploaded,
      minerBinary: minerConfigData.minerBinary,
      minerConfigMd5,
    });
    if (!minerConfig) {
      return await minerConfigModel.create({
        userId: minerConfigData.userId,
        minerConfig: minerConfigJSON,
        userUploaded: minerConfigData.userUploaded,
        minerBinary: minerConfigData.minerBinary,
        minerConfigMd5,
      });
    } else {
      return minerConfig;
    }
  }

  public async updateMinerConfig(
    minerConfigUpdateData: MinerConfigUpdateDto,
  ): Promise<IMinerConfig> {
    if (isEmpty(minerConfigUpdateData))
      throw new HttpException(400, "MinerConfig is empty");
    const userId: IUserId = await userIdModel.findOne({
      userId: minerConfigUpdateData.userId,
    });
    if (!userId) throw new HttpException(400, "Invalid user id");
    const minerConfig = await minerConfigModel.findOne({
      userId: minerConfigUpdateData.userId,
      minerConfigMd5: minerConfigUpdateData.minerConfigMd5,
      userUploaded: true,
    });
    if (!minerConfig) throw new HttpException(400, "MinerConfig not found");
    await minerConfigModel.updateOne(
      {
        userId: minerConfigUpdateData.userId,
        minerConfigMd5: minerConfigUpdateData.minerConfigMd5,
        userUploaded: true,
      },
      {
        $set: {
          minerConfig: JSON.parse(minerConfigUpdateData.minerConfig.trim()),
          minerConfigMd5: createHash("md5")
            .update(minerConfigUpdateData.minerConfig.trim(), "utf-8")
            .digest("hex"),
        },
      },
    );
    return await minerConfigModel.findById(minerConfig._id);
  }

  public async deleteMinerConfig(
    minerConfigDeleteData: MinerConfigDeleteDto,
  ): Promise<boolean> {
    const userId: IUserId = await userIdModel.findOne({
      userId: minerConfigDeleteData.userId,
    });
    if (!userId) throw new HttpException(400, "Invalid user id");
    const result = await minerConfigModel.deleteOne({
      userId: minerConfigDeleteData.userId,
      minerConfigMd5: minerConfigDeleteData.minerConfigMd5,
    });
    return result.deletedCount > 0;
  }

  public async getUserUploadedMinerConfigs(
    minerConfigQueryData: MinerConfigQueryDto,
  ): Promise<object[]> {
    // TODO: Add userid validation in middleware and move to header
    const userId: IUserId = await userIdModel.findOne({
      userId: minerConfigQueryData.userId,
    });
    if (!userId) throw new HttpException(400, "Invalid user id");
    const query = {
      userId: minerConfigQueryData.userId,
      userUploaded: true,
    };
    if (minerConfigQueryData.queryString) {
      query["$text"] = { $search: minerConfigQueryData.queryString };
    }
    if (minerConfigQueryData.fromDate && minerConfigQueryData.toDate) {
      query["_id"] = {
        $gte: ObjectID.createFromTime(
          Number(minerConfigQueryData.fromDate) / 1000,
        ),
        $lte: ObjectID.createFromTime(
          Number(minerConfigQueryData.toDate) / 1000,
        ),
      };
    }
    const minerConfigs = await minerConfigModel.find(query);
    return minerConfigs.map((x) => ({
      minerConfig: x.minerConfig,
      timeStamp: x._id.getTimestamp().getTime(),
      minerConfigMd5: x.minerConfigMd5,
      minerBinary: x.minerBinary,
    }));
  }
}
