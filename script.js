const navLink = document.querySelectorAll('.nav-link')
const pageSection = document.querySelectorAll('.page-section')
const bars = document.querySelector('.bars')
const nav = document.querySelector('.navbar')
const navbar = document.querySelector('.navbar-nav')
const contactLink = document.querySelector('.nav-item:last-child')

// contact form
const contactInputs = document.querySelectorAll(['.contact-input input', '.contact-input textarea'])
const form = document.getElementById('contact-form')


document.addEventListener('scroll', () => {
  if (window.scrollY > nav.offsetHeight) {
    nav.classList.add('scrolled')
  } else {
    nav.classList.remove('scrolled')
  }
})

bars.addEventListener("click", () => {
  navbar.classList.toggle('expanded')
  bars.classList.toggle('active')
})

// minimize the navbar when clicked outside
document.addEventListener('click', e => {
  const isClickedInsideNavbar = navbar.contains(e.target) || bars.contains(e.target);

  if (!isClickedInsideNavbar && navbar.classList.contains('expanded')) {
    navbar.classList.remove('expanded');
    bars.classList.remove('active')
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

// nav-links

navLink.forEach((link) => {
  link.addEventListener('click', () => {
    removeActiveClasses()
    nav.classList.add('active')
    navbar.classList.remove('expanded')
    bars.classList.remove('active')
  })
})

const scrollLinks = document.querySelectorAll(['.nav-link', '.my-projects'])

// scroll links

scrollLinks.forEach((link) => {
  link.addEventListener('click', () => {
    const target = link.getAttribute('href');
    const duration = 400;
    smoothScroll(target, duration);
  });
});

const removeActiveClasses = () => {
  navLink.forEach(nav => {
    nav.classList.remove('active')
  })
}

contactInputs.forEach((inp, i) => {
  inp.addEventListener('change', (e) => {
    if (e.target.value !== '') {
      inp.style.borderBottomColor = '#f8d394'
      if (i === contactInputs.length - 1) {
        inp.style.borderColor = '#f8d394'
      }
    }
  })
})