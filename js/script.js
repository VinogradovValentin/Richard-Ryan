'use strict'


// Add Event on multiple element

const AddEventOnElements = function(elements, eventType, callback) {
    for(let i = 0; i < elements.length; i++) {
        elements[i].addEventListener(eventType, callback);
    }
}

// PRELOADING

const loadingElement = document.querySelector('[data-loading]');

window.addEventListener('load', function() {
    loadingElement.classList.add('loaded');
    document.body.classList.remove('active');
})



// MOBILE NAV TOGGLE

const [navTogglers, navLinks, navbar, overlay] = [
    document.querySelectorAll('[data-nav-toggler]'),
    document.querySelectorAll('[data-nav-link]'),
    document.querySelector('[data-navbar]'),
    document.querySelector('[data-overlay]'),
]

const toggleNav = function() {
    navbar.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.classList.toggle('active');
}

AddEventOnElements(navTogglers, 'click', toggleNav);

const closeNav = function() {
    navbar.classList.remove('active');
    overlay.classList.remove('active');
    document.body.classList.remove('active');
}

AddEventOnElements(navLinks, 'click', closeNav);



// HEADER

const header = document.querySelector('[data-header]');

const activeElementOnScroll = function() {
    if(window.scrollY > 50) {
        header.classList.add('active');
    } else {
        header.classList.remove('active');
    }
}

window.addEventListener('scroll', activeElementOnScroll);



/* TEXT ANIMATION EFFECT FOR HERO SECTION */

const letterBoxes = document.querySelectorAll("[data-letter-effect]");

let activeLetterBoxIndex = 0;
let lastActiveLetterBoxIndex = 0;
let totalLetterBoxDelay = 0;

const setLetterEffect = function () {

  // loop through all letter boxes
  for (let i = 0; i < letterBoxes.length; i++) {
    // set initial animation delay
    let letterAnimationDelay = 0;

    // get all character from the current letter box
    const letters = letterBoxes[i].textContent.trim();
    // remove all character from the current letter box
    letterBoxes[i].textContent = "";

    // loop through all letters
    for (let j = 0; j < letters.length; j++) {

      // create a span
      const span = document.createElement("span");

      // set animation delay on span
      span.style.animationDelay = `${letterAnimationDelay}s`;

      // set the "in" class on the span, if current letter box is active
      // otherwise class is "out"
      if (i === activeLetterBoxIndex) {
        span.classList.add("in");
      } else {
        span.classList.add("out");
      }

      // pass current letter into span
      span.textContent = letters[j];

      // add space class on span, when current letter contain space
      if (letters[j] === " ") span.classList.add("space");

      // pass the span on current letter box
      letterBoxes[i].appendChild(span);

      // skip letterAnimationDelay when loop is in the last index
      if (j >= letters.length - 1) break;
      // otherwise update
      letterAnimationDelay += 0.05;

    }

    // get total delay of active letter box
    if (i === activeLetterBoxIndex) {
      totalLetterBoxDelay = Number(letterAnimationDelay.toFixed(2));
    }

    // add active class on last active letter box
    if (i === lastActiveLetterBoxIndex) {
      letterBoxes[i].classList.add("active");
    } else {
      letterBoxes[i].classList.remove("active");
    }

  }

  setTimeout(function () {
    lastActiveLetterBoxIndex = activeLetterBoxIndex;

    // update activeLetterBoxIndex based on total letter boxes
    activeLetterBoxIndex >= letterBoxes.length - 1 ? activeLetterBoxIndex = 0 : activeLetterBoxIndex++;

    setLetterEffect();
  }, (totalLetterBoxDelay * 1000) + 3000);

}

// call the letter effect function after window loaded
window.addEventListener("load", setLetterEffect);



/* BACK TO TOP BUTTON */
const backToTopBtn = document.querySelector('[data-back-top-btn]');

window.addEventListener('scroll', function() {
    const bodyHeight = document.body.scrollHeight;
    const windowHeight = window.innerHeight;
    const scrollEndPos = bodyHeight - windowHeight;
    const totalScrollPercent = (window.scrollY / scrollEndPos) * 100;

    backToTopBtn.textContent = `${totalScrollPercent.toFixed(0)}%`;

    // visible back to top btn when scrolled 5% of the page
    if(totalScrollPercent > 5) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});




/* SCROLL REVEAL */
const revealElements = document.querySelectorAll("[data-reveal]");

const scrollReveal = function () {
  for (let i = 0; i < revealElements.length; i++) {
    const elementIsInScreen = revealElements[i].getBoundingClientRect().top < window.innerHeight / 1.15;

    if (elementIsInScreen) {
      revealElements[i].classList.add("revealed");
    } else {
      revealElements[i].classList.remove("revealed");
    }
  }
}

window.addEventListener("scroll", scrollReveal);

scrollReveal();



/* CUSTOM CURSOR */
const cursor = document.querySelector('[data-cursor]');
const anchorElements = document.querySelectorAll('a');
const buttons = document.querySelectorAll('button');

// Change cursorElement position based on cursor move
document.body.addEventListener('mousemove', function(event) {
    setTimeout(function() {
        cursor.style.top = `${event.clientY}px`;
        cursor.style.left = `${event.clientX}px`;
    });
});

// Add cursor hovered class
const hoverActive = function() {
    cursor.classList.add('hovered');
}

// Remove cursor hovered class
const hoverDeactive = function() {
    cursor.classList.remove('hovered');
}

// Add hover effect on cursor, when hover on any button or hyperlink
AddEventOnElements(anchorElements, 'mouseover', hoverActive);
AddEventOnElements(anchorElements, 'mouseout', hoverDeactive);
AddEventOnElements(buttons, 'mouseover', hoverActive);
AddEventOnElements(buttons, 'mouseout', hoverDeactive);

// Add disabled class on cursorElement, when mouse out of body
document.body.addEventListener('mouseout', function() {
    cursor.classList.add('disabled');
});

// Add disabled class on cursorElement, when mouse in the body
document.body.addEventListener('mouseover', function() {
    cursor.classList.remove('disabled');
});