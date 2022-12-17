import { Type } from "class-transformer";
import { IsOptional, IsString, ValidateNested } from "class-validator";

class OsInfo {
  @IsOptional()
  @IsString()
  public name?: string;

  @IsOptional()
  @IsString()
  public version?: string;

  @IsOptional()
  @IsString()
  public kernelVersion?: string;
}

class CpuInfo {
  @IsOptional()
  @IsString()
  public vendor?: string;

  @IsOptional()
  @IsString()
  public name?: string;

  @IsOptional()
  @IsString()
  public socket?: string;

  @IsOptional()
  @IsString()
  public architecture?: string;
}

class GpuInfo {
  @IsOptional()
  @IsString()
  public vendor?: string;

  @IsOptional()
  @IsString()
  public name?: string;
}

class SystemInfoDto {
  @IsString()
  public platform: string;

  @IsString()
  public userId: string;

  @ValidateNested()
  @Type(() => OsInfo)
  public osInfo?: OsInfo;

  @ValidateNested()
  @Type(() => CpuInfo)
  public cpuInfos?: CpuInfo[];

  @ValidateNested()
  @Type(() => GpuInfo)
  public gpuInfo?: GpuInfo;

  @IsOptional()
  @IsString()
  public totalPhysicalMemory?: string;
}

export default SystemInfoDto;
