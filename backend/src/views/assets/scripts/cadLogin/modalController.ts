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
   * A method to change the modal to receive an new organization.
   */
  public static toggleOrgInputs() {
    if (document.getElementById("div-org-login")?.getAttribute("style") == "") {
      this.changeToRegisterOrg();
    } else {
      this.changeToLoginOrg();
    }
  }

  /**
   * A method to change the visibity from the login div.
   */
  private static changeToLoginOrg() {
    // Change the login div.
    const loginElement = document.getElementById(
      "div-org-login"
    ) as HTMLDivElement;
    loginElement.setAttribute("style", "");

    // Change the register div.
    const registerElement = document.getElementById(
      "div-org-register"
    ) as HTMLDivElement;
    registerElement.setAttribute("style", "display: none");
  }

  /**
   * A method to change the visibity from the register div.
   */
  private static changeToRegisterOrg() {
    // Change the login div.
    const registerElement = document.getElementById(
      "div-org-register"
    ) as HTMLDivElement;
    registerElement.setAttribute("style", "");

    // Change the register div.
    const loginElement = document.getElementById(
      "div-org-login"
    ) as HTMLDivElement;
    loginElement.setAttribute("style", "display: none");
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
}
