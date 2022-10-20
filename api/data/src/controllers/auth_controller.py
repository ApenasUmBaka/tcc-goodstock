# Libs
from logging import Logger
from flask import Request, WSGIEnvironment

from utils.logger_factory import LoggerFactory


# Classes
class AuthController:
    '''
        A class to authenticate all requests to the server.
        If the auth doesn\'t exists, just log it.
    '''

    def __init__(self, app) -> None:
        self

    def __call__(self, environ: WSGIEnvironment) -> any:
        request = Request(environ)
        request.logger: Logger = LoggerFactory.createLogger(
            request.remote_addr)

        request.logger.info(f'Request on endpoint: {request.url}')
