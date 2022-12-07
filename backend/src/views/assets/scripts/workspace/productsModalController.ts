// Class
class ProductsModalController {
  /**
   * A method to open the modal.
  */
  public static openModal(): void {
    // Check if the modal is open.
    const modalElement = document.getElementById('products-modal') as HTMLDivElement;
    if (!modalElement.classList.contains('modal-closed')) return;

    // Open modal background.
    const modalBgElement = document.getElementById('products-modal-bg') as HTMLDivElement;
    modalBgElement.classList.add('modal-opened');

    // Change to button to edit.
    document.getElementById('edit-item-table')?.classList.add('hidden');
    document.getElementById('add-item-table')?.classList.remove('hidden');

    // Open modal.
    modalElement.classList.add('modal-opened');
    modalElement.classList.remove('modal-closed');
  }

  /**
   * A method to open the modal in some product.
  */
   public static async openModalWithProduct(ProductId: string): Promise<void> {
    // Get the product.
    const product = await ProductsModel.getProductById(ProductId);
    if (!product) {
      console.log('Product not found. Opening modal without product\'s info...');
      this.openModal();
      return;
    }

    // Fill the modal with the product's info.
    (document.getElementById('input-product-id') as HTMLInputElement).value = product.id;
    (document.getElementById('input-product-name') as HTMLInputElement).value = product.name;
    (document.getElementById('input-product-price') as HTMLInputElement).value = 
      product.price.toString();
    (document.getElementById('input-product-amount') as HTMLInputElement).value =
      product.amount.toString();

    // Open the modal.
    this.openModal();

    // Change to button to edit.
    document.getElementById('add-item-table')?.classList.add('hidden');
    document.getElementById('edit-item-table')?.classList.remove('hidden');
  }

  /**
   * A method to close the modal.
  */
  public static closeModal(): void {
    // Check if the modal is close.
    const modalElement = document.getElementById('products-modal') as HTMLDivElement;
    if (!modalElement.classList.contains('modal-opened')) return;

    // Close modal background.
    const modalBgElement = document.getElementById('products-modal-bg') as HTMLDivElement;
    modalBgElement.classList.remove('modal-opened');

    // Close modal.
    modalElement.classList.add('modal-closed');
    modalElement.classList.remove('modal-opened');
  }

  /**
   * A method to add a new details field.
  */
  private static addDetailsField(): void {
    // Create the new details fields.
    const detailsFields = Object.assign(document.createElement('div'));
    detailsFields.classList.add('details-field');

    const detailName = Object.assign(document.createElement('input'), {
      type: "text",
      placeholder: "Chave"
    });
    const detailValue = Object.assign(document.createElement('input'), {
      type: "text",
      placeholder: "Valor"
    });

    // Add the detailsFields to the list.
    detailsFields.appendChild(detailName);
    detailsFields.appendChild(detailValue);
    const detailsDiv = document.getElementById('div-details') as HTMLDivElement;
    detailsDiv.appendChild(detailsFields);
  }

  /**
   * A method to remove the details field.
  */
   private static delDetailsField(): void {
    // Delete the empty details fields.
    const detailsDiv = document.getElementById('div-details') as HTMLDivElement;
    if (!detailsDiv.lastChild) return;
    detailsDiv.removeChild(detailsDiv.lastChild);
  }
}