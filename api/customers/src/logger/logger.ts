// Libs
import winston, { Logger } from "winston";

// Data
const { combine, printf, timestamp, colorize } = winston.format;

// Class
/**
 * A class to represents a factory that produces the Logger object.
 */
abstract class LoggerFactory {
  /**
   * A method to create the Logger object.
   * @param ip - The ip from the logger responsible.
   * @returns The logger object.
   */
  public static createLogger(ip: string): Logger {
    // Format opts
    const format = printf(
      (info) => `[${info.level}] ${info.timestamp} (${ip}) - ${info.message}`
    );

    // Create the logger.
    const logger = winston.createLogger({
      format: combine(
        colorize(),
        timestamp({
          format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format
        ),
      transports: [new winston.transports.Console()],
    });

    return logger;
  }
}

// Code
export default LoggerFactory;
