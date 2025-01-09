import { config } from "@keystone-6/core";
import { User } from "./src/schemas/User";
import { CORS_ORIGIN, DATABASE_URL } from "./config";

export default config({
  server: {
    cors: {
      origin: CORS_ORIGIN,
      credentials: true,
    },
  },
  db: {
    provider: "mysql",
    url: DATABASE_URL,
  },
  lists: {
    User,
  },
});
