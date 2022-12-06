// Data
const container = document.getElementById("container") as HTMLDivElement;

// Classes
class ContainerController {
  public static changeToRegister() {
    container.classList.add("right-panel-active");
    window.history.replaceState("", "", "/register");
  }

  public static changeToLogin() {
    container.classList.remove("right-panel-active");
    window.history.replaceState("", "", "/login");
  }
}

// Code
if (window.location.pathname == "/register")
  ContainerController.changeToRegister();
