import App from "@/app";
import validateEnv from "@utils/validateEnv";
import MinerConfigRoute from "@routes/minerconfig.routes";
import UserIdRoute from "@routes/userid.route";
import SystemInfoRoute from "@routes/systeminfo.routes";
import AppVersionRoute from "@/routes/appversion.routes";
import CoinLogoRoute from "./routes/coinlogo.routes";
import CoinDataRoute from "./routes/coindata.routes";

// TODO: Sentry should be tested once sentry removes the monthly cap

validateEnv();

const app = new App([
  new UserIdRoute(),
  new MinerConfigRoute(),
  new SystemInfoRoute(),
  new AppVersionRoute(),
  new CoinLogoRoute(),
  new CoinDataRoute(),
]);

app.listen();
