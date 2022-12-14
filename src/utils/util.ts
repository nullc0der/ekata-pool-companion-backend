import crypto from "crypto";

import userIdModel from "@/models/userid.model";

export async function getUniqueUserId(): Promise<string> {
  const id = crypto.randomBytes(12).toString("hex");
  const userId = await userIdModel.findOne({ userId: id });
  if (!userId) {
    return id;
  }
  return await getUniqueUserId();
}
