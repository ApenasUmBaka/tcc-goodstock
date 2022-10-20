# Libs
# import json
from flask import request
# from matplotlib.pyplot import plt

from models.sales_model import SalesModel
# from utils.logger_factory import LoggerFactory


# Classes
class GraphController:
    def getSummary(sales: SalesModel) -> bytes:
        '''
            A route that returns the summary of all sales.
        '''
        request.logger.info('Creating a summary using the provided args...')

        body: dict[str, any] = request.json()
        sales: list[SalesModel] = []
        for body_key, body_value in body:
            sales.append(SalesModel(body_value))

        return {
            'status': 'Success',
            'data': sales
        }
