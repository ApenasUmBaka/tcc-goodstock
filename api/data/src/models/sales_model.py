# Libs
from typing import Dict
from datetime import datetime

from models.product_model import ProductModel


# Classes
class SalesModel:
    '''
        A class to represents a sale object.
    '''
    date: datetime
    total_price: float
    responsible_id: int
    organization_id: int
    sold_products: Dict[str, ProductModel]

    def __init__(self, sale: any) -> None:
        '''
            Create the sale object.
            The sales parameter requires the sale JSON.
        '''
        if (sale.date):
            self.date = sale.date

        if (sale.totalPrice):
            self.total_price = float(sale.totalPrice)

        if (sale.responsibleId):
            self.responsible_id = int(sale.responsibleId)

        if (sale.organizationId):
            self.organization_id = int(sale.organizationId)

        if (sale.soldProducts):
            self.sold_products = sale.soldProducts
