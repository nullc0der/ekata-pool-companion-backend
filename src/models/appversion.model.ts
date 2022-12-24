import { IAppVersion } from "@/interfaces/appversion.interface";
import { model, Schema } from "mongoose";

const appVersionSchema: Schema = new Schema({
  userId: { type: String, required: true },
  appVersions: { type: [String], required: true },
});

export default model<IAppVersion>("AppVersion", appVersionSchema);
