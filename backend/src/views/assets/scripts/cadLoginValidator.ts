// Data
const errorElement = document.getElementById("error-message") as HTMLDivElement;

// Classes
class Validator {
  public static isNameValid(name: string): string | undefined {
    console.log('Checking if name is valid...');

    if (!name) return 'Nome *O nome não foi específicado.';
    if (name.length < 3) return "Nome *Seu nome deve ter pelo menos 3 caracteres.";
    return;
  }

  public static isEmailValid(email: string): string | undefined {
    console.log('Checking if email is valid...');

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/gi;
    if (!regexEmail.test(email)) return "Email *Por favor coloque um endereço de email válido.";
    return;
  }

  public static isPasswdValid(passwd: string): string | undefined {
    console.log('Checking if password is valid...');

    const regexPasswd = /([^0-9a-z\ !#-&(-.:-@[-_{-~])/;
    if (!(passwd.length >= 8 && passwd.length <= 20)) {
      return "Senha *A senha deve conter no minimo 8 digitos e máximo 20.";
    }

    if (regexPasswd.exec(passwd)) {
      return "Senha *A senha deve conter apenas caracteres comuns, evite utilizar caracteres especiais como ' e \".";
    }

    return;
  }

  public static isOrgIdValid(orgId: string): string | undefined {
    console.log('Checking if organization ID is valid...');

    if (!(Number(orgId) > 0)) {
      return "Id *Deve ser maior que 0 e se referir ao ID correspondente da sua organização.";
    }
    return;
  }
}


// Functions
/**
 * A method to validate an input.
 */
function validateField(field: HTMLInputElement, fieldName: string, label: HTMLLabelElement, validatorCallback: CallableFunction): void {
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

  const loginEmail = document.getElementById("loginEmail") as HTMLInputElement;
  if (Validator.isEmailValid(loginEmail.value)) return false;

  const loginPasswd = document.getElementById("loginPasswd") as HTMLInputElement;
  if (Validator.isPasswdValid(loginPasswd.value)) return false;

  errorElement.innerHTML = "";
  return true;
}


/**
 * A method to be executed on the register event.
 */
function registerAccount(event: Event) {
  event.preventDefault();

  const fieldsToCheck: any = {
    "registerName": Validator.isNameValid,
    "registerEmail": Validator.isEmailValid,
    "registerPasswd": Validator.isPasswdValid,
    "registerConfirmPasswd": Validator.isPasswdValid,
  };
  
  const fieldsToCheckKeys = Object.keys(fieldsToCheck);
  
  for (const index in fieldsToCheckKeys) {
    const fieldToCheckId = fieldsToCheckKeys[index];
    const validatorFunction = fieldsToCheck[fieldToCheckId];
  
    const fieldElement = document.getElementById(fieldToCheckId) as HTMLInputElement;
    if (validatorFunction(fieldElement.value)) return false;
  }

  errorElement.innerHTML = "";
  return true;
}

// Events
const nameField = document.getElementById('registerName') as HTMLInputElement;
nameField.onkeyup = () => {
  const nameLabel = document.getElementById('registerNameLabel') as HTMLLabelElement;
  validateField(nameField, 'Nome', nameLabel, Validator.isNameValid);
};

const emailField = document.getElementById('registerEmail') as HTMLInputElement;
emailField.onkeyup = () => {
  const emailLabel = document.getElementById('registerEmailLabel') as HTMLLabelElement;
  validateField(emailField, 'Email', emailLabel, Validator.isEmailValid);
};

const passwdField = document.getElementById('registerPasswd') as HTMLInputElement;
passwdField.onkeyup = () => {
  const passwdLabel = document.getElementById('registerPasswdLabel') as HTMLLabelElement;
  validateField(passwdField, 'Senha', passwdLabel, Validator.isPasswdValid);
};

const confirmPasswdField = document.getElementById('registerConfirmPasswd') as HTMLInputElement;
confirmPasswdField.onkeyup = () => {
  const confirmPasswdLabel = document.getElementById('registerConfirmPasswdLabel') as HTMLLabelElement;

  validateField(confirmPasswdField, 'Confirmar Senha', confirmPasswdLabel, Validator.isPasswdValid);
  if (passwdField.value == confirmPasswdField.value) {
    setLabelCorrect(confirmPasswdField, confirmPasswdLabel, 'Confirmar Senha');
  } else {
    setLabelIncorrect(confirmPasswdField, confirmPasswdLabel, 'A senha e a confirmação da senha precisam ser a mesma.');
  }
};