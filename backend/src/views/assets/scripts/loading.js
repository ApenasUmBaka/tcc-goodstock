const fadeOut = () => {
  const loaderWrapper = document.querySelector(".wrapper");
  loaderWrapper.classList.add("fade");
};

window.addEventListener("load", fadeOut);

var myVar;

function myFunction() {
  myVar = setTimeout(showPage, 5000);
}

function showPage() {
  document.getElementById("loader").style.display = "none";
  document.getElementById("myDiv").style.display = "block";
}
