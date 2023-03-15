import { ObjectId } from "mongoose";

export interface ICoinLogo {
  _id: ObjectId;
  logoUrl: string;
  logoPath: string;
  coinName: string;
}
