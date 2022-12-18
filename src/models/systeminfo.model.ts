import {
  ISystemInfo,
  IOsInfo,
  ICpuInfo,
  IGpuInfo,
  IIpInfo,
} from "@/interfaces/systeminfo.interface";
import { model, Schema } from "mongoose";

const osInfoSchema = new Schema<IOsInfo>({
  name: String,
  version: String,
  kernelVersion: String,
});

const cpuInfoSchema = new Schema<ICpuInfo>({
  vendor: String,
  name: String,
  socket: String,
  architecture: String,
});

const gpuInfoSchema = new Schema<IGpuInfo>({
  vendor: String,
  name: String,
});

const ipInfoSchema = new Schema<IIpInfo>({
  city: String,
  country: String,
});

const systemInfoSchema = new Schema<ISystemInfo>({
  platform: { type: String, required: true },
  userId: { type: String, required: true },
  osInfo: osInfoSchema,
  cpuInfos: [cpuInfoSchema],
  gpuInfo: gpuInfoSchema,
  totalPhysicalMemory: String,
  ipInfo: ipInfoSchema,
});

export default model<ISystemInfo>("SystemInfo", systemInfoSchema);
