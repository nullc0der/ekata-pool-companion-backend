import { IsString } from "class-validator";

export default class AppVersionDto {
  @IsString()
  public userId: string;

  @IsString()
  public appVersion: string;
}
