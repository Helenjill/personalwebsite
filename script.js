const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');
const year = document.getElementById('year');
const headshot = document.getElementById('headshot');
const headshotFallback = document.getElementById('headshot-fallback');
const contactForm = document.getElementById('contact-form');

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

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('contact-name')?.value?.trim() || '';
    const email = document.getElementById('contact-email')?.value?.trim() || '';
    const message = document.getElementById('contact-message')?.value?.trim() || '';

    if (!name || !email || !message) {
      alert('Please complete name, email, and message before submitting.');
      return;
    }

    const subject = encodeURIComponent(`Website message from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    window.location.href = `mailto:helenjillrice@gmail.com?subject=${subject}&body=${body}`;
  });
}
