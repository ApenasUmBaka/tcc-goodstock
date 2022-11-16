<<<<<<< HEAD

// Functions

/**
 * A function to close the modal.
 */
 function closeModal(modal: HTMLDivElement, modalBg: HTMLDivElement) {
  modal.classList.add('modal-closed');
  modal.classList.remove('modal-opened');

  modalBg.classList.remove('modal-opened');
=======
// Functions
/**
 * A function to close the modal.
 */
function closeModal(modal: HTMLDivElement, modalBg: HTMLDivElement) {
  modal.classList.add("modal-closed");
  modal.classList.remove("modal-opened");

  modalBg.classList.remove("modal-opened");
>>>>>>> develop
}

/**
 * A function to open modal.
 */
<<<<<<< HEAD
 function openModal(modal: HTMLDivElement, modalBg: HTMLDivElement) {
  modal.classList.add('modal-opened');
  modal.classList.remove('modal-closed');

  modalBg.classList.add('modal-opened');
=======
function openModal(modal: HTMLDivElement, modalBg: HTMLDivElement) {
  modal.classList.add("modal-opened");
  modal.classList.remove("modal-closed");

  modalBg.classList.add("modal-opened");
>>>>>>> develop
}

/**
 * A method to open/close the organization modal.
 */
function toggleModal() {
<<<<<<< HEAD
  const modal = document.getElementById('organization-modal')! as HTMLDivElement;
  const modalBg = document.getElementById('organization-modal-bg')! as HTMLDivElement;

  if (!modal.classList.contains('modal-opened')) {
=======
  const modal = document.getElementById(
    "organization-modal"
  )! as HTMLDivElement;
  const modalBg = document.getElementById(
    "organization-modal-bg"
  )! as HTMLDivElement;

  if (!modal.classList.contains("modal-opened")) {
>>>>>>> develop
    openModal(modal, modalBg);
  } else {
    closeModal(modal, modalBg);
  }
}

// Events
<<<<<<< HEAD
const modalButton = document.getElementById('modal-button')!;
modalButton.addEventListener('click', toggleModal);
=======
// Register event
const registerSubmitButton = document.getElementById(
  "submit-up"
) as HTMLButtonElement;
registerSubmitButton.onclick = (event: Event) => {
  // Check register errors.
  if (!registerAccount(event)) {
    return;
  }
  toggleModal();
};
>>>>>>> develop
