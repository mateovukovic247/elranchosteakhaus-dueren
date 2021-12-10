'use strict';

const headerEl = document.querySelector('.header');
const navbarEl = document.querySelector('.navbar');
const navbarBtnEl = document.querySelector('.navbar__btn');
const linksEl = document.querySelectorAll('a:link');
const formEl = document.querySelector('.form');
const formSpinnerEl = document.querySelector('.form__spinner');
const formResponseEl = document.querySelector('.form__response');

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

// Handle form submit

const handleFormSubmit = function () {
  formEl.addEventListener('submit', function (event) {
    event.preventDefault();
    formSpinnerEl.style.display = 'flex';
    const data = new FormData(event.target);
    fetch(formEl.action, {
      method: formEl.method,
      body: data,
      headers: {
        Accept: 'application/json',
      },
    })
      .then(response => {
        formResponseEl.textContent =
          'Ihre Nachricht wurde erfolgreich gesendet!';
        formResponseEl.classList.add('form__response--succes');
        formEl.reset();
      })
      .catch(error => {
        formResponseEl.textContent =
          'Etwas ist schiefgelaufen, versuchen Sie es in einigen Momenten erneut!';
        formResponseEl.classList.remove('form__response--succes');
      })
      .finally(() => {
        formSpinnerEl.style.display = 'none';
      });
  });
};

handleFormSubmit();

// Fix Flexbox gap if needed

const fixFlexboxGap = function () {
  const flex = document.createElement('div');
  flex.style.display = 'flex';
  flex.style.flexDirection = 'column';
  flex.style.rowGap = '1px';

  flex.appendChild(document.createElement('div'));
  flex.appendChild(document.createElement('div'));

  document.body.appendChild(flex);
  const isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);

  if (!isSupported) document.body.classList.add('no-flexbox-gap');
};

fixFlexboxGap();

// GLightbox
const lightbox = GLightbox();
