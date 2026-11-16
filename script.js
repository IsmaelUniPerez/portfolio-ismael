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
// MODAL FUNCTIONALITY - COMPLETO CON IMAGEN Y BOTONES
// ============================================

const projectData = {
  '01': {
    title: 'PANZERDRIFTER',
    meta_es: 'Combat racing · 1º año',
    meta_en: 'Combat racing · Year 1',
    description: 'Carreras de tanques en un desierto egipcio: derrapa, apuntas y llegas antes que tus rivales.',
    image: 'assets/PanzerdrifterCaptura.png',
    gddLink: 'assets/GDD-Panzerdrifter.pdf',
    itchLink: null
  },
  '02': {
    title: 'MENTIROSOS',
    meta_es: 'Card game · 2º año',
    meta_en: 'Card game · Year 2',
    description: 'Un juego de cartas donde la verdad es relativa y cada jugador debe convencer a los demás de su mentira más creativa.',
    image: 'assets/MentirososCaptura.png',
    gddLink: 'assets/GDD-Mentirosos.pdf',
    itchLink: 'https://ismaeluniperez.itch.io/mentirosos'
  },
  '03': {
    title: 'TEENY TINY SQUIDS INVASION',
    meta_es: 'Tower defense · 3º año',
    meta_en: 'Tower defense · Year 3',
    description: 'Defiende la playa contra una invasión de pulpos miniatura con torres temáticas y estrategias únicas.',
    image: 'assets/TTSICaptura.png',
    gddLink: 'assets/GDD-TTSI.pdf',
    itchLink: 'https://ismaeluniperez.itch.io/teeny-tiny-squids-invasion'
  },
  '04': {
    title: 'BAR ESPACIAL',
    meta_es: 'Proyecto individual · TFC',
    meta_en: 'Individual project · Final Year Capstone',
    description: 'Un bar futurista en una estación espacial donde cada rincón cuenta una historia. Exploración de atmósferas y narrativa ambiental.',
    image: 'assets/BarEspacialCaptura.png',
    gddLink: null,
    itchLink: null,
    artstationLink: 'https://www.artstation.com/ismaelperezrodriguez'
  }
};

const modalOverlay = document.getElementById('modal-overlay');

function openModal(projectId) {
  const data = projectData[projectId];
  if (!data || !modalOverlay) return;

  const gddButton = data.gddLink
    ? `<a href="${data.gddLink}" download class="btn-modal btn-gdd">Descargar GDD (PDF)</a>`
    : '';
  const itchButton = data.itchLink
    ? `<a href="${data.itchLink}" target="_blank" rel="noopener noreferrer" class="btn-modal btn-itch">Jugar en itch.io ↗</a>`
    : '';
  const artstationButton = data.artstationLink
    ? `<a href="${data.artstationLink}" target="_blank" rel="noopener noreferrer" class="btn-modal btn-itch">Ver más en ArtStation ↗</a>`
    : '';
  const actionsBlock = (gddButton || itchButton || artstationButton)
    ? `<div class="modal-actions">${gddButton}${itchButton}${artstationButton}</div>`
    : '';

  modalOverlay.innerHTML = `
    <div id="project-modal">
      <button class="modal-close-btn" aria-label="Cerrar">&times;</button>
      <div class="modal-image-container">
        <img src="${data.image}" alt="${data.title}" />
      </div>
      <div class="modal-content">
        <h2 class="modal-title">${data.title}</h2>
        <p class="modal-meta">${data.meta_es}</p>
        <p class="modal-description">${data.description}</p>
        ${actionsBlock}
      </div>
    </div>
  `;

  modalOverlay.querySelector('.modal-close-btn').addEventListener('click', closeModal);
  modalOverlay.classList.add('active');
  stopAutoplay();
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  if (!modalOverlay) return;
  
  modalOverlay.classList.remove('active');
  document.body.style.overflow = ''; // RESTAURAR SCROLL AL CERRAR
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
// COPIAR EMAIL FUNCIONAL - CON RESPALDO PARA file://
// ============================================
const copyEmailBtn = document.getElementById('copy-email-btn');
if (copyEmailBtn) {
  copyEmailBtn.addEventListener('click', async () => {
    const email = 'ismaeluniperez@gmail.com';
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(email);
      } else {
        const tempInput = document.createElement('input');
        tempInput.value = email;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
      }
      const originalText = copyEmailBtn.textContent;
      copyEmailBtn.textContent = '¡Correo copiado!';
      copyEmailBtn.style.borderColor = '#96ff00';
      copyEmailBtn.style.color = '#96ff00';
      setTimeout(() => {
        copyEmailBtn.textContent = originalText;
        copyEmailBtn.style.borderColor = '';
        copyEmailBtn.style.color = '';
      }, 2000);
    } catch (err) {
      alert('Correo: ' + email);
    }
  });
}

// ============================================
// ANIMACIÓN BARRAS HABILIDADES SCROLL - IntersectionObserver
// ============================================
const toolkitSection = document.querySelector('.toolkit');
if (toolkitSection) {
  const animateBars = () => {
    document.querySelectorAll('.toolkit .fill').forEach(fill => {
      const targetWidth = fill.getAttribute('data-width');
      if (targetWidth) fill.style.width = targetWidth;
    });
  };

  const toolkitObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateBars();
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.25 }); // Se activa cuando el 25% de la sección es visible
  
  toolkitObserver.observe(toolkitSection);
}

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
// SYSTEM BILINGÜE ES/EN - CORREGIDO SEGÚN HANDOFF
// ============================================

const langBtn = document.getElementById('lang-toggle');
let currentLang = localStorage.getItem('portfolio_lang') || 'en';

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('portfolio_lang', lang);
  
  // Actualizar botón idioma
  if (langBtn) {
    langBtn.textContent = lang === 'en' ? 'ES' : 'EN';
  }
  
  // Actualizar textos en la web
  updateLanguageTexts();
}

function updateLanguageTexts() {
  const elements = document.querySelectorAll('[data-lang-es]');
  
  elements.forEach(element => {
    const esText = element.getAttribute('data-lang-es');
    const enText = element.getAttribute('data-lang-en');
    
    if (currentLang === 'es') {
      element.textContent = esText;
    } else {
      element.textContent = enText;
    }
  });
  
  // Actualizar botones de descarga CV según idioma
  const btnCvEs = document.getElementById('btn-download-cv-es');
  const btnCvEn = document.getElementById('btn-download-cv-en');
  
  if (currentLang === 'es') {
    if (btnCvEs) {
      btnCvEs.style.display = 'inline-flex';
    }
    if (btnCvEn) {
      btnCvEn.style.display = 'none';
    }
  } else {
    if (btnCvEs) {
      btnCvEs.style.display = 'none';
    }
    if (btnCvEn) {
      btnCvEn.style.display = 'inline-flex';
    }
  }
}

// Actualizar al cargar
updateLanguageTexts();

// Event listener para botón idioma
langBtn.addEventListener('click', () => {
  setLanguage(currentLang === 'en' ? 'es' : 'en');
});

console.log('Portfolio de Ismael Pérez - Game Designer');
console.log('Modales y slider funcionales | Diseño responsive completo | Animación barras habilidades | Sistema bilingüe ES/EN');