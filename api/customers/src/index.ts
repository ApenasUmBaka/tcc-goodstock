// Libs
import Helmet from "helmet";
import Express from "express";

import router from '@router';
import LoggerFactory from "@logger";

// Data
const PORT = process.env.PORT;
const app = Express();
const logger = LoggerFactory.createLogger("SERVER");

// Code
app.use(Helmet());
app.set("trust proxy", true);

app.use(router);

app.listen(PORT, () => {
  logger.info(`The server is online on port: ${PORT}`);
});
