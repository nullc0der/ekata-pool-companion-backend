import { config } from "dotenv";
config({ path: `.env.${process.env.NODE_ENV || "development"}.local` });

export const CREDENTIALS = process.env.CREDENTIALS === "true";
export const {
  NODE_ENV,
  PORT,
  DB_HOST,
  DB_DATABASE,
  DB_USERNAME,
  DB_PASSWORD,
  LOG_FORMAT,
  LOG_DIR,
  ORIGIN,
  SENTRY_DSN,
} = process.env;
