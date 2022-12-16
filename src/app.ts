import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import hpp from "hpp";
import morgan from "morgan";
import * as Sentry from "@sentry/node";
import { connect, set } from "mongoose";
import {
  NODE_ENV,
  PORT,
  LOG_FORMAT,
  ORIGIN,
  CREDENTIALS,
  SENTRY_DSN,
} from "@config";
import { dbConnection } from "@databases";
import { Routes } from "@interfaces/routes.interface";
import errorMiddleware from "@middlewares/error.middleware";
import { logger, stream } from "@utils/logger";

class App {
  public app: express.Application;
  public env: string;
  public port: string | number;

  constructor(routes: Routes[]) {
    this.app = express();
    this.env = NODE_ENV || "development";
    this.port = PORT || 3000;

    if (NODE_ENV === "production") {
      this.initializeSentry();
    }
    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`=================================`);
      logger.info(`======= ENV: ${this.env} =======`);
      logger.info(`🚀 App listening on the port ${this.port}`);
      logger.info(`=================================`);
    });
  }

  public getServer() {
    return this.app;
  }

  private initializeSentry() {
    Sentry.init({ dsn: SENTRY_DSN });
  }

  private connectToDatabase() {
    if (this.env !== "production") {
      set("debug", true);
    }

    connect(dbConnection.url);
  }

  private initializeMiddlewares() {
    if (NODE_ENV === "production") {
      this.app.use(Sentry.Handlers.requestHandler() as express.RequestHandler);
    }
    this.app.use(morgan(LOG_FORMAT, { stream }));
    this.app.use(cors({ origin: ORIGIN, credentials: CREDENTIALS }));
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach((route) => {
      this.app.use("/api/v1", route.router);
    });
  }

  private initializeErrorHandling() {
    if (NODE_ENV === "production") {
      this.app.use(
        Sentry.Handlers.errorHandler() as express.ErrorRequestHandler,
      );
    }
    this.app.use(errorMiddleware);
  }
}

export default App;
