/* ─── Void Studio — Interactions ──────────────────────────────── */
import { Application } from 'https://unpkg.com/@splinetool/runtime/build/runtime.js';

(function () {
  'use strict';

  /* ── Spline 3D Scene ─────────────────────────────────────────── */
  const splineCanvas = document.getElementById('spline-canvas');

  if (splineCanvas) {
    const app = new Application(splineCanvas);
    app.load('https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode').then(() => {
      // Remove Spline scene background
      if (app._renderer) {
        app._renderer.setClearColor(0x000000, 0);
      }
      if (app._scene) {
        app._scene.background = null;
      }
    });
  }


  /* ── Gooey Text Morphing ──────────────────────────────────────── */
  const gooeyTexts = ['Logos', 'Websites', 'Brands', 'Identity'];
  const morphTime = 1;
  const cooldownTime = 0.25;

  const text1El = document.getElementById('gooey-text1');
  const text2El = document.getElementById('gooey-text2');

  if (text1El && text2El) {
    let textIndex = gooeyTexts.length - 1;
    let time = new Date();
    let morph = 0;
    let cooldown = cooldownTime;

    text1El.textContent = gooeyTexts[textIndex % gooeyTexts.length];
    text2El.textContent = gooeyTexts[(textIndex + 1) % gooeyTexts.length];

    function setMorph(fraction) {
      text2El.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
      text2El.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;
      fraction = 1 - fraction;
      text1El.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
      text1El.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;
    }

    function doCooldown() {
      morph = 0;
      text2El.style.filter = '';
      text2El.style.opacity = '100%';
      text1El.style.filter = '';
      text1El.style.opacity = '0%';
    }

    function doMorph() {
      morph -= cooldown;
      cooldown = 0;
      let fraction = morph / morphTime;
      if (fraction > 1) {
        cooldown = cooldownTime;
        fraction = 1;
      }
      setMorph(fraction);
    }

    function animateGooey() {
      requestAnimationFrame(animateGooey);
      const newTime = new Date();
      const shouldIncrementIndex = cooldown > 0;
      const dt = (newTime.getTime() - time.getTime()) / 1000;
      time = newTime;
      cooldown -= dt;
      if (cooldown <= 0) {
        if (shouldIncrementIndex) {
          textIndex = (textIndex + 1) % gooeyTexts.length;
          text1El.textContent = gooeyTexts[textIndex % gooeyTexts.length];
          text2El.textContent = gooeyTexts[(textIndex + 1) % gooeyTexts.length];
        }
        doMorph();
      } else {
        doCooldown();
      }
    }

    animateGooey();
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
