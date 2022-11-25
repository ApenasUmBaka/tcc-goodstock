// Classes
class ProductsController {
  public static async refreshProducts() {
    // Ge the products.
    const products = await ProductsModel.getAllProducts();

    // Add the products to the div.
    const productsDiv = document.getElementById('div-products-list') as HTMLDivElement;
    while (productsDiv.firstChild) {
      productsDiv.removeChild(productsDiv.firstChild)
    }

    for (const index in products) {
      // Create the product element.
      const product = products[index as any];
      const productElement = document.createElement('article');
      const productElement1 = document.createElement('ul');
      productElement.classList.add('row');
      productElement.classList.add('nfl');
      productElement.classList.add('product-item');
      productElement.id = `div-product-${index}`;

      // Add the title, price, amount
      const classesName = ['span-product-amount', 'span-product-name', 'span-product-price'];
      classesName.forEach((productClass) => {
        const productField = document.createElement('li');
        const productField1 = document.createElement('span');
        switch (productClass) {
          case 'span-product-amount':
            productField1.innerHTML = product.amount.toString();
          break;
          case 'span-product-name':
            productField1.innerHTML = product.name;
          break;
          case 'span-product-price':
            productField1.innerHTML = product.price.toString();
          break;
        }
        productField1.classList.add(productClass);
        productField.appendChild(productField1);
        productElement1.appendChild(productField);
      });

      productElement.appendChild(productElement1);
      productsDiv.appendChild(productElement);
    }
  }
}