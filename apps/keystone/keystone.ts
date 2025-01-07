import { config } from "@keystone-6/core";
import { User } from "./src/schemas/User";

export default config({
  db: {
    provider: "mysql",
    url: "mysql://myuser:mypassword@localhost:3306/mydb",
  },
  lists: {
    User,
  },
});
