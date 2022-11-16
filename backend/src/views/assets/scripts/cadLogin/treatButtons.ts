// Data
const signUpButton = document.getElementById('signUp') as HTMLButtonElement;
const signInButton = document.getElementById('signIn') as HTMLButtonElement;

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
      'showRegisterPasswd', 'showRegisterConfirmPasswd', 'showRegisterOrgPasswd', 'showRegisterConfirmOrgPasswd', 'showLoginPasswd', 'showLoginOrgPasswd'];
    showPasswdElements.forEach(elementName => {
      const showPasswdElement = document.getElementById(elementName) as HTMLElement;
      const passwdElementName = elementName[4].toLowerCase() + elementName.slice(5);
      const passwdElement = document.getElementById(passwdElementName) as HTMLInputElement;

      showPasswdElement.onclick = () => {
        changePasswordVisibility(passwdElement);
      }
    });
    }


// Events
setShowPasswdEvent();

signInButton.addEventListener('click', ContainerController.changeToLogin);
signUpButton.addEventListener('click', ContainerController.changeToRegister);
