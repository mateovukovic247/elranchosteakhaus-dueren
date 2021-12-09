'use strict';

const headerEl = document.querySelector('.header');
const navbarBtnEl = document.querySelector('.navbar__btn');

const toggleNavState = function () {
  navbarBtnEl.addEventListener('click', function () {
    headerEl.classList.toggle('nav-open');
  });
};

toggleNavState();

// GLightbox
const lightbox = GLightbox();
