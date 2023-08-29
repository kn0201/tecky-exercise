import { config } from "dotenv";
import populateEnv from "populate-env";

config();

export let env = {
  NODE_ENV: "",
  DB_NAME: "",
  DB_USERNAME: "",
  DB_PASSWORD: "",
  PORT: 8100,
};

populateEnv(env, { mode: "halt" });
