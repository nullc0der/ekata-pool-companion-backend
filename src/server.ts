import App from "@/app";
import validateEnv from "@utils/validateEnv";
import MinerConfigRoute from "@routes/minerconfig.routes";
import UserIdRoute from "@routes/userid.route";

// TODO: Sentry should be tested once sentry removes the monthly cap

validateEnv();

const app = new App([new UserIdRoute(), new MinerConfigRoute()]);

app.listen();
