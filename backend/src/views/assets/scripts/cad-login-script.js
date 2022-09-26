// Libs
import CookieModel from "/assets/scripts/cookieModel.js";

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
// Conexão entre a tela inicial com o panel-right e panel-left

// Code
if (CookieModel.getCookie('loginPageStatus') == 'register') {
  container.classList.add("right-panel-active");
}