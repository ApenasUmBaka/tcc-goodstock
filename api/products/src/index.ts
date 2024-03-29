// Libs
import Helmet from "helmet";
import Express from "express";

import router from "@router";
import LoggerFactory from "@logger";

import "@types";

// Data
const PORT = process.env.PORT;
const app = Express();
const logger = LoggerFactory.createLogger("SERVER");

// Code
app.use(Express.json());
app.set("trust proxy", true);
app.use(Helmet());

app.use(router);

app.listen(PORT, () => {
  logger.info(`The server is online on port: ${PORT}`);
});
