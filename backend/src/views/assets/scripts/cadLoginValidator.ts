// Data
const errorElement = document.getElementById("error-message") as HTMLDivElement;

// Classes
class Validator {
  public static isNameValid(name: string): boolean {
    console.log('Checking if name is valid...');
    if (name.length < 3) {
      errorElement.innerHTML = "Seu nome deve ter pelo menos 3 caracteres.";
      return false;
    }
    return true;
  }

  public static isEmailValid(email: string): boolean {
    console.log('Checking if email is valid...');

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/gi;
    if (!regexEmail.test(email)) {
      errorElement.innerHTML = "Por favor coloque um endereço de email válido.";
      return false;
    }
    return true;
  }

  public static isPasswdValid(passwd: string): boolean {
    console.log('Checking if password is valid...');

    const regexPasswd = /([^0-9a-z\ !#-&(-.:-@[-_{-~])/;
    if (!(passwd.length >= 8 && passwd.length <= 20)) {
      errorElement.innerHTML =
        "A senha deve conter no minimo 8 digitos e máximo 20.";
      return false;
    }

    if (regexPasswd.exec(passwd)) {
      errorElement.innerHTML =
        "A senha deve conter apenas caracteres comuns, evite utilizar caracteres especiais como ' e \".";
      return false;
    }

    return true;
  }

  public static isOrgIdValid(orgId: string): boolean {
    console.log('Checking if organization ID is valid...');

    if (!(Number(orgId) > 0)) {
      errorElement.innerHTML =
        "O ID da organização deve ser maior que 0 e se referir ao ID correspondente da sua organização.";
      return false;
    }
    return true;
  }
}

// Functions
function signinAccount(event: Event) {
  event.preventDefault();

  const loginEmail = document.getElementById("loginEmail") as HTMLInputElement;
  if (!Validator.isEmailValid(loginEmail.value)) return false;

  const loginPasswd = document.getElementById("loginPasswd") as HTMLInputElement;
  if (!Validator.isPasswdValid(loginPasswd.value)) return false;

  errorElement.innerHTML = "";
  return true;
}

function registerAccount(event: Event) {
  event.preventDefault();

  const fieldsToCheck: any = {
    "registerName": Validator.isNameValid,
    "registerEmail": Validator.isEmailValid,
    "registerPasswd": Validator.isPasswdValid,
    "registerOrgId": Validator.isOrgIdValid,
    "registerOrgPasswd": Validator.isPasswdValid,
  };
  
  const fieldsToCheckKeys = Object.keys(fieldsToCheck);
  
  for (const index in fieldsToCheckKeys) {
    const fieldToCheckId = fieldsToCheckKeys[index];
    const validatorFunction = fieldsToCheck[fieldToCheckId];
  
    const fieldElement = document.getElementById(fieldToCheckId) as HTMLInputElement;
    if (!validatorFunction(fieldElement.value)) return false;
  }

  errorElement.innerHTML = "";
  return true;
}