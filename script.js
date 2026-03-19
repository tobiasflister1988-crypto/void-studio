/* ─── Void Studio — Interactions ──────────────────────────────── */
import { Application } from 'https://unpkg.com/@splinetool/runtime/build/runtime.js';

(function () {
  'use strict';

  /* ── Spline 3D Scene ─────────────────────────────────────────── */
  const splineCanvas = document.getElementById('spline-canvas');

  if (splineCanvas) {
    const app = new Application(splineCanvas);
    app.load('https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode');
  }


  /* ── Nav: transparent → frosted glass on scroll ──────────────── */
  const nav = document.getElementById('nav');

  function updateNav() {
    if (window.scrollY > 80) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();


  /* ── Scroll reveal via IntersectionObserver ───────────────────── */
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {

    const revealEls = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    revealEls.forEach((el) => observer.observe(el));

  } else {
    document.querySelectorAll('.reveal').forEach((el) => el.classList.add('visible'));
  }


  /* ── Smooth scroll for anchor links ──────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

})();
