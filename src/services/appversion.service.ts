import AppVersionDto from "@/dtos/appversion.dto";
import { HttpException } from "@/exceptions/HttpException";
import { IAppVersion } from "@/interfaces/appversion.interface";
import { IUserId } from "@/interfaces/userid.interface";
import appVersionModel from "@/models/appversion.model";
import userIdModel from "@/models/userid.model";
import { isEmpty } from "lodash";

export default class AppVersionService {
  public async addAppVersion(appVersionData: AppVersionDto) {
    if (isEmpty(appVersionData)) {
      throw new HttpException(400, "AppVersion is empty");
    }
    const userId: IUserId = await userIdModel.findOne({
      userId: appVersionData.userId,
    });
    if (!userId) throw new HttpException(400, "Invalid user id");
    const appVersion: IAppVersion = await appVersionModel.findOne({
      userId: appVersionData.userId,
    });
    if (appVersion) {
      if (appVersion.appVersions.indexOf(appVersionData.appVersion) === -1) {
        appVersion.appVersions.push(appVersionData.appVersion);
        await appVersionModel.updateOne(
          { userId: appVersionData.userId },
          { $set: { appVersions: appVersion.appVersions } },
        );
      }
    } else {
      await appVersionModel.create({
        userId: appVersionData.userId,
        appVersions: [appVersionData.appVersion],
      });
    }
  }
}
