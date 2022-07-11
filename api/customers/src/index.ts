// Libs
import Helmet from "helmet";
import Express from "express";

import LoggerFactory from "@logger";

// Data
const PORT = process.env.PORT;
const app = Express();
const logger = LoggerFactory.createLogger('Server');

// Code
app.use(Helmet());
app.set("trust proxy", true);

app.listen(PORT, () => {
  logger.info(`The server is online on port: ${PORT}`);
});
