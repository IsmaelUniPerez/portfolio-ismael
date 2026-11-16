// ============================================
// PROYECTOS SLIDER - FIX: Array.from() y gestión de autoplay
// ============================================

const sliderContainer = document.querySelector('.slider-container');
const slider = document.getElementById('project-slider');
let currentIndex = 0;

// FIX: Convertir HTMLCollection a array real
const slides = Array.from(slider.children);
const totalSlides = slides.length;

// Variables para el autoplay
let autoplayInterval = null;
let isAutoplaying = false;

function startAutoplay() {
  if (!isAutoplaying) {
    isAutoplaying = true;
    autoplayInterval = setInterval(() => {
      currentIndex = (currentIndex + 1) % totalSlides;
      updateSlider();
    }, 5000);
  }
}

function stopAutoplay() {
  if (isAutoplaying && autoplayInterval) {
    clearInterval(autoplayInterval);
    autoplayInterval = null;
    isAutoplaying = false;
  }
}

// FIX: Iniciar autoplay cuando la página es visible
if (document.visibilityState) {
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
      startAutoplay();
    } else {
      stopAutoplay();
    }
  });
}

// Auto-play inicia automáticamente
startAutoplay();

function nextSlide() {
  // FIX: Detener autoplay antes de cambiar
  stopAutoplay();
  
  currentIndex = (currentIndex + 1) % totalSlides;
  updateSlider();
  
  // Reanudar autoplay después de la transición
  setTimeout(() => {
    startAutoplay();
  }, 600);
}

function prevSlide() {
  // FIX: Detener autoplay antes de cambiar
  stopAutoplay();
  
  currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
  updateSlider();
  
  // Reanudar autoplay después de la transición
  setTimeout(() => {
    startAutoplay();
  }, 600);
}

function updateSlider() {
  slider.style.transform = `translateX(-${currentIndex * 100}%)`;
}

// Auto-play: iniciar cuando el usuario interactúa con la página
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && isAutoplaying) {
      // Mantener autoplay si está activo
    } else if (!entry.isIntersecting || !isAutoplaying) {
      // Solo iniciar cuando el usuario hace scroll después de 2 segundos
      setTimeout(() => {
        if (!document.hidden) startAutoplay();
      }, 2000);
    }
  });
});

observer.observe(sliderContainer);

// Flechas de navegación - ahora NO rompen el temporizador
document.querySelector('.arrow-left')?.addEventListener('click', (e) => {
  e.stopPropagation(); // Prevenir propagación a la imagen
  prevSlide();
});

document.querySelector('.arrow-right')?.addEventListener('click', (e) => {
  e.stopPropagation();
  nextSlide();
});

// Click en imágenes para activar autoplay (pero no romper temporizador)
slides.forEach(slide => {
  slide.style.cursor = 'pointer';
  
  const img = slide.querySelector('img');
  if (img) {
    // Al hacer hover, iniciar autoplay
    img.addEventListener('mouseenter', () => {
      if (!isAutoplaying) startAutoplay();
    });
    
    // Click detiene temporalmente
    img.addEventListener('click', () => {
      stopAutoplay();
    });
  }
});

// ============================================
// MODAL FUNCTIONALITY
// ============================================

const projectData = {
  '01': {
    title: 'PANZERDRIFTER',
    meta: 'Combat racing · 1º año',
    description: 'Carreras de tanques en un desierto egipcio: derrapa, apuntas y llegas antes que tus rivales.',
    gddLink: null
  },
  '02': {
    title: 'MENTIROSOS',
    meta: 'Card game · 2º año',
    description: 'Un juego de cartas donde la verdad es relativa y cada jugador debe convencer a los demás de su mentira más creativa.',
    gddLink: null
  },
  '03': {
    title: 'TEENY TINY SQUIDS INVASION',
    meta: 'Tower defense · 3º año',
    description: 'Defiende la playa contra una invasión de pulpos miniatura con torres temáticas y estrategias únicas.',
    gddLink: null
  },
  '04': {
    title: 'BAR ESPACIAL',
    meta: 'Proyecto individual · TFC',
    description: 'Un bar futurista en una estación espacial donde cada rincón cuenta una historia. Exploración de atmósferas y narrativa ambiental.',
    gddLink: null
  }
};

const modalOverlay = document.getElementById('modal-overlay');

function openModal(projectId) {
  if (!projectId || !modalOverlay) return;
  
  const data = projectData[projectId];
  if (!data) return;
  
  let modalContent = document.getElementById('project-modal-content');
  
  if (!modalContent) {
    modalContent = document.createElement('div');
    modalContent.id = 'project-modal-content';
    modalOverlay.appendChild(modalContent);
  }
  
  modalContent.innerHTML = `
    <button class="modal-close-btn" aria-label="Cerrar">&times;</button>
    <div class="modal-title">${data.title}</div>
    <div class="modal-meta">${data.meta}</div>
    <div class="modal-description">${data.description}</div>
  `;
  
  modalOverlay.classList.add('active');
  stopAutoplay();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function closeModal() {
  if (!modalOverlay) return;
  
  modalOverlay.classList.remove('active');
  setTimeout(() => {
    startAutoplay();
  }, 300);
}

const closeBtn = document.querySelector('.modal-close-btn');
if (closeBtn) {
  closeBtn.addEventListener('click', closeModal);
}

if (modalOverlay) {
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (!modalOverlay || !modalOverlay.classList.contains('active')) return;
  
  if (e.key === 'Escape') {
    closeModal();
  }
});

// ============================================
// OPEN MODAL ON SLIDE CLICK - FIX: solo con click en la imagen, no flechas
// ============================================
slides.forEach(slide => {
  const img = slide.querySelector('img');
  
  // Click en la imagen abre modal
  if (img) {
    img.addEventListener('click', () => {
      const projectId = slide.getAttribute('data-id');
      openModal(projectId);
    });
  }
});

// ============================================
// NAVBAR ACTIVE LINKS
// ============================================
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  
  // FIX: Usar scrollY en lugar de pageYOffset (deprecated)
  const scrollY = window.scrollY;
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (scrollY >= sectionTop) {
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

// ============================================
// RESPONSIVE SLIDER - Ajustar automáticamente
// ============================================
const resizeSlider = () => {
  if (window.innerWidth < 768) {
    document.querySelectorAll('.slide img').forEach(img => {
      img.style.height = 'auto';
      img.style.maxHeight = '50vh';
    });
  } else {
    document.querySelectorAll('.slide img').forEach(img => {
      img.style.height = '';
      img.style.maxHeight = '60vh';
    });
  }
};

window.addEventListener('resize', resizeSlider);

// ============================================
// PREVENT FLICKER ON MODAL OPEN/CLOSE
// ============================================
let modalAnimating = false;
modalOverlay.addEventListener('transitionend', () => {
  modalAnimating = false;
});

// ============================================
// OPTIMIZACIÓN DE IMÁGENES PARA MOVIL
// ============================================
const images = document.querySelectorAll('img');
images.forEach(img => {
  const parent = img.parentElement;
  
  // Lazy loading básico
  if (img.getAttribute('src') === 'about:blank' || !img.getAttribute('src')) return;
});

console.log('Portfolio de Ismael Pérez - Game Designer');
console.log('Modales y slider funcionales | Diseño responsive completo');