'use strict';

///////////////////////////////////////

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const tabContainer = document.querySelector('.operations__tab-container');
const tabsBtn = document.querySelectorAll('.operations__tab');
const tabsContent = document.querySelectorAll('.operations__content');
/*
--------------------------
/\**\/ Modal window /\**\/
--------------------------
*/
const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// loop through all open modal buttons
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

// close modal when clicking on Esc key
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// cookie-message
/*
const message = document.createElement('div');
message.classList.add('cookie-message');

message.innerHTML = `We use cookies for improvement website functionality and analytics <button class="btn btn--close-cookie">Got it</button>`;

document.body.append(message);

// remove cookie-message
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    // message.remove();
    message.parentElement.removeChild(message);
  });

message.style.backgroundColor = '#333';
*/

/*
--------------------------
/\**\/ Smooth Scrolling /\**\/
--------------------------
*/
const btnScroll = document.querySelector('.btn--scroll-to');
const section1 = document.getElementById('section--1');

btnScroll.addEventListener('click', () => {
  // old way for scrolling to the element
  /*
  window.scrollTo({
    left: section1.getBoundingClientRect().left + window.pageXOffset,
    top: section1.getBoundingClientRect().top + window.pageYOffset,
    behavior: 'smooth',
  });
  */
  // modern way for scrolling to the element
  section1.scrollIntoView({ behavior: 'smooth' });
});

/*
--------------------------
/\**\/ Page Navigation /\**\/
--------------------------
*/
// Page Navigation with smooth scrolling [Event Delegation]
//==\\//==\\//==\\//==\\//==\\//==\\//==\\//==\\//==\\//==\\
// 1.add event listener to common parent element
// 2.determine what element orginated the event
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  // Matching Strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

/*
--------------------------
/\**\/ Tapped Component /\**\/
--------------------------
*/

tabContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  // Guard clause
  if (!clicked) return;

  // Remove active classes
  tabsBtn.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  // Add Active class
  clicked.classList.add('operations__tab--active');
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

/*
----------------------------------
/\**\/ Navigation Menu Fade /\**\/
----------------------------------
*/
const handleHoverNavigation = function (e, opacity) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = e.target.closest('.nav').querySelectorAll('.nav__link');

    siblings.forEach(el => {
      if (link !== el) el.style.opacity = opacity;
    });
  }
};

const nav = document.querySelector('.nav');
nav.addEventListener('mouseover', function (e) {
  handleHoverNavigation(e, 0.5);
});

nav.addEventListener('mouseout', function (e) {
  handleHoverNavigation(e, 1);
});

/*
----------------------------------
/\**\/ Sticky Navigation /\**\/
----------------------------------
*/
// old way
/*
const sectionCoords = section1.getBoundingClientRect();
window.addEventListener('scroll', function () {
  if (window.scrollY > sectionCoords.top) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
});
*/

// better way for sticky nav
const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNavFunc = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};

const stickyNavOptions = {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
};
const headerObserver = new IntersectionObserver(
  stickyNavFunc,
  stickyNavOptions
);
headerObserver.observe(header);

/*
----------------------------------
/\**\/ Revealing Sections while scrolling /\**\/
----------------------------------
*/

const revealSectionFunc = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  // to make the action once when open website for the first time for better performance
  observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revealSectionFunc, {
  root: null,
  threshold: 0.15,
});

const sections = document.querySelectorAll('.section');
sections.forEach(section => {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});
