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

const headshotUpload = document.getElementById('headshot-upload');

if (headshot && headshotUpload) {
  const savedImage = localStorage.getItem('headshotDataUrl');
  if (savedImage) {
    headshot.src = savedImage;
    if (headshotFallback) headshotFallback.hidden = true;
  }

  headshotUpload.addEventListener('change', (event) => {
    const file = event.target.files && event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result;
      if (typeof dataUrl === 'string') {
        headshot.src = dataUrl;
        localStorage.setItem('headshotDataUrl', dataUrl);
        if (headshotFallback) headshotFallback.hidden = true;
      }
    };
    reader.readAsDataURL(file);
  });
}
