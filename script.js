const navLink = document.querySelectorAll('.nav-link')
const bars = document.querySelector('.bars')
const navbar = document.querySelector('.navbar-nav')
const contactLink = document.querySelector('.nav-item:last-child')
 


navLink.forEach(nav => {
    nav.addEventListener("click", () => {
        removeActive()
        nav.classList.add('active')
    })
}) 

const removeActive = () => {
    navLink.forEach((nav, index) => {
        nav.classList.remove('active')
    })
}


bars.addEventListener("click", ()=>{
    if (navbar.classList.contains('expanded')) {
        navbar.classList.remove('expanded')
    } else {
        contactLink.classList.remove('position-absolute')
        navbar.classList.add('expanded')   
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





