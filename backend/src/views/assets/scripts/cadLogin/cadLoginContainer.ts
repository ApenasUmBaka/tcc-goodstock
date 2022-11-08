// Data
const container = document.getElementById('container') as HTMLDivElement;

const signUpButton = document.getElementById('signUp') as HTMLButtonElement;
const signInButton = document.getElementById('signIn') as HTMLButtonElement;

// Classes
class ContainerController {
  public static changeToRegister() {
    container.classList.add('right-panel-active');
    window.history.replaceState('', '', '/register');
  }

  public static changeToLogin() {
    container.classList.remove('right-panel-active');
    window.history.replaceState('', '', '/login');
  }
}


// Functions
/**
 * A method to set the event to all show password events.
 */
function changePasswordVisibility(passwdInput: HTMLInputElement) {
  const setAttrTo = passwdInput.getAttribute('type') == 'text' ? "password" : "text";
  passwdInput.setAttribute('type', setAttrTo);
}


/**
 * A method to set all the show password button's event.
 */
function setShowPasswdEvent() {
  const showPasswdElements: string[] = [
    'showPasswd', 'showLoginPasswd', 'showConfirmPasswd', 'showRegisterOrgPasswd', 
    'showRegisterConfirmOrgPasswd', 'showLoginOrgPasswd'];

  showPasswdElements.forEach(elementName => {
    const showPasswdElement = document.getElementById(elementName) as HTMLButtonElement;
    const passwdElement = document.getElementById(elementName.slice(3)) as HTMLInputElement;

    showPasswdElement.onclick = () => {
      changePasswordVisibility(passwdElement);
    }
  });
}

// Events
signInButton.addEventListener('click', ContainerController.changeToLogin);
signUpButton.addEventListener('click', ContainerController.changeToRegister);

// Code
setShowPasswdEvent();
if (window.location.pathname == '/register') ContainerController.changeToRegister();
