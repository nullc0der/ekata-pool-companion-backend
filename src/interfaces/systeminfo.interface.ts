export interface IOsInfo {
  name?: string;
  version?: string;
  kernelVersion?: string;
}

export interface ICpuInfo {
  vendor?: string;
  name?: string;
  socket?: string;
  architecture?: string;
}

export interface IGpuInfo {
  vendor?: string;
  name?: string;
}

export interface IIpInfo {
  city?: string;
  country?: string;
}

export interface ISystemInfo {
  platform: string;
  userId: string;
  osInfo?: IOsInfo;
  cpuInfos?: ICpuInfo[];
  gpuInfo?: IGpuInfo;
  totalPhysicalMemory?: string;
  ipInfo?: IIpInfo;
}
