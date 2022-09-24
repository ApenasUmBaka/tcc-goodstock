// Libs
import express from "express";

import router from "@router";
import LoggerFactory from "./logger/logger";

// Data
const app = express();
const PORT = process.env.PORT;

// Code
app.use(router);

app.listen(PORT, () => {
  const logger = LoggerFactory.createLogger("Server");
  logger.info(`Server in online on port: ${PORT}`);
});
