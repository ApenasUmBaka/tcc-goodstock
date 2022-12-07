// Classes
class ProductsController {
  public static async refreshProducts() {
    // Get the products.
    const products = await ProductsModel.getAllProducts();

    // Remove the products from the products list.
    this.removeAllproducts();

    // Add the products to the div.
    const productsDiv = document.getElementById(
      "table-products"
    ) as HTMLDivElement;
    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      const productElement = this.getProductElementEntry(product, (i + 1));
      productsDiv.appendChild(productElement);
    }
  }

  /**
   * A method to remove all products from the list.
   */
  public static removeAllproducts() {
    const productsDiv = document.getElementById(
      "table-products"
    ) as HTMLDivElement;
    const tableHeaders = document.getElementById(
      "table-products-headers"
    ) as HTMLDivElement;
    while (productsDiv.firstChild) {
      productsDiv.removeChild(productsDiv.firstChild);
    }

    productsDiv.appendChild(tableHeaders);
  }

  /**
   * A method to create an product entry.
   */
  public static getProductElementEntry(product: Product, index: number): HTMLTableRowElement {
    // Create and add the amount, name and the value to the product entry.
    const productEntry = document.createElement("tr");

    // Add the index to the product.
    const indexField = document.createElement("td");
    indexField.classList.add("entry-info");
    indexField.innerText = index.toString();
    productEntry.appendChild(indexField);

    // Add the fields to the product.
    const fieldsToAdd = ["amount", "name"];
    fieldsToAdd.forEach((fieldName) => {
      const field = document.createElement("td");
      field.classList.add("entry-info");
      field.innerText = (product as any)[fieldName];
      productEntry.appendChild(field);
    });

    // Add the price to the product.
    const priceField = document.createElement("td");
    priceField.classList.add("entry-info");
    priceField.innerText = `R$ ${(product as any)['price']}`;
    productEntry.appendChild(priceField);

    // Add the date field.
    const dateField = document.createElement("td");
    dateField.classList.add("entry-info");
    const productDate = new Date(product.createdAt);
    dateField.innerText = `${productDate.getDay()}/${productDate.getMonth()}/${productDate.getFullYear()}`;
    productEntry.appendChild(dateField);

    // Add the details field.
    if (!product.details.length) return productEntry;

    const detailsField = document.createElement("div");
    detailsField.classList.add("entry-detail");
    for (let i = 0; i < product.details.length; i++) {
      // Add the details in the div.
      const detail = product.details[i];
      const fieldsToAdd = ["name", "value"];

      fieldsToAdd.forEach((fieldName) => {
        const detailName = document.createElement("span");
        detailName.classList.add(`entry-detail-${fieldName}`);
        detailName.innerText = (detail as any)[fieldName];
        detailsField.appendChild(detailName);
      });
    }

    return productEntry;
  }

  /**
   * A method to create a new product.
  */
  public static async addProduct(): Promise<void> {
    // Send the new product to the server.
    const product = this.getProductInModal();
    console.log(product);
    try {
      await fetch('/products', {
        method: 'POST',
        body: JSON.stringify(product),
        credentials: "include",
        headers: {
          'Content-Type': 'application/json',
        },
      });
      await this.refreshProducts();
    } catch (err) {
      console.log(`Error while trying to create the product. Error: ${err}`);
    }

    // Close the modal.
    ProductsModalController.closeModal();
  }

  /**
   * A method to edit a product.
  */
  public static async editProduct(): Promise<void> {
    // Send the product to the server.
    const product = this.getProductInModal();
    try {
      await fetch(`/products/${product.id}`, {
        method: 'PATCH',
        body: JSON.stringify(product),
        credentials: "include",
        headers: {
          'Content-Type': 'application/json',
        },
      });
      await this.refreshProducts();
    } catch (err) {
      console.log(`Error while trying to update the product. Error: ${err}`);
    }

    // Close the modal.
    ProductsModalController.closeModal();
  }

  /**
   * A method to del a product.
  */
  public static async delProduct(): Promise<void> {
    // Get the product ID.
    const product = this.getProductInModal();

    // Send the DELETE to the server
    try {
      await fetch(`/products/${product.id}`, {
        method: 'DELETE',
        credentials: "include",
      });
      await this.refreshProducts();
    } catch (err) {
      console.log(`Error while trying to update the product. Error: ${err}`);
    }
  }

  /**
   * A method to get the current product in the modal.
  */
   private static getProductInModal(): any {
    // Get the basic params from the product.
    const productName = (document.getElementById('input-product-name') as HTMLInputElement).value;
    const productPrice = Number(
      (document.getElementById('input-product-price') as HTMLInputElement).value);
    const productAmount = Number(
      (document.getElementById('input-product-amount') as HTMLInputElement).value);
    
    // Get the details from the product.
    const detailsDiv = document.getElementById('div-details') as HTMLDivElement;
    const details: any = {};
    for (let i = 0; i < detailsDiv.children.length; i++) {
      const detailRow = detailsDiv.children[i];
      if (!detailRow.firstChild) continue;

      details[(detailRow.firstChild as HTMLInputElement).value] = (
        detailRow.lastChild as HTMLInputElement).value;
    }

    // Return the product.
    const product = {
      id: (document.getElementById('input-product-id') as HTMLInputElement).value,
      name: productName,
      price:productPrice,
      amount: productAmount,
      details: details
    };
    return product;
  }
}
