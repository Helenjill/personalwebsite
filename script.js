const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');
const year = document.getElementById('year');

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
  });
}

if (year) {
  year.textContent = new Date().getFullYear();
}

const headshot = document.getElementById('headshot');
const headshotFallback = document.getElementById('headshot-fallback');

if (headshot && headshotFallback) {
  headshot.addEventListener('error', () => {
    headshotFallback.hidden = false;
  });
}
