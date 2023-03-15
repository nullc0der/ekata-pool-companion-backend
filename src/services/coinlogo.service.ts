import { SITE_URL } from "@/config";
import { HttpException } from "@/exceptions/HttpException";
import { ICoinLogo } from "@/interfaces/coinlogo.interface";

import coinLogoModel from "@/models/coinlogo.model";
import { unlink } from "fs";

export default class CoinLogoService {
  public async createCoinLogo(
    coinName: string,
    coinLogoFile: Express.Multer.File,
  ): Promise<ICoinLogo> {
    const coinLogo: ICoinLogo = await coinLogoModel.create({
      coinName: coinName,
      logoPath: coinLogoFile.path,
      logoUrl: `${SITE_URL}/${coinLogoFile.path}`,
    });

    return coinLogo;
  }

  public async getCoinLogos(): Promise<ICoinLogo[]> {
    return await coinLogoModel.find({});
  }

  public async getCoinLogo(logoId: string): Promise<ICoinLogo> {
    return await coinLogoModel.findById(logoId);
  }

  public async deleteCoinLogo(logoId: string): Promise<boolean> {
    const coinLogo: ICoinLogo = await coinLogoModel.findOneAndDelete({
      _id: logoId,
    });
    if (coinLogo) {
      unlink(coinLogo.logoPath, (err) => {
        if (err)
          throw new HttpException(
            500,
            `Couldn't delete the logo from disk, ErrorMessage:${err.message}`,
          );
      });
      return true;
    }
    return false;
  }
}
