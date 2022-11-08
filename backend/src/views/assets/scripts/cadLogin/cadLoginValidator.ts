// Data
const errorElement = document.getElementById('error-message') as HTMLDivElement;

// Classes
class Validator {
  public static isNameValid(name: string): string | undefined {
    console.log('Checking if name is valid...');

    if (!name) return 'Nome *O nome não foi específicado.';
    if (name.length < 3) return 'Nome *Seu nome deve ter pelo menos 3 caracteres.';
    return;
  }

  public static isEmailValid(email: string): string | undefined {
    console.log('Checking if email is valid...');

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/gi;
    if (!regexEmail.test(email)) return 'Email *Por favor coloque um endereço de email válido.';
    return;
  }

  public static isPasswdValid(passwd: string): string | undefined {
    console.log('Checking if password is valid...');

    const regexPasswd = /([^0-9a-z\ !#-&(-.:-@[-_{-~])/;
    if (!(passwd.length >= 8 && passwd.length <= 20)) {
      return 'Senha *A senha deve conter no minimo 8 digitos e máximo 20.';
    }

    if (regexPasswd.exec(passwd)) {
      return 'Senha *A senha deve conter apenas caracteres comuns, evite utilizar caracteres especiais como \' e ".';
    }

    return;
  }

  public static isOrgIdValid(orgId: string): string | undefined {
    console.log('Checking if organization ID is valid...');

    if (!(Number(orgId) > 0)) {
      return 'Id *Deve ser maior que 0 e se referir ao ID correspondente da sua organização.';
    }
    return;
  }
}

// Functions
/**
 * A method to validate an input.
 */
function validateField(
  field: HTMLInputElement,
  fieldName: string,
  label: HTMLLabelElement,
  validatorCallback: CallableFunction
): void {
  const validatorResult = validatorCallback(field.value);

  if (!validatorResult) {
    setLabelCorrect(field, label, fieldName);
  } else {
    setLabelIncorrect(field, label, validatorResult);
  }
}

/**
 * A method to set the label as correct.
 */
function setLabelCorrect(field: HTMLInputElement, label: HTMLLabelElement, defaultName: string) {
  label.innerHTML = defaultName;
  label.setAttribute('style', 'color: green');
  field.setAttribute('style', 'border-color: green');
}

/**
 * A method to set the label as correct.
 */
function setLabelIncorrect(field: HTMLInputElement, label: HTMLLabelElement, errorMsg: string) {
  label.innerHTML = errorMsg;
  label.setAttribute('style', 'color: red');
  field.setAttribute('style', 'border-color: red');
}

/**
 * A method to be execute in the sign in event.
 */
function loginAccount(event: Event) {
  event.preventDefault();

  // Test email
  const loginEmail = document.getElementById('loginEmail') as HTMLInputElement;
  const loginEmailLabel = document.getElementById('loginEmailLabel') as HTMLLabelElement;
  const emailError = Validator.isEmailValid(loginEmail.value);
  if (emailError) {
    setLabelIncorrect(loginEmail, loginEmailLabel, emailError);
    return false;
  } else {
    setLabelCorrect(loginEmail, loginEmailLabel, 'Email: ');
  }

  // Test Password
  const loginPasswd = document.getElementById('loginPasswd') as HTMLInputElement;
  const loginPasswdLabel = document.getElementById('loginPasswdLabel') as HTMLLabelElement;
  const passwdError = Validator.isPasswdValid(loginPasswd.value);
  if (passwdError) {
    setLabelIncorrect(loginPasswd, loginPasswdLabel, passwdError);
    return false;
  } else {
    setLabelCorrect(loginPasswd, loginPasswdLabel, 'Senha: ');
  }

  return true;
}

/**
 * A method to be executed on the register event.
 */
function registerAccount(event: Event) {
  event.preventDefault();

  const fieldsToCheck: any = {
    registerName: Validator.isNameValid,
    registerEmail: Validator.isEmailValid,
    registerPasswd: Validator.isPasswdValid,
    registerConfirmPasswd: Validator.isPasswdValid,
  };

  const fieldsToCheckKeys = Object.keys(fieldsToCheck);

  for (const index in fieldsToCheckKeys) {
    const fieldToCheckId = fieldsToCheckKeys[index];
    const validatorFunction = fieldsToCheck[fieldToCheckId];

    const fieldElement = document.getElementById(fieldToCheckId) as HTMLInputElement;
    if (validatorFunction(fieldElement.value)) return false;
  }

  errorElement.innerHTML = '';
  return true;
}

// Events
// Register Events
const nameField = document.getElementById('registerName') as HTMLInputElement;
nameField.onkeyup = () => {
  const nameLabel = document.getElementById('registerNameLabel') as HTMLLabelElement;
  validateField(nameField, 'Nome', nameLabel, Validator.isNameValid);
};

const emailField = document.getElementById('registerEmail') as HTMLInputElement;
emailField.onkeyup = () => {
  const emailLabel = document.getElementById('registerEmailLabel') as HTMLLabelElement;
  validateField(emailField, 'Email: ', emailLabel, Validator.isEmailValid);
};

const passwdField = document.getElementById('registerPasswd') as HTMLInputElement;
passwdField.onkeyup = () => {
  const passwdLabel = document.getElementById('registerPasswdLabel') as HTMLLabelElement;
  validateField(passwdField, 'Senha', passwdLabel, Validator.isPasswdValid);
};

const confirmPasswdField = document.getElementById('registerConfirmPasswd') as HTMLInputElement;
confirmPasswdField.onkeyup = () => {
  const confirmPasswdLabel = document.getElementById(
    'registerConfirmPasswdLabel'
  ) as HTMLLabelElement;

  validateField(confirmPasswdField, 'Confirmar Senha', confirmPasswdLabel, Validator.isPasswdValid);
  if (passwdField.value == confirmPasswdField.value) {
    setLabelCorrect(confirmPasswdField, confirmPasswdLabel, 'Confirmar Senha');
  } else {
    setLabelIncorrect(
      confirmPasswdField,
      confirmPasswdLabel,
      'A senha e a confirmação da senha precisam ser a mesma.'
    );
  }
};

// Last step to register
// Register customer with non-existing organization
const registerForm = document.getElementById('registerOrganizationForm') as HTMLFormElement;
registerForm.onsubmit = () => {
  const orgName = document.getElementById('registerOrgName') as HTMLInputElement;
  const orgIdLabel = document.getElementById('registerOrgIdlabel') as HTMLLabelElement;

  const orgMasterPasswd = document.getElementById('registerOrgPasswd') as HTMLInputElement;
  const orgMasterPasswdLabel = document.getElementById(
    'registerOrgPasswdlabel'
  ) as HTMLLabelElement;

  // Check if the organization ID is valid.
  if (Validator.isNameValid(orgName.value)) {
    setLabelIncorrect(orgName, orgIdLabel, 'Organization name is not valid.');
    return false;
  }
  if (Validator.isPasswdValid(orgMasterPasswd.value)) {
    setLabelIncorrect(orgMasterPasswd, orgMasterPasswdLabel, 'Master Password is not valid.');
    return false;
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
const loginForm = document.getElementById('loginOrganizationForm') as HTMLFormElement;
loginForm.onsubmit = () => {
  const orgId = document.getElementById('loginOrgId') as HTMLInputElement;
  const orgIdLabel = document.getElementById('loginOrgIdLabel') as HTMLLabelElement;

  // Check if the organization ID is valid.
  if (Validator.isOrgIdValid(orgId.value)) {
    setLabelIncorrect(orgId, orgIdLabel, 'Organization ID not valid.');
    return false;
  }

  // Submit the forms
  const name = document.getElementById('lastLoginName') as HTMLInputElement;
  name.value = (document.getElementById('loginName') as HTMLInputElement).value;

  const email = document.getElementById('lastLoginEmail') as HTMLInputElement;
  email.value = (document.getElementById('loginEmail') as HTMLInputElement).value;

  const passwd = document.getElementById('lastLoginPasswd') as HTMLInputElement;
  passwd.value = (document.getElementById('loginPasswd') as HTMLInputElement).value;
  return true;
};

// Login user
const formsLogin = document.getElementById('form-in') as HTMLFormElement;
formsLogin.onsubmit = (event: Event) => {
  // Check if the organization ID is valid.
  console.log('Logging account...');
  const loginAccountResult = loginAccount(event);
  console.log(loginAccountResult);
  return loginAccountResult;
};
