// Libs
import helmet from "helmet";
import express from "express";
import bodyParser from "body-parser";


import router from "@router";
import LoggerFactory from "./logger/logger";

// Data
const app = express();
const PORT = process.env.PORT;

// Code
app.use(helmet());
app.use(express.json());
app.set('trust-proxy', true);
app.use(bodyParser.urlencoded({ extended: true }));

app.use(router);

app.listen(PORT, () => {
  const logger = LoggerFactory.createLogger("Server");
  logger.info(`Server in online on port: ${PORT}`);
});
