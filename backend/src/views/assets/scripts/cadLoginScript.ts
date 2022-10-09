// Data
const signUpButton = document.getElementById("signUp") as HTMLButtonElement;
const signInButton = document.getElementById("signIn") as HTMLButtonElement;
const container = document.getElementById("container") as HTMLDivElement;

// Functions
signUpButton.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});

signInButton.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});

if (window.location.pathname == "/register") {
  container.classList.add("right-panel-active");
}
