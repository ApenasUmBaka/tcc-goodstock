// Data
const errorElement = document.getElementById("error-sig-up") as HTMLDivElement;

// Classes
class Validator {
  public static isNameValid(name: string): boolean {
    if (name.length < 3) {
      errorElement.innerHTML = "Seu nome deve ter pelo menos 3 caracteres.";
      return false;
    }
    return true;
  }

  public static isEmailValid(email: string): boolean {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regexEmail.test(email)) {
      errorElement.innerHTML = "Por favor coloque um endereço de email válido.";
      return false;
    }
    return true;
  }

  public static isPasswdValid(passwd: string): boolean {
    const regexPasswd = /([^0-9a-z\ !#-&(-.:-@[-_{-~])/g;

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
}

// Functions
function registerAccount(event: Event) {
  const registerName = document.getElementById(
    "registerName"
  ) as HTMLInputElement;
  if (!Validator.isNameValid(registerName.value)) return false;

  const registerEmail = document.getElementById(
    "registerEmail"
  ) as HTMLInputElement;
  if (!Validator.isEmailValid(registerEmail.value)) return false;

  const registerPasswd = document.getElementById(
    "registerPasswd"
  ) as HTMLInputElement;
  console.log(registerPasswd.value);
  if (!Validator.isPasswdValid(registerPasswd.value)) return false;

  return true;
}

function signinAccount(event: Event) {
  const loginEmail = document.getElementById("loginEmail") as HTMLInputElement;
  if (!Validator.isEmailValid(loginEmail.value)) return false;

  const loginPasswd = document.getElementById(
    "loginPasswd"
  ) as HTMLInputElement;
  if (!Validator.isPasswdValid(loginPasswd.value)) return false;

  return true;
}

// Events
const formRegister = document.getElementById("form-up") as HTMLFormElement;
formRegister.onsubmit = registerAccount;

const formSignIn = document.getElementById("form-in") as HTMLFormElement;
formSignIn.onsubmit = signinAccount;
