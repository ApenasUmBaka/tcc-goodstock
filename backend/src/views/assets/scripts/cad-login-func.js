const name = document.getElementById('name');
const email = document.getElementById('email');
const passwordup = document.getElementById('password-up');
const passwordin = document.getElementById('password-in');
const emailin = document.getElementById('email-in');
const contactForm = document.getElementById('contact-form');
const errorElement = document.getElementById('error');
const submitupBtn = document.getElementById('submit-up');
const submitinBtn = document.getElementById('submit-in');
  
const validate = (e) => {
  e.preventDefault();
 
  if (name.value.length < 3) {
    errorElement.innerHTML = 'Seu nome deve ter pelo menos 3 caracteres.';
    return false;
  } 
  
  if (!(email.value.includes('.') && (email.value.includes('@')))) {
    errorElement.innerHTML = 'Por favor coloque um endereço de email válido.';
    return false;
  } 

  if (!emailIsValid(email.value)) {
    errorElement.innerHTML = 'Por favor coloque um endereço de email válido.';
    return false;
  }

  if (!passwordValid(passwordup.value)){
	errorElement.innerHTML = 'A senha deve conter no minimo 8 digitos e máximo 20, uma caractere especial, letra maiuscula, letra minuscula e um numero.';
	return false;
  }

  e.preventDefault();
  setTimeout(function () {
    document.getElementById('form-up').reset();
  }, 6000);

  return true;

}

const emailIsValid = email => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const passwordValid = passwordup => {
	return /^ (? =. * [0-9]) (? =. * [az]) (? =. * [AZ]) (? =. * [@ # $% ^ & - + =() ]) (? = \\ S + $). {8, 20} $/.test(passwordup);
}

submitinBtn.addEventListener('click', validate);
submitupBtn.addEventListener('click', validate);