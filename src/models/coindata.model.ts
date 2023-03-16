import { ICoinData, IPool } from "@/interfaces/coindata.interface";
import { model, Schema } from "mongoose";

const poolSchema: Schema = new Schema<IPool>({
  poolName: { type: String, required: true },
  region: { type: String, required: true },
  urls: {
    type: [String],
    validate: (v) => Array.isArray(v) && v.length > 0,
  },
  ports: {
    type: [String],
    validate: (v) => Array.isArray(v) && v.length > 0,
  },
});

const coinDataSchema: Schema = new Schema<ICoinData>({
  coinName: { type: String, required: true },
  coinLogoUrl: { type: String, required: true },
  coinAlgo: { type: String, required: true },
  cpuMineable: { type: Boolean, required: true },
  supportedMiningEngines: {
    type: [String],
    validate: (v) => Array.isArray(v) && v.length > 0,
  },
  pools: [poolSchema],
});

export default model<ICoinData>("CoinData", coinDataSchema);
