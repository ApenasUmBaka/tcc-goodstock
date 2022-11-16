// Data
const container = document.getElementById("container") as HTMLDivElement;

// Functions
class ContainerController {
  public static changeToRegister() {
    container.classList.add("right-panel-active");
    window.history.replaceState("", "", "/register");
  }

  public static changeToLogin() {
    container.classList.remove("right-panel-active");
    window.history.replaceState("", "", "/login");
  }

  public static changePasswordVisibility(passwdInput: HTMLInputElement) {
    if (passwdInput.getAttribute("type") == "text") {
      passwdInput.setAttribute("type", "password");
    } else {
      passwdInput.setAttribute("type", "text");
    }
  }
}

// Events
const signUpButton = document.getElementById("signUp") as HTMLButtonElement;
signUpButton.addEventListener("click", ContainerController.changeToRegister);

const signInButton = document.getElementById("signIn") as HTMLButtonElement;
signInButton.addEventListener("click", ContainerController.changeToLogin);

// Password visibility
// Login Passwd.
const loginPasswdVisiblityButton = document.getElementById(
  "showLoginPasswd"
) as HTMLButtonElement;
loginPasswdVisiblityButton.addEventListener("click", () => {
  const passwdInput = document.getElementById(
    "loginPasswd"
  ) as HTMLInputElement;
  ContainerController.changePasswordVisibility(passwdInput);
});

// Register Passwd.
const passwdVisiblityButton = document.getElementById(
  "showPasswd"
) as HTMLButtonElement;
passwdVisiblityButton.addEventListener("click", () => {
  const passwdInput = document.getElementById(
    "registerPasswd"
  ) as HTMLInputElement;
  ContainerController.changePasswordVisibility(passwdInput);
});

const confirmPasswdVisiblityButton = document.getElementById(
  "showConfirmPasswd"
) as HTMLButtonElement;
confirmPasswdVisiblityButton.addEventListener("click", () => {
  const passwdInput = document.getElementById(
    "registerConfirmPasswd"
  ) as HTMLInputElement;
  ContainerController.changePasswordVisibility(passwdInput);
});

// Register customer with non-existing organization.
const registerOrgPasswdButton = document.getElementById(
  "showRegisterOrgPasswd"
) as HTMLButtonElement;
confirmPasswdVisiblityButton.addEventListener("click", () => {
  const passwdInput = document.getElementById(
    "registerOrgPasswd"
  ) as HTMLInputElement;
  ContainerController.changePasswordVisibility(passwdInput);
});

const registerConfirmOrgPasswdButton = document.getElementById(
  "showRegisterConfirmOrgPasswd"
) as HTMLButtonElement;
confirmPasswdVisiblityButton.addEventListener("click", () => {
  const passwdInput = document.getElementById(
    "registerConfirmOrgPasswd"
  ) as HTMLInputElement;
  ContainerController.changePasswordVisibility(passwdInput);
});

// Register customer with existing organization.
const loginOrgPasswdButton = document.getElementById(
  "showLoginOrgPasswd"
) as HTMLButtonElement;
confirmPasswdVisiblityButton.addEventListener("click", () => {
  const passwdInput = document.getElementById(
    "loginOrgPasswd"
  ) as HTMLInputElement;
  ContainerController.changePasswordVisibility(passwdInput);
});

// Code
if (window.location.pathname == "/register")
  ContainerController.changeToRegister();
