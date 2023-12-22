const navLink = document.querySelectorAll('.nav-link')
const pageSection = document.querySelectorAll('.page-section')
const bars = document.querySelector('.bars')
const nav = document.querySelector('.navbar')
const navbar = document.querySelector('.navbar-nav')
const contactLink = document.querySelector('.nav-item:last-child')

document.addEventListener('scroll', () => {
  if (window.scrollY > nav.offsetHeight) {
    nav.classList.add('scrolled')
  } else {
    nav.classList.remove('scrolled')
  }
})

// nav-links

navLink.forEach(nav => {
  nav.addEventListener("click", e => {
    removeActiveClasses()
    nav.classList.add('active')
  })
})

const removeActiveClasses = () => {
  navLink.forEach(nav => {
    nav.classList.remove('active')
  })
}

// navbar mobile responsive

bars.addEventListener("click", e => {
  navbar.classList.toggle('expanded')
})

// minimize the navbar when clicked outside
document.addEventListener('click', e => {
  const isClickedInsideNavbar = navbar.contains(e.target) || bars.contains(e.target);

  if (!isClickedInsideNavbar && navbar.classList.contains('expanded')) {
    navbar.classList.remove('expanded');
  }
})

//TypWriter Function

function typeWriter(sentence, containerId, callback) {
  document.getElementById(containerId);
  const textElement = document.getElementById('typer');
  const cursorElement = document.getElementById('cursor');

  let charIndex = 0;
  textElement.textContent = '';
  cursorElement.style.display = 'block';

  const typingInterval = setInterval(() => {
    if (charIndex < sentence.length) {
      textElement.textContent += sentence[charIndex];
      charIndex++;
    } else {
      clearInterval(typingInterval);
      cursorElement.style.display = 'none';
      setTimeout(() => {
        textElement.textContent = '';
        callback();
      }, 2000);
    }
  }, 70);
}

const sentences = [
  'Fullstack Developer',
  'UI/UX designer',
  'Freelancer',
];

let index = 0;

function typeSentences() {
  if (index < sentences.length) {
    typeWriter(sentences[index], 'text-container', typeSentences);
    index++;
  } else {
    index = 0;
    typeSentences();
  }
}

typeSentences();

// scrolling animation

function smoothScroll(target, duration) {
  const targetElement = document.querySelector(target);
  const navbarHeight = document.querySelector('.navbar').offsetHeight;
  const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
  const startPosition = window.scrollY;
  const distance = targetPosition - startPosition;
  let startTime = null;

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const ease = easeInOutCubic(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, ease);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }

  // Easing function
  function easeInOutCubic(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t * t + b;
    t -= 2;
    return (c / 2) * (t * t * t + 2) + b;
  }

  requestAnimationFrame(animation);
}

const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = link.getAttribute('href');
    const duration = 400;
    smoothScroll(target, duration);
  });
});





