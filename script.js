/* ─── Void Studio — Interactions ──────────────────────────────── */
import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';

(function () {
  'use strict';

  /* ── WebGL Shader (Three.js) ─────────────────────────────────── */
  const heroCanvas = document.getElementById('hero-canvas');

  if (heroCanvas) {
    const vertexShader = `
      attribute vec3 position;
      void main() {
        gl_Position = vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      precision highp float;
      uniform vec2 resolution;
      uniform float time;
      uniform float xScale;
      uniform float yScale;
      uniform float distortion;

      void main() {
        vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);

        float d = length(p) * distortion;

        float rx = p.x * (1.0 + d);
        float gx = p.x;
        float bx = p.x * (1.0 - d);

        float r = 0.05 / abs(p.y + sin((rx + time) * xScale) * yScale);
        float g = 0.05 / abs(p.y + sin((gx + time) * xScale) * yScale);
        float b = 0.05 / abs(p.y + sin((bx + time) * xScale) * yScale);

        gl_FragColor = vec4(r, g, b, 1.0);
      }
    `;

    const scene    = new THREE.Scene();
    const camera   = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, -1);
    const renderer = new THREE.WebGLRenderer({ canvas: heroCanvas });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(new THREE.Color(0x000000));

    const uniforms = {
      resolution:  { value: [window.innerWidth, window.innerHeight] },
      time:        { value: 0.0 },
      xScale:      { value: 1.0 },
      yScale:      { value: 0.5 },
      distortion:  { value: 0.05 },
    };

    const positions = new THREE.BufferAttribute(new Float32Array([
      -1.0, -1.0, 0.0,
       1.0, -1.0, 0.0,
      -1.0,  1.0, 0.0,
       1.0, -1.0, 0.0,
      -1.0,  1.0, 0.0,
       1.0,  1.0, 0.0,
    ]), 3);

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', positions);

    const material = new THREE.RawShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      side: THREE.DoubleSide,
    });

    scene.add(new THREE.Mesh(geometry, material));

    function resizeShader() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setSize(w, h, false);
      uniforms.resolution.value = [w, h];
    }

    function animateShader() {
      uniforms.time.value += 0.01;
      renderer.render(scene, camera);
      requestAnimationFrame(animateShader);
    }

    resizeShader();
    animateShader();
    window.addEventListener('resize', resizeShader, { passive: true });
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
