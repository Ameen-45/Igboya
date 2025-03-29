// Hamburger menu functionality
const menuToggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');

menuToggle.addEventListener('click', function(e) {
  e.stopPropagation();
  menu.classList.toggle('show');
});

// Close menu when clicking outside or scrolling
document.addEventListener('click', function(e) {
  if (!menu.contains(e.target) && e.target !== menuToggle) {
    menu.classList.remove('show');
  }
});

window.addEventListener('scroll', function() {
  if (menu.classList.contains('show')) {
    menu.classList.remove('show');
  }
});