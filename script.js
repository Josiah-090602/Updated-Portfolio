const navLink = document.querySelectorAll('.nav-link')
const pageSection = document.querySelectorAll('.page-section')
const bars = document.querySelector('.bars')
const nav = document.querySelector('.navbar')
const navbar = document.querySelector('.navbar-nav')
const contactLink = document.querySelector('.nav-item:last-child')
const hiddenItems = document.querySelectorAll('.hidden')

//intersectionObsever

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry)=>{
    console.log(entry)
    if (entry.isIntersecting) {
        entry.target.classList.add('show');
    }
  })
})

hiddenItems.forEach((el)=> observer.observe(el))

// contact form
const contactInputs = document.querySelectorAll(['.contact-input input', '.contact-input textarea'])
const form = document.getElementById('contact-form')
const sendLoad = document.querySelector('.loading')
const closeAlert = document.querySelector('.btn-close')

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
  if (navbar.classList.contains('expanded')) {
    nav.classList.remove('scrolled')
  } else {
    nav.classList.add('scrolled')
  }
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
  'UI/UX designer',
  'Front-end developer',
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

const alertPlaceholder = document.getElementById('alert-feedback')

const appendAlert = (message, type) => {
  const wrapper = document.createElement('div')
  wrapper.innerHTML =
    `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
      <div class="d-flex align-items-center gap-3">
        <span class="material-symbols-outlined">
          ${type == 'success' ? 'check_circle' : 'error'}
        </span>
        ${message}
      </div>
    </div>`

  alertPlaceholder.append(wrapper)
}

const removeAlert = () => {
  const alertElement = document.querySelector('.alert');
  if (alertElement) {
    alertElement.remove();
  }
};

emailjs.init("Qi2TfNRvyPfSGPuWy");

const sendEmail = (e) => {
  e.preventDefault();

  const templateParams = {
    subject: form.subject.value || '(no subject)',
    to_name: 'Josiah',
    from_name: form.user_name.value,
    message:
      `${form.message.value}
    
      Phone Number: ${form.contact_number.value || 'None'}
      Email Address: ${form.user_email.value}
    `
  };

  emailjs.send('service_517km4e', 'template_dihy1f5', templateParams, "Qi2TfNRvyPfSGPuWy")
    .then((result) => {
      clearInputs()
      appendAlert('The message has been sent successfully!', 'success')
      sendLoad.classList.remove('rotate')
      setTimeout(() => {
        removeAlert()
      }, 3000);
    })
    .catch((error) => {
      clearInputs()
      appendAlert('Failed to send the message!', 'danger')
      sendLoad.classList.remove('rotate')
    });
  sendLoad.classList.add('rotate')
};

form.addEventListener('submit', sendEmail)

const clearInputs = () => {
  contactInputs.forEach(inp => {
    inp.value = ''
  })
  contactInputs.forEach((inp, i) => {
    inp.style.borderBottomColor = '#6e7181'
    if (i === contactInputs.length - 1) {
      inp.style.borderColor = '#6e7181'
    }
  })
}

document.getElementById('curr-year').textContent = new Date().getFullYear()