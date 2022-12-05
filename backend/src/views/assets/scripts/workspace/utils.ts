// Functions
function setSidebarEvents() {
  const sidebar = document.getElementById("sidebar") as HTMLElement;

  const toggle = document.getElementById("toggle-button") as HTMLLIElement;
  toggle.addEventListener("click", () => {
    sidebar.classList.toggle("close");
  });

  const searchBtn = document.getElementById(
    "sidebar-searchBox"
  ) as HTMLLIElement;
  searchBtn.addEventListener("click", () => {
    sidebar.classList.remove("close");
  });
}

/**
 * A method to toggle the dark mode on the page.
 */
function setDarkModeEvents() {
  const modeSwitch = document.getElementById(
    "sidebar-toggle-theme-switch"
  ) as HTMLDivElement;

  modeSwitch.addEventListener("click", () => {
    const body = document.getElementsByTagName("body")[0];
    body.classList.toggle("dark");

    const modeText = document.getElementById(
      "sidebar-toggle-theme-text"
    ) as HTMLSpanElement;
    if (body.classList.contains("dark")) modeText.innerText = "Light mode";
    else modeText.innerText = "Dark mode";
  });
}

/**
 * A method to log out the current user from the server.
 */
async function logout() {
  window.location.replace("/logout");
}

// Events
setSidebarEvents();
setDarkModeEvents();
(document.getElementById("logout-button") as HTMLAnchorElement).onclick =
  logout;
