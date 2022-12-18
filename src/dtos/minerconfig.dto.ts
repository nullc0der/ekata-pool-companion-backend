import { IsJSON, IsString } from "class-validator";

export default class MinerConfigDto {
  @IsString()
  public userId: string;

  @IsJSON()
  public minerConfig: string;
}
