import { IsString } from "class-validator";

export default class MinerConfigDto {
  @IsString()
  public userId: string;

  // TODO: this can be a JSON validation
  @IsString()
  public minerConfig: string;
}
