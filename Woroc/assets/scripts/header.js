const menuToggle = document.getElementById('mobile-menu');
const menu = document.querySelector('.menu');

menuToggle.addEventListener('click', function () {
    menu.classList.toggle('show');
});