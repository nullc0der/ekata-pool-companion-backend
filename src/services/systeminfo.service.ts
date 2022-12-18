import { isEmpty } from "lodash";
import maxmind, { CityResponse } from "maxmind";
import SystemInfoDto from "@/dtos/systeminfo.dto";
import { HttpException } from "@/exceptions/HttpException";
import { ISystemInfo } from "@/interfaces/systeminfo.interface";
import userIdModel from "@/models/userid.model";
import systemInfoModel from "@/models/systeminfo.model";
import { IUserId } from "@/interfaces/userid.interface";
import { NODE_ENV } from "@/config";
import { logger } from "@/utils/logger";

export default class SystemInfoService {
  public async createSystemInfo(
    systemInfoData: SystemInfoDto,
    userIpAddress?: string,
  ): Promise<ISystemInfo> {
    if (isEmpty(systemInfoData))
      throw new HttpException(400, "SystemInfo is empty");
    const userId: IUserId = await userIdModel.findOne({
      userId: systemInfoData.userId,
    });
    if (!userId) throw new HttpException(400, "Invalid user id");
    if (!(await systemInfoModel.findOne({ userId: systemInfoData.userId }))) {
      if (NODE_ENV === "production" && userIpAddress) {
        const baseDir = __dirname.split("/");
        baseDir.pop();
        const reader = await maxmind.open<CityResponse>(
          `${baseDir.join("/")}/geoip2/GeoLite2-City.mmdb`,
        );
        const lookup = reader.get(userIpAddress);
        logger.info(`lookup: ${lookup}`);
        return await systemInfoModel.create({
          ...systemInfoData,
          ipInfo: {
            city: lookup.city.names.en,
            country: lookup.country.names.en,
          },
        });
      }
      return await systemInfoModel.create(systemInfoData);
    }
  }
}
