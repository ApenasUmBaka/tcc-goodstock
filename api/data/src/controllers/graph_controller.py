# Libs
from typing import Dict
from logging import Logger
from flask import request, make_response
# from matplotlib.pyplot import plt

from models.sales_model import SalesModel
from factories.logger_factory import LoggerFactory


# Classes
class GraphController:
    def __init__(self) -> None:
        self.logger: Logger = LoggerFactory.createLogger(
            request.remote_addr)

    def getSummary(self) -> bytes:
        '''
            A route that returns the summary of all sales.
        '''
        self.logger.info('Creating a summary using the provided args...')

        self.logger.info('Getting request\'s body...')
        # body: Dict[str, any] = request.get_data()
        body = request.path
        self.logger.info(body)
        sales: list[SalesModel] = []

        self.logger.info('Getting provided sales...')
        for body_key, body_value in body:  # body:
            sales.append(SalesModel(body_value))

        self.logger.debug(sales)
        self.logger.info('Returning response...')
        return make_response({
            'status': 'Success',
            'data': sales
        })
