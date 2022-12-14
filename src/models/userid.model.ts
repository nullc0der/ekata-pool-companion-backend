import { model, Schema } from "mongoose";

import { IUserId } from "@/interfaces/userid.interface";

const userIdSchema: Schema = new Schema<IUserId>({
  userId: { type: String, required: true, unique: true },
});

export default model<IUserId>("UserId", userIdSchema);
