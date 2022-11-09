// Functions
/**
 * A function to close the modal.
 */
function closeModal(modal: HTMLDivElement, modalBg: HTMLDivElement) {
  modal.classList.add('modal-closed');
  modal.classList.remove('modal-opened');

  modalBg.classList.remove('modal-opened');
}

/**
 * A function to open modal.
 */
function openModal(modal: HTMLDivElement, modalBg: HTMLDivElement) {
  modal.classList.add('modal-opened');
  modal.classList.remove('modal-closed');

  modalBg.classList.add('modal-opened');
}

/**
 * A method to open/close the organization modal.
 */
function toggleModal() {
  const modal = document.getElementById('organization-modal')! as HTMLDivElement;
  const modalBg = document.getElementById('organization-modal-bg')! as HTMLDivElement;

  errorElement.innerHTML = "";

  if (!modal.classList.contains('modal-opened')) {
    openModal(modal, modalBg);
  } else {
    closeModal(modal, modalBg);
  }
}