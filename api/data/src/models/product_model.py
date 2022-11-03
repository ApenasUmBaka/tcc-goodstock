# Classes
class ProductModel:
    amount: int
    unit_price: float

    def __init__(self, product: any) -> None:
        if (product.amount):
            self.amount = int(product.amount)

        if (product.unitPrice):
            self.unit_price = float(product.unitPrice)
