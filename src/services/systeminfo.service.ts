import { isEmpty } from "lodash";
import SystemInfoDto from "@/dtos/systeminfo.dto";
import { HttpException } from "@/exceptions/HttpException";
import { ISystemInfo } from "@/interfaces/systeminfo.interface";
import userIdModel from "@/models/userid.model";
import systemInfoModel from "@/models/systeminfo.model";
import { IUserId } from "@/interfaces/userid.interface";

export default class SystemInfoService {
  public async createSystemInfo(
    systemInfoData: SystemInfoDto,
  ): Promise<ISystemInfo> {
    if (isEmpty(systemInfoData))
      throw new HttpException(400, "SystemInfo is empty");
    const userId: IUserId = await userIdModel.findOne({
      userId: systemInfoData.userId,
    });
    if (!userId) throw new HttpException(400, "Invalid user id");
    if (!(await systemInfoModel.findOne({ userId: systemInfoData.userId }))) {
      return await systemInfoModel.create(systemInfoData);
    }
  }
}
