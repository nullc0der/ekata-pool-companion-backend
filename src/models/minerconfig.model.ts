import { model, Schema } from "mongoose";

import { IMinerConfig } from "@/interfaces/minerconfig.interface";

const minerConfigSchema: Schema = new Schema({
  userId: { type: String, required: true },
  userUploaded: { type: Boolean, required: true },
  minerConfig: { type: Object, required: true },
  minerConfigMd5: { type: String, required: true },
});

minerConfigSchema.index({
  "minerConfig.pools.url": "text",
  "minerConfig.pools.algo": "text",
});

export default model<IMinerConfig>("MinerConfig", minerConfigSchema);
