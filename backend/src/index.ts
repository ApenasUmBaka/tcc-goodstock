// Libs
import LoggerFactory from "@logger";
import HTTPSServer from "@models/httpsServerModel";

// Data
const logger = LoggerFactory.createLogger("SERVER");

// Code
logger.info("Starting server...");

logger.info("Starting the HTTPS server...");
const httpsServer = new HTTPSServer(logger);
httpsServer.createHTTPSServer();
