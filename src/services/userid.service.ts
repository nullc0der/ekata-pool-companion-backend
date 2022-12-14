import { IUserId } from "@/interfaces/userid.interface";
import userIdModel from "@/models/userid.model";
import { getUniqueUserId } from "@/utils/util";

class UserIdService {
  public async createUserId(): Promise<IUserId> {
    const userId = await getUniqueUserId();
    return await userIdModel.create({ userId });
  }
}

export default UserIdService;
