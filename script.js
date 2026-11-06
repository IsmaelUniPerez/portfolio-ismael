// ============================================
// PROYECTOS SLIDER
// ============================================
const slider = document.getElementById('project-slider');
let currentIndex = 0;

const slides = slider.children;
const totalSlides = slides.length;

// Auto-play slider
function nextSlide() {
  currentIndex = (currentIndex + 1) % totalSlides;
  updateSlider();
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
  updateSlider();
}

function updateSlider() {
  slider.style.transform = `translateX(-${currentIndex * 100}%)`;
}

// Auto-play every 5 segundos
let autoplayInterval = setInterval(nextSlide, 5000);

// Click en imágenes para detener autoplay
slides.forEach(slide => {
  const img = slide.querySelector('img');
  if (img) {
    img.addEventListener('click', () => {
      clearInterval(autoplayInterval);
    });
  }
});

// Flechas de navegación
document.querySelectorAll('.arrow-left').forEach(btn => {
  btn.addEventListener('click', prevSlide);
});

document.querySelectorAll('.arrow-right').forEach(btn => {
  btn.addEventListener('click', nextSlide);
});


// ============================================
// NAVBAR ACTIVE LINKS
// ============================================
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (pageYOffset >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').includes(current)) {
      link.classList.add('active');
    }
  });
});


// ============================================
// SMOOTH SCROLL PARA ANCLAJES
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const targetId = this.getAttribute('href');
    if (targetId === '#') return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});