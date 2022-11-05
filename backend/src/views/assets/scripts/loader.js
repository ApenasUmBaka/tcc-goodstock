const fadeOut = () => {
    const loaderBox =
    document.querySelector('.wrapper');
    loaderBox.classList.add('fade');
}
window.addEventListener('load', fadeOut)