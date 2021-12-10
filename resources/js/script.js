'use strict';

const headerEl = document.querySelector('.header');
const navbarEl = document.querySelector('.navbar');
const navbarBtnEl = document.querySelector('.navbar__btn');
const linksEl = document.querySelectorAll('a:link');

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

// Link management

const scrollLinks = function () {
  linksEl.forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const href = link.getAttribute('href');
      const dataGallery = link.getAttribute('data-gallery');
      if (href === '#') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (href !== '#' && href.startsWith('#')) {
        const sectionEl = document.querySelector(href);
        sectionEl.scrollIntoView({ behavior: 'smooth' });
      } else if (!dataGallery) {
        window.open(href, '_blank');
      }

      if (link.classList.contains('navbar__link'))
        headerEl.classList.toggle('nav-open');
    });
  });
};

scrollLinks();

// GLightbox
const lightbox = GLightbox();
