import App from "@/app";
import validateEnv from "@utils/validateEnv";
import MinerConfigRoute from "@routes/minerconfig.routes";
import UserIdRoute from "@routes/userid.route";

validateEnv();

const app = new App([new UserIdRoute(), new MinerConfigRoute()]);

app.listen();
