import { ICoinLogo } from "@/interfaces/coinlogo.interface";
import { model, Schema } from "mongoose";

const coinLogoSchema: Schema = new Schema({
  logoUrl: { type: String, required: true },
  logoPath: { type: String, required: true },
  coinName: { type: String, required: true },
});

export default model<ICoinLogo>("CoinLogo", coinLogoSchema);
