import { DB_HOST, DB_DATABASE, DB_USERNAME, DB_PASSWORD } from "@config";

export const dbConnection = {
  url: `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}/${DB_DATABASE}?retryWrites=true&w=majority`,
};
