const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');
const year = document.getElementById('year');
const headshot = document.getElementById('headshot');
const headshotFallback = document.getElementById('headshot-fallback');

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
  });
}

if (year) {
  year.textContent = new Date().getFullYear();
}

// Hardwired GitHub photo path
const PHOTO_PATH = 'images/HelenRiceHeadshot.JPG';

if (headshot) {
  headshot.src = PHOTO_PATH;
  headshot.addEventListener('error', () => {
    if (headshotFallback) headshotFallback.hidden = false;
  });
}
