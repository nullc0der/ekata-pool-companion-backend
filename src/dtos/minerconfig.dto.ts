import { IsString } from "class-validator";

export default class MinerConfigDto {
  @IsString()
  public userId: string;

  @IsString()
  public minerConfig: string;
}
