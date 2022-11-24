// Classes
class ProductsController {
  public static async refreshProducts() {
    // Ge the products.
    const products = await ProductsModel.getAllProducts();

    // Add the products to the div.
    const productsDiv = document.getElementById('div-products-list') as HTMLDivElement;
    for (const index in products) {
      // Create the product element.
      const product = products[index as any];
      const productElement = document.createElement('div');
      productElement.classList.add('product-item');
      productElement.id = `div-product-${product.__id}`;

      // Add the title, price, amount
      const classesName = ['span-product-amount', 'span-product-name', 'span-product-price'];
      classesName.forEach((productClass) => {
        const productField = document.createElement('span');
        productField.classList.add(productClass);
        productElement.appendChild(productField);
      });

      productsDiv.appendChild(productElement);
    }
  }
}