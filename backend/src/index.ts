// Libs
import LoggerFactory from "@logger";
import HTTPSServer from "@models/httpsServerModel";

// Data
const logger = LoggerFactory.createLogger("SERVER");

// Code
logger.info("Turning on server...");

HTTPSServer.startServer(logger);
