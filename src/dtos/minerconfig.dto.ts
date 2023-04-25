import {
  IsBoolean,
  IsJSON,
  IsOptional,
  IsString,
  MinLength,
} from "class-validator";

export class MinerConfigQueryDto {
  @IsString()
  public userId: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  public queryString?: string;

  @IsOptional()
  @IsString()
  public fromDate?: string;

  @IsOptional()
  @IsString()
  public toDate?: string;
}

export class MinerConfigUpdateDto {
  @IsString()
  public userId: string;

  @IsJSON()
  public minerConfig: string;

  @IsString()
  public minerConfigMd5: string;
}

export class MinerConfigDeleteDto {
  @IsString()
  public userId: string;

  @IsString()
  public minerConfigMd5: string;
}

export default class MinerConfigDto {
  @IsString()
  public userId: string;

  @IsBoolean()
  public userUploaded: boolean;

  @IsJSON()
  public minerConfig: string;

  @IsOptional()
  @IsString()
  public minerBinary?: string;
}
