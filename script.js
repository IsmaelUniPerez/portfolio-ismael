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
    ? `<a href="${data.gddLink}" download class="btn-modal btn-gdd">${translateText('Download GDD (PDF)')}</a>`
    : '';
  const itchButton = data.itchLink
    ? `<a href="${data.itchLink}" target="_blank" rel="noopener noreferrer" class="btn-modal btn-itch">${translateText('Play on itch.io')} ↗</a>`
    : '';
  const artstationButton = data.artstationLink
    ? `<a href="${data.artstationLink}" target="_blank" rel="noopener noreferrer" class="btn-modal btn-itch">${translateText('View more on ArtStation')} ↗</a>`
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
        <p class="modal-meta">${translateText(data.meta_es, data.meta_en)}</p>
        <p class="modal-description">${translateText(data.description, data.description)}</p>
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
      copyEmailBtn.textContent = translateText('Email copied!');
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

// Diccionario de traducciones
const translations = {
  nav_home_es: 'INICIO',
  nav_home_en: 'HOME',
  nav_about_es: 'SOBRE MÍ',
  nav_about_en: 'ABOUT ME',
  nav_cv_es: 'CV + CAPABILITIES',
  nav_cv_en: 'CAPABILITIES',
  nav_contact_es: 'CONTACTO',
  nav_contact_en: 'CONTACT',
  hero_title_es: 'JUGADOR Y / DISEÑADOR / JUNTOS PARA / CREAR MUNDOS / INCREÍBLES.',
  hero_title_en: 'PLAYER AND / DESIGNER / TOGETHER TO / CREATE INCREDIBLE / WORLDS.',
  subtext_es: 'Diseño sistemas, espacios y relatos para que cada jugador encuentre su propia forma de habitarlos.',
  subtext_en: 'I design systems, spaces, and narratives so every player can find their own way to inhabit them.',
  slide_01_meta_es: 'Combat racing · 1º año',
  slide_01_meta_en: 'Combat racing · Year 1',
  slide_02_meta_es: 'Card game · 2º año',
  slide_02_meta_en: 'Card game · Year 2',
  slide_03_meta_es: 'Tower defense · 3º año',
  slide_03_meta_en: 'Tower defense · Year 3',
  slide_04_meta_es: 'Proyecto individual · TFC',
  slide_04_meta_en: 'Individual project · Final Year Capstone',
  btn_download_cv_es: 'Descargar CV',
  btn_download_cv_en: 'Download CV',
  btn_artstation_es: 'ArtStation',
  btn_artstation_en: 'ArtStation',
  btn_artstation_port_es: 'Portfolio 3D ↗',
  btn_artstation_port_en: '3D Portfolio ↗',
  chapter_label_es: 'SOBRE MÍ',
  chapter_label_en: 'ABOUT ME',
  about_title_es: 'Diseñar es<br><span class="accent">hacer preguntas</span><br>con forma.',
  about_title_en: 'Designing is<br><span class="accent">asking questions</span><br>with form.',
  about_bio_es: 'Soy Ismael Pérez, diseñador de videojuegos de 23 años. Me interesa convertir ideas en sistemas jugables claros, con espacio para la sorpresa y la expresión del jugador.',
  about_bio_en: 'I am Ismael Pérez, a 23-year-old game designer. I am interested in turning ideas into clear playable systems, with space for surprise and player expression.',
  about_subtext_es: 'Cursando 4º de Diseño de Videojuegos en la Universidad Europea de Madrid y disponible para nuevos proyectos.',
  about_subtext_en: 'Currently in my 4th year of Game Design at Universidad Europea de Madrid and available for new projects.',
  cv_title_es: 'Lo que llevo<br><span class="accent">a la mesa.</span>',
  cv_title_en: 'What I bring<br><span class="accent">to the table.</span>',
  exp_2022_year_es: '2022',
  exp_2022_year_en: '2022',
  exp_2022_title_es: 'Prácticas de diseño',
  exp_2022_title_en: 'Design internship',
  exp_2022_company_es: 'Creative Rainbow',
  exp_2022_company_en: 'Creative Rainbow',
  exp_2022_desc_es: 'Prácticas realizadas para completar el CFGS de Animaciones 3D, Juegos y Entornos Interactivos.',
  exp_2022_desc_en: 'Internship completed to finish CFGS in 3D Animation, Games and Interactive Environments.',
  exp_current_year_es: 'En curso',
  exp_current_year_en: 'In progress',
  exp_current_title_es: 'Grado en Diseño de Videojuegos',
  exp_current_title_en: 'Bachelor\'s Degree in Game Design',
  exp_current_company_es: 'Universidad Europea de Madrid · 4º año',
  exp_current_company_en: 'Universidad Europea de Madrid · Year 4',
  exp_current_desc_es: 'Diseño de sistemas, niveles, UX y documentación de proyectos jugables.',
  exp_current_desc_en: 'Systems design, level design, UX and documentation of playable projects.',
  exp_completed_year_es: 'Completado',
  exp_completed_year_en: 'Completed',
  exp_completed_title_es: 'CFGS Animaciones 3D',
  exp_completed_title_en: 'CFGS 3D Animation',
  exp_completed_company_es: 'Juegos y Entornos Interactivos',
  exp_completed_company_en: 'Games and Interactive Environments',
  exp_completed_desc_es: 'Formación en creación de entornos, animación y producción interactiva.',
  exp_completed_desc_en: 'Training in environment creation, animation and interactive production.',
  toolkit_title: 'Toolkit / always learning',
  skill_diseño_sistemas_es: 'Diseño de sistemas',
  skill_diseño_sistemas_en: 'Systems Design',
  skill_niveles_es: 'Diseño de niveles',
  skill_niveles_en: 'Level Design',
  skill_prototipado_es: 'Prototipado',
  skill_prototipado_en: 'Prototyping',
  skill_gdd_es: 'Documentación GDD',
  skill_gdd_en: 'GDD Documentation',
  special_interest_es: 'ESPECIAL INTERÉS',
  special_interest_en: 'SPECIAL INTEREST',
  special_interest_content_es: 'Worldbuilding y narrativa · Modelado y texturizado 3D · Diseño de juegos · <strong>Artista de Escenarios</strong>',
  special_interest_content_en: 'Worldbuilding and narrative · 3D Modeling and texturing · Game design · <strong>Level Artist</strong>',
  capacidades_title_es: 'CAPACIDADES',
  capacidades_title_en: 'CAPABILITIES',
  capacidades_content_es: 'Documentación GDD · Programación C# · UX/UI · Mecánicas y sistemas · Animación · Rigging',
  capacidades_content_en: 'GDD Documentation · C# Programming · UX/UI · Mechanics and systems · Animation · Rigging',
  software_grid_items_es: 'Unity|3ds Max|Maya|ZBrush|Houdini|C#|Substance Painter|Substance Designer|Photoshop|Illustrator|Blender|Figma',
  software_grid_items_en: 'Unity|3ds Max|Maya|ZBrush|Houdini|C#|Substance Painter|Substance Designer|Photoshop|Illustrator|Blender|Figma',
  contacto_title_es: 'CONTACTO<br><span class="accent">Hablemos de proyectos.</span>',
  contacto_title_en: 'CONTACT<br><span class="accent">Let\'s talk about projects.</span>',
  copy_email_btn_es: 'Copiar email',
  copy_email_btn_en: 'Copy email',
  copy_email_success_es: '¡Correo copiado!',
  copy_email_success_en: 'Email copied!'
};

function translateText(text, englishVersion) {
  if (currentLang === 'es') return text;
  if (!englishVersion && typeof text === 'string' && translations[text]) {
    // Buscar por key en traducciones
    for (const [key, value] of Object.entries(translations)) {
      if (value.toLowerCase().includes(text.toLowerCase()) && value !== text) {
        return translations[key.replace('_es', '_en')];
      }
    }
  }
  
  // Si es una cadena simple de navegación o título
  if (typeof text === 'string' && (text.includes('INICIO') || text.includes('HOME') || 
                                   text.includes('SOBRE MÍ') || text.includes('ABOUT ME') ||
                                   text.includes('CONTACTO') || text.includes('CONTACT'))) {
    const langMap = {
      'INICIO': translations.nav_home_es, 'HOME': translations.nav_home_en,
      'SOBRE MÍ': translations.nav_about_es, 'ABOUT ME': translations.nav_about_en,
      'CONTACTO': translations.nav_contact_es, 'CONTACT': translations.nav_contact_en,
      'CAPABILITIES': translations.nav_cv_en, 'CV + CAPABILITIES': translations.nav_cv_es
    };
    return langMap[text] || text;
  }
  
  return englishVersion || text;
}

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('portfolio_lang', lang);
  
  // Actualizar botón idioma
  if (langBtn) {
    langBtn.textContent = lang === 'en' ? 'ES' : 'EN';
    langBtn.classList.toggle('active', lang === 'en');
  }
  
  // Actualizar textos en la web
  updateLanguageTexts();
}

function updateLanguageTexts() {
  // Actualizar navbar
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    if (link.getAttribute('data-lang-es')) {
      link.textContent = translateText(
        link.getAttribute('data-lang-es'),
        link.getAttribute('data-lang-en')
      );
    }
  });
  
  // Actualizar hero h1 y subtext
  const heroTitle = document.querySelector('.hero h1');
  if (heroTitle) {
    const esText = 'JUGADOR Y<br><span>DISEÑADOR</span><br>JUNTOS PARA<br><span>CREAR MUNDOS</span><br><span class="accent large">INCREÍBLES.</span>';
    heroTitle.innerHTML = currentLang === 'es' ? esText : 'PLAYER AND<br><span>DESIGNER</span><br>TOGETHER TO<br><span>CREATE INCREDIBLE</span><br><span class="accent large">WORLDS.</span>';
  }
  
  const heroSubtext = document.querySelector('.hero .subtext');
  if (heroSubtext && heroSubtext.getAttribute('data-lang-es')) {
    heroSubtext.textContent = translateText(
      heroSubtext.getAttribute('data-lang-es'),
      heroSubtext.getAttribute('data-lang-en')
    );
  }
  
  // Actualizar slider subtitles
  const slideTitles = document.querySelectorAll('.slide-info p');
  slideTitles.forEach(p => {
    if (p.getAttribute('data-lang-es')) {
      p.textContent = translateText(
        p.getAttribute('data-lang-es'),
        p.getAttribute('data-lang-en')
      );
    }
  });
  
  // Actualizar CV botones y textos
  const btnCvEs = document.getElementById('btn-download-cv-es');
  const btnCvEn = document.getElementById('btn-download-cv-en');
  const artstationBtn = document.querySelector('.artstation-button span:nth-child(2)');
  
  if (currentLang === 'es') {
    if (btnCvEs) btnCvEs.style.display = 'inline-flex';
    if (btnCvEn) btnCvEn.style.display = 'none';
    if (artstationBtn) artstationBtn.textContent = translateText('Portfolio 3D ↗', '3D Portfolio ↗');
  } else {
    if (btnCvEs) btnCvEs.style.display = 'none';
    if (btnCvEn) btnCvEn.style.display = 'inline-flex';
    if (artstationBtn) artstationBtn.textContent = translateText('Portfolio 3D ↗', '3D Portfolio ↗');
  }
  
  // Actualizar sección sobre-mi
  const chapterLabel = document.querySelector('.chapter-label');
  if (chapterLabel && chapterLabel.getAttribute('data-lang-es')) {
    chapterLabel.textContent = translateText(
      chapterLabel.getAttribute('data-lang-es'),
      chapterLabel.getAttribute('data-lang-en')
    );
  }
  
  const aboutTitle = document.querySelector('#sobre-mi .about-text h1');
  if (aboutTitle) {
    aboutTitle.innerHTML = currentLang === 'es' ? 
      'Diseñar es<br><span class="accent">hacer preguntas</span><br>con forma.' :
      'Designing is<br><span class="accent">asking questions</span><br>with form.';
  }
  
  const aboutBio = document.querySelector('#sobre-mi .about-text p:first-of-type');
  if (aboutBio) {
    aboutBio.textContent = currentLang === 'es' ? 
      'Soy Ismael Pérez, diseñador de videojuegos de 23 años. Me interesa convertir ideas en sistemas jugables claros, con espacio para la sorpresa y la expresión del jugador.' :
      'I am Ismael Pérez, a 23-year-old game designer. I am interested in turning ideas into clear playable systems, with space for surprise and player expression.';
  }
  
  const aboutSubtext = document.querySelector('#sobre-mi .about-text p:last-of-type');
  if (aboutSubtext) {
    aboutSubtext.textContent = currentLang === 'es' ? 
      'Cursando 4º de Diseño de Videojuegos en la Universidad Europea de Madrid y disponible para nuevos proyectos.' :
      'Currently in my 4th year of Game Design at Universidad Europea de Madrid and available for new projects.';
  }
  
  // Actualizar CV título
  const cvTitle = document.querySelector('#cv .main-title');
  if (cvTitle) {
    cvTitle.innerHTML = currentLang === 'es' ? 
      'Lo que llevo<br><span class="accent">a la mesa.</span>' :
      'What I bring<br><span class="accent">to the table.</span>';
  }
  
  // Actualizar experiencia en CV
  const expItems = document.querySelectorAll('.exp-item');
  expItems.forEach(item => {
    const year = item.querySelector('.year');
    const title = item.querySelector('h3');
    const company = item.querySelector('.content p:first-of-type');
    const description = item.querySelector('.content p:last-of-type');
    
    if (year && year.textContent === 'En curso') {
      year.textContent = translateText('En curso', 'In progress');
    }
    
    if (title && title.innerHTML.includes('Prácticas de diseño')) {
      title.innerHTML = currentLang === 'es' ? 
        'Prácticas de diseño' : 
        'Design internship';
    }
    
    if (description && description.textContent.includes('Prácticas realizadas')) {
      description.textContent = currentLang === 'es' ? 
        'Prácticas realizadas para completar el CFGS de Animaciones 3D, Juegos y Entornos Interactivos.' :
        'Internship completed to finish CFGS in 3D Animation, Games and Interactive Environments.';
    }
    
    if (title && title.textContent.includes('Grado en Diseño')) {
      title.textContent = currentLang === 'es' ? 
        'Grado en Diseño de Videojuegos' :
        "Bachelor's Degree in Game Design";
    }
    
    if (company && company.textContent.includes('Universidad Europea') && company.textContent.includes('4º año')) {
      company.textContent = currentLang === 'es' ? 
        'Universidad Europea de Madrid · 4º año' :
        'Universidad Europea de Madrid · Year 4';
    }
    
    if (description && description.textContent.includes('Diseño de sistemas, niveles')) {
      description.textContent = currentLang === 'es' ? 
        'Diseño de sistemas, niveles, UX y documentación de proyectos jugables.' :
        'Systems design, level design, UX and documentation of playable projects.';
    }
    
    if (title && title.textContent.includes('CFGS Animaciones')) {
      title.textContent = currentLang === 'es' ? 
        'CFGS Animaciones 3D' :
        'CFGS 3D Animation';
    }
    
    if (description && description.textContent.includes('Formación en creación')) {
      description.textContent = currentLang === 'es' ? 
        'Formación en creación de entornos, animación y producción interactiva.' :
        'Training in environment creation, animation and interactive production.';
    }
  });
  
  // Actualizar habilidades
  const skills = document.querySelectorAll('.skill-item span');
  skills.forEach(skill => {
    const text = skill.textContent;
    if (text.includes('Diseño de sistemas')) {
      skill.textContent = currentLang === 'es' ? 'Diseño de sistemas' : 'Systems Design';
    } else if (text.includes('Diseño de niveles')) {
      skill.textContent = currentLang === 'es' ? 'Diseño de niveles' : 'Level Design';
    } else if (text.includes('Prototipado')) {
      skill.textContent = currentLang === 'es' ? 'Prototipado' : 'Prototyping';
    } else if (text.includes('Documentación GDD')) {
      skill.textContent = currentLang === 'es' ? 'Documentación GDD' : 'GDD Documentation';
    }
  });
  
  // Actualizar especial interés y capacidades
  const specialInterest = document.querySelector('.special-interest');
  if (specialInterest) {
    const h3 = specialInterest.querySelector('h3');
    const p = specialInterest.querySelector('p');
    if (h3 && h3.textContent === 'ESPECIAL INTERÉS') {
      h3.textContent = currentLang === 'es' ? 'ESPECIAL INTERÉS' : 'SPECIAL INTEREST';
    }
    if (p) {
      p.innerHTML = currentLang === 'es' ? 
        'Worldbuilding y narrativa · Modelado y texturizado 3D · Diseño de juegos · <strong>Artista de Escenarios</strong>' :
        'Worldbuilding and narrative · 3D Modeling and texturing · Game design · <strong>Level Artist</strong>';
    }
  }
  
  const capacidades = document.querySelector('.capacidades');
  if (capacidades) {
    const h3 = capacidades.querySelector('h3');
    const p = capacidades.querySelector('p');
    if (h3 && h3.textContent === 'CAPACIDADES') {
      h3.textContent = currentLang === 'es' ? 'CAPACIDADES' : 'CAPABILITIES';
    }
    if (p) {
      p.textContent = currentLang === 'es' ? 
        'Documentación GDD · Programación C# · UX/UI · Mecánicas y sistemas · Animación · Rigging' :
        'GDD Documentation · C# Programming · UX/UI · Mechanics and systems · Animation · Rigging';
    }
  }
  
  // Actualizar contacto
  const contactoTitle = document.querySelector('#contacto h1');
  if (contactoTitle) {
    contactoTitle.innerHTML = currentLang === 'es' ? 
      'CONTACTO<br><span class="accent">Hablemos de proyectos.</span>' :
      'CONTACT<br><span class="accent">Let\'s talk about projects.</span>';
  }
  
  // Actualizar botón copiar email
  const copyEmailBtn = document.getElementById('copy-email-btn');
  if (copyEmailBtn) {
    copyEmailBtn.textContent = currentLang === 'es' ? 'Copiar email' : 'Copy email';
  }
}

// Actualizar al cargar
updateLanguageTexts();

// Event listener para botón idioma
langBtn.addEventListener('click', () => {
  setLanguage(currentLang === 'en' ? 'es' : 'en');
});

console.log('Portfolio de Ismael Pérez - Game Designer');
console.log('Modales y slider funcionales | Diseño responsive completo | Animación barras habilidades | Sistema bilingüe ES/EN v4');