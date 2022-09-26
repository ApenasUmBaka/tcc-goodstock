// Data
const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("signIn");
const container = document.getElementById("container");

// Functions
signUpButton.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});

signInButton.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});

if (window.location.pathname == '/register') {
  container.classList.add("right-panel-active");
} else {
  container.classList.add("right-panel-active");
  container.classList.remove("right-panel-active");
}