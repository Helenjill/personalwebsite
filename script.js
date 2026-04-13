const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');
const year = document.getElementById('year');
const headshot = document.getElementById('headshot');
const headshotFallback = document.getElementById('headshot-fallback');
const headshotUpload = document.getElementById('headshot-upload');

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
  });
}

if (year) {
  year.textContent = new Date().getFullYear();
}

// Update this value if your GitHub image uses a different path or filename.
const PHOTO_PATH = 'headshot.jpg';
const PHOTO_CANDIDATES = [
  PHOTO_PATH,
  'Headshot.jpg',
  'headshot.jpeg',
  'headshot.png',
  'images/headshot.jpg',
  'images/headshot.jpeg',
  'assets/headshot.jpg',
  'assets/headshot.jpeg',
  'profile.jpg',
  'profile.jpeg',
  'profile.png'
];

function loadFirstWorkingPhoto(img, paths) {
  return new Promise((resolve) => {
    let i = 0;

    const tryNext = () => {
      if (i >= paths.length) {
        resolve(false);
        return;
      }

      const candidate = paths[i++];
      const testImg = new Image();
      testImg.onload = () => {
        img.src = candidate;
        resolve(true);
      };
      testImg.onerror = tryNext;
      testImg.src = candidate;
    };

    tryNext();
  });
}

async function setupHeadshot() {
  if (!headshot) return;

  const savedImage = localStorage.getItem('headshotDataUrl');
  if (savedImage) {
    headshot.src = savedImage;
    if (headshotFallback) headshotFallback.hidden = true;
    return;
  }

  const found = await loadFirstWorkingPhoto(headshot, PHOTO_CANDIDATES);
  if (!found && headshotFallback) {
    headshotFallback.hidden = false;
  }
}

if (headshot && headshotUpload) {
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

setupHeadshot();
