/* ============================================================
   JEJU ISLAND GUIDE — script.js
   ============================================================ */

// ─── BACK TO TOP ─────────────────────────────────────────────
const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ─── ACTIVE NAV HIGHLIGHT ─────────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const observerOptions = {
  root: null,
  rootMargin: '-40% 0px -55% 0px',
  threshold: 0,
};

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        }
      });
    }
  });
}, observerOptions);

sections.forEach((section) => sectionObserver.observe(section));

// ─── MOBILE NAV TOGGLE ───────────────────────────────────────
const navToggle = document.querySelector('.nav-toggle');
const navLinksList = document.getElementById('nav-links');

navToggle.addEventListener('click', () => {
  navLinksList.classList.toggle('open');
});

// Close nav when a link is clicked on mobile
navLinksList.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinksList.classList.remove('open');
  });
});

// ─── SMOOTH SCROLL OFFSET (accounts for sticky nav height) ───
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const targetId = anchor.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (!target) return;
    e.preventDefault();
    const navHeight = document.getElementById('site-header').offsetHeight;
    const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});
