'use strict';

const headerEl = document.querySelector('.header');
const navbarBtnEl = document.querySelector('.navbar__btn');
const navbarEl = document.querySelector('.navbar');

// Toggle navigation state
const toggleNavState = function () {
  navbarBtnEl.addEventListener('click', function () {
    headerEl.classList.toggle('nav-open');
  });
};

toggleNavState();

// Toggle navbar

const toggleNavbar = function () {
  const observer = new IntersectionObserver(
    function (entries) {
      const ent = entries[0];
      if (!ent.isIntersecting) {
        navbarEl.classList.add('sticky');
      } else {
        navbarEl.classList.remove('sticky');
      }
    },
    {
      root: null,
      rootMargin: '-10%',
      threshold: 0,
    }
  );

  observer.observe(headerEl);
};

toggleNavbar();

// GLightbox
const lightbox = GLightbox();
