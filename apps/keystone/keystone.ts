import { config } from "@keystone-6/core";
import { User } from "./src/schemas/User";
import { CORS_ORIGIN, DATABASE_URL } from "./config";
import { exec } from "child_process";

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
    onConnect: async (keystone) => {
      // eslint-disable-next-line no-console
      console.log("--- Generate graphql types");

      exec("nx graphqlTypes:generate tp-graphql-types", () => {
        // eslint-disable-next-line no-console
        console.log("--- Generate graphql types is completed");
      });
    },
  },
  lists: {
    User,
  },
});
