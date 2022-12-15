import { model, Schema } from "mongoose";

import { IMinerConfig } from "@/interfaces/minerconfig.interface";

const minerConfigSchema: Schema = new Schema({
  userId: { type: String, required: true },
  minerConfig: { type: Object, required: true },
});

export default model<IMinerConfig>("MinerConfig", minerConfigSchema);
