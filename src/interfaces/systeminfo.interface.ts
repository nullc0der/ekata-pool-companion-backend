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

export interface ISystemInfo {
  platform: string;
  userId: string;
  osInfo?: IOsInfo;
  cpuInfo?: ICpuInfo[];
  gpuInfo?: IGpuInfo;
  totalPhysicalMemory?: string;
}
