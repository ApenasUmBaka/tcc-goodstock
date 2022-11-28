// Classes
class ProductsController {
  public static async refreshProducts() {
    // Get the products.
    const products = await ProductsModel.getAllProducts();

    // Remove the products from the products list.
    this.removeAllproducts();

    // Add the products to the div.
    const productsDiv = document.getElementById('table-products') as HTMLDivElement;
    for (const product of products) {
      const productElement = this.getProductElementEntry(product);
      productsDiv.appendChild(productElement);
    }
  }

  /**
   * A method to remove all products from the list.
   */
  public static removeAllproducts() {
    const productsDiv = document.getElementById("table-products") as HTMLDivElement;
    const tableHeaders = document.getElementById('table-products-headers') as HTMLDivElement;
    while (productsDiv.firstChild) {
      productsDiv.removeChild(productsDiv.firstChild);
    }

    productsDiv.appendChild(tableHeaders);
  }

  /**
   * A method to create an product entry.
   */
  public static getProductElementEntry(product: Product): HTMLTableRowElement {
    // Create and add the amount, name and the value to the product entry.
    const productEntry = document.createElement('tr');
    const fieldsToAdd = ['amount', 'name', 'price'];
    fieldsToAdd.forEach(fieldName => {
      const field = document.createElement('td');
      field.classList.add("entry-info");
      field.innerHTML = (product as any)[fieldName];
      productEntry.appendChild(field);
    });

    // Add the date field.
    const dateField = document.createElement('td');
    dateField.classList.add("entry-info");
    const productDate = new Date(product.createdAt)
    dateField.innerHTML = `${productDate.getDay()}/${productDate.getMonth()}/${productDate.getFullYear()}`;
    productEntry.appendChild(dateField);

    // Add the details field.
    if (!product.details.length) return productEntry;

    const detailsField = document.createElement('div');
    detailsField.classList.add('entry-detail');
    for (let i = 0; i < product.details.length; i++) {
      // Add the details in the div.
      const detail = product.details[i];
      const fieldsToAdd = ['name', 'value'];

      fieldsToAdd.forEach(fieldName => {
        const detailName = document.createElement('span');
        detailName.classList.add(`entry-detail-${fieldName}`);
        detailName.innerHTML = (detail as any)[fieldName];
        detailsField.appendChild(detailName);
      });
    }

    return productEntry;
  }
}