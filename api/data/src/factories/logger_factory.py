# Libs
from logging import Logger, StreamHandler, getLogger, Formatter


# Classes
class LoggerFactory:
    @staticmethod
    def createLogger(ip: str) -> Logger:
        '''
            Create the logger
        '''
        logger = getLogger(ip)

        if (len(logger.handlers) == 1):
            return logger

        # Create the logger
        handler = StreamHandler()
        new_format = Formatter(
            fmt='%(asctime)s [%(levelname)s] - (' + ip + ') %(message)s',
            datefmt='%H:%M:%S %d-%b-%y')

        handler.setFormatter(new_format)
        logger.addHandler(handler)
        logger.setLevel('INFO')
        return logger
