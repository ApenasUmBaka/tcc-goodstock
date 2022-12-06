// Classes
class ModalController {
  /**
   * A method to open/close the organization modal.
   */
  public static toggleModal() {
    const modal = document.getElementById(
      "organization-modal"
    )! as HTMLDivElement;
    const modalBg = document.getElementById(
      "organization-modal-bg"
    )! as HTMLDivElement;

    MessageErrorController.setMessage("");
    errorElement.remove();

    if (!modal.classList.contains("modal-opened")) {
      modal.insertBefore(errorElement, modal.firstChild);
      this.openModal(modal, modalBg);
    } else {
      this.closeModal(modal, modalBg);
    }
  }

  /**
   * A function to close the modal.
   */
  private static closeModal(modal: HTMLDivElement, modalBg: HTMLDivElement) {
    modal.classList.add("modal-closed");
    modal.classList.remove("modal-opened");

    modalBg.classList.remove("modal-opened");
  }

  /**
   * A function to open modal.
   */
  private static openModal(modal: HTMLDivElement, modalBg: HTMLDivElement) {
    modal.classList.add("modal-opened");
    modal.classList.remove("modal-closed");

    modalBg.classList.add("modal-opened");
  }

  /**
   * A method to change the modal to receive an new organization.
   */
   public static toggleOrgInputs() {
    // Change the login div.
    const loginElement = document.getElementById(
      "div-org-login"
    ) as HTMLDivElement;
    loginElement.classList.toggle('hidden');

    // Change the register div.
    const registerElement = document.getElementById(
      "div-org-register"
    ) as HTMLDivElement;
    registerElement.classList.toggle('hidden');
  }
}
