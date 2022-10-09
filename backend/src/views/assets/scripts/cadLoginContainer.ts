// Data
const container = document.getElementById("container") as HTMLDivElement;

// Functions
class ContainerController {
  public static changeToRegister() {
    container.classList.add("right-panel-active");
    window.history.replaceState('', '', '/register');

  }

  public static changeToLogin() {
    container.classList.remove("right-panel-active");
    window.history.replaceState('', '', '/login');
  }
}

// Events
const signUpButton = document.getElementById("signUp") as HTMLButtonElement;
signUpButton.addEventListener("click", ContainerController.changeToRegister);

const signInButton = document.getElementById("signIn") as HTMLButtonElement;
signInButton.addEventListener("click", ContainerController.changeToLogin);

// Code
if (window.location.pathname == "/register") ContainerController.changeToRegister();