// Functions
function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

function backToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

// Events
// When the user clicks on the button, scroll to the top of the document
const mybutton = document.getElementById("btn-top") as HTMLButtonElement;
mybutton.addEventListener("click", backToTop);

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = scrollFunction;
