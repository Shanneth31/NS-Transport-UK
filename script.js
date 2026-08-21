/* ============================================================
   NS TRANSPORT UK — Interactions
============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Measure header height so the hero can size around it exactly ---------- */
  const header = document.querySelector('.site-header');
  const setHeaderHeight = () => {
    if (header) {
      document.documentElement.style.setProperty('--header-h', header.offsetHeight + 'px');
    }
  };
  setHeaderHeight();
  window.addEventListener('resize', setHeaderHeight);
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(setHeaderHeight);
  }

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('is-open');
      navToggle.classList.toggle('is-open', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('is-open');
        navToggle.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  /* ---------- Contact form — submits to FormSubmit.co (no backend needed) ---------- */
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');

  if (form && status) {
    form.addEventListener('submit', (e) => {
      const firstName = document.getElementById('firstName').value.trim();
      const email = document.getElementById('email').value.trim();

      if (!firstName || !email) {
        e.preventDefault();
        status.textContent = 'Please fill in your name and email so we can get back to you.';
        status.classList.remove('form-status--success');
        return;
      }

      // Let the browser submit the form to FormSubmit directly — this is a real
      // page navigation, not a fetch/AJAX call, so it works whether the site is
      // opened as a local file or hosted live (no CORS restrictions apply).
      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';
      }
      status.textContent = 'Sending your enquiry…';
      status.classList.remove('form-status--success');
      // form submits natively from here — no preventDefault
    });
  }

  /* ---------- Contact form — success banner after FormSubmit redirects back ---------- */
  if (form && status && window.location.hash === '#sent') {
    status.textContent = "Thanks — your enquiry has been sent. We'll be in touch shortly.";
    status.classList.add('form-status--success');
    history.replaceState(null, '', window.location.pathname + window.location.search + '#contact');
  }

});
