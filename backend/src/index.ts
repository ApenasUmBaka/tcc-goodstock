// Libs
import helmet from "helmet";
import express from "express";

import router from "@router";
import LoggerFactory from "@logger";

// Data
const app = express();
const PORT = process.env.PORT || 80;

// Code
// app.set('trust-proxy', true);
// app.use(helmet());
app.use(router);

app.listen(PORT, () => {
  const logger = LoggerFactory.createLogger("SERVER");
  logger.info(`The server is online on port: ${PORT}`);
});
