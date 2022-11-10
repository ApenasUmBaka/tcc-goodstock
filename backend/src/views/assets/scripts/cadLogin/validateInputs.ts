// Data
const errorElement = document.getElementById('error-message') as HTMLDivElement;


// Functions
/**
 * A method to inializate all the input's events.
 */
function setEventsToInputs(elementName: string, validatorFunc: CallableFunction) {
  const elementField = document.getElementById(elementName) as HTMLInputElement;
  const elementLabel = document.getElementById(`${elementName}Label`) as HTMLInputElement;
  elementField.onkeyup = () => {
    const validatorResult = validatorFunc(elementField.value);
    errorElement.innerHTML = validatorResult || '';

    if (validatorResult) elementLabel.setAttribute('style', 'color: red');
    else elementLabel.setAttribute('style', 'color: green');;
  }
}


/**
 * A method to check if the confirm password is equals to the password field.
 */
function confirmPasswordInput(
    passwdInputId: string, confirmPasswdInput: HTMLInputElement): any {
  const passwdInput = document.getElementById(passwdInputId) as HTMLInputElement;
  const confirmLabel = (
    document.getElementById(`${confirmPasswdInput.id}Label`) as HTMLInputElement);

  return () => {
    if (confirmPasswdInput.value == "") return;

    if (passwdInput.value != confirmPasswdInput.value) {
      errorElement.innerHTML = 'A confirmação da senha está incorreta.';
      confirmLabel.setAttribute('style', 'color: red');
    } else {
      errorElement.innerHTML = '';
      confirmLabel.setAttribute('style', 'color: green');;
    }
  }
}


// Events
// Add Events to inputs.
const inputsToValidate: {[key: string]: CallableFunction} = {
// Normal register.
  registerName: Validator.isNameValid,
  registerEmail: Validator.isEmailValid,
  registerPasswd: Validator.isPasswdValid,

// Normal login.
  loginEmail: Validator.isEmailValid,
  loginPasswd: Validator.isPasswdValid,

// Register customer with new organization.
  registerOrgName: Validator.isNameValid,
  registerOrgPasswd: Validator.isPasswdValid,
  registerConfirmOrgPasswd: Validator.isPasswdValid,

// Register customer with an existing organization.
  loginOrgId: Validator.isOrgIdValid,
  loginOrgPasswd: Validator.isPasswdValid,
};

const registerInputsNames = Object.keys(inputsToValidate);
registerInputsNames.forEach(elementName => {
  setEventsToInputs(elementName, inputsToValidate[elementName]);
});

// Register confirm password.
const registerConfirmPasswd = document.getElementById('registerConfirmPasswd') as HTMLInputElement;
registerConfirmPasswd.onkeyup = confirmPasswordInput('registerPasswd', registerConfirmPasswd);

// Register organization confirm password.
const registerConfirmOrgPasswd = (
  document.getElementById('registerConfirmOrgPasswd') as HTMLInputElement);
registerConfirmOrgPasswd.onkeyup = (
  confirmPasswordInput('registerOrgPasswd', registerConfirmOrgPasswd));


// Form Events
// Normal register form.
const registerSubmitButton = document.getElementById('submit-up') as HTMLButtonElement;
registerSubmitButton.onclick = (event: Event) => {
  event.preventDefault();

  const inputs = [
    'registerNameLabel',
    'registerEmailLabel',
    'registerPasswdLabel',
    'registerConfirmPasswdLabel'
  ];

  // Check inputs.
  for (const index in inputs) {
    const input = document.getElementById(inputs[index]) as HTMLInputElement;
    if (!input.getAttribute('style')) return;
    if (input.getAttribute('style') == 'color: red') return;
  }

  toggleModal();
};

// Normal login form.
const formsLogin = document.getElementById('submit-in') as HTMLButtonElement;
formsLogin.onclick = () => {
  // Check if the organization ID is valid.
  const inputs = [
    'loginEmailLabel',
    'loginPasswdLabel'
  ];

  // Check inputs.
  for (const index in inputs) {
    const input = document.getElementById(inputs[index]) as HTMLInputElement;
    if (!input.getAttribute('style')) return false;
    if (input.getAttribute('style') == 'color: red') return false;
  }

  return true;
};

// Register customer with new organization.
const registerFormSubmit = document.getElementById('submit-up-finish') as HTMLInputElement;
registerFormSubmit.onclick = () => {
  const inputs = [
    'registerOrgNameLabel',
    'registerOrgPasswdLabel',
    'registerConfirmOrgPasswdLabel'
  ];

  // Check inputs.
  for (const index in inputs) {
    const input = document.getElementById(inputs[index]) as HTMLInputElement;
    if (!input.getAttribute('style')) return false;
    if (input.getAttribute('style') == 'color: red') return false;
  }

  // Submit the forms
  const name = document.getElementById('lastRegisterName') as HTMLInputElement;
  name.value = (document.getElementById('registerName') as HTMLInputElement).value;

  const email = document.getElementById('lastRegisterEmail') as HTMLInputElement;
  email.value = (document.getElementById('registerEmail') as HTMLInputElement).value;

  const passwd = document.getElementById('lastRegisterPasswd') as HTMLInputElement;
  passwd.value = (document.getElementById('registerPasswd') as HTMLInputElement).value;

  return true;
};

// Register customer with existing organization
const loginFormSubmit = document.getElementById('submit-in-finish') as HTMLInputElement;
loginFormSubmit.onclick = () => {
  const inputs = [
    'loginOrgIdLabel',
    'loginOrgPasswdLabel'
  ];

  // Check inputs.
  for (const index in inputs) {
    const input = document.getElementById(inputs[index]) as HTMLInputElement;
    if (!input.getAttribute('style')) return false;
    if (input.getAttribute('style') == 'color: red') return false;
  }

  // Submit the forms
  const name = document.getElementById('lastLoginName') as HTMLInputElement;
  name.value = (document.getElementById('registerName') as HTMLInputElement).value;

  const email = document.getElementById('lastLoginEmail') as HTMLInputElement;
  email.value = (document.getElementById('registerEmail') as HTMLInputElement).value;

  const passwd = document.getElementById('lastLoginPasswd') as HTMLInputElement;
  passwd.value = (document.getElementById('registerPasswd') as HTMLInputElement).value;

  return true;
};