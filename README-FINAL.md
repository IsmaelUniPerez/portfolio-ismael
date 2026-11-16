# Ismael Pérez - Game Designer Portfolio

Portafolio web profesional replicado basado en el diseño original, con sistema bilingüe (ES/EN) y completamente responsive.

## ✨ Características

- **Diseño oscuro/neón**: Paleta rosa (#ff0069), verde neón (#96ff00) y negro (#111)
- **Sistema bilingüe completo**:-selector de idioma EN/ES en navbar, textos traducidos instantáneamente
- **Slider de proyectos funcional**: Autoplay con flechas, modal al hacer click
- **Animaciones al hacer scroll**: Barras de habilidades que se llenan automáticamente
- **100% Responsive**: Móvil, tablet y desktop con ajustes táctiles optimizados
- **Modales completos**: Imágenes + botones a GDD (PDF) y itch.io

---

## 📁 Estructura del proyecto

```
.portfolio/
├── index.html              # HTML principal (versión v=4)
├── styles.css              # Estilos CSS (versión actualizada)
├── script.js               # JavaScript slider + bilingüe (v=3)
└── assets/
    ├── CV-Ismael-Perez.pdf                    ← Tu CV español
    ├── CV-Ismael-Perez-EN.pdf                 ← CV inglés (GENERAR AQUÍ)
    ├── PanzerdrifterCaptura.png               ← Imagen proyecto 01
    ├── MentirososCaptura.png                  ← Imagen proyecto 02
    ├── TTSICaptura.png                        ← Imagen proyecto 03
    ├── BarEspacialCaptura.png                 ← Imagen proyecto 04
    ├── ImagenIsmael.jpg                       ← Tu foto de perfil
    └── GDD-Panzerdrifter.pdf                  ← Documentación proyecto 01
        ├── GDD-Mentirosos.pdf                 ← Documentación proyecto 02
        └── GDD-TTSI.pdf                       ← Documentación proyecto 03
```

---

## ✅ LISTA DE VERIFICACIÓN - ANTES DE SUBIR

### 🔴 OBLIGATORIO (debes crear estos archivos):

1. **`assets/CV-Ismael-Perez-EN.pdf`** 
   - Tu currículum en inglés
   - Debe estar en la misma carpeta que los demás PDFs
   - **Si no lo tienes, crea un documento Word/Google Docs con tu info en inglés y guárdalo como PDF**

2. **Verifica que todos los PDFs estén en `assets/`:**
   - CV-Ismael-Perez.pdf ✓
   - CV-Ismael-Perez-EN.pdf ← **CREAR AQUÍ**
   - GDD-Panzerdrifter.pdf ✓
   - GDD-Mentirosos.pdf ✓
   - GDD-TTSI.pdf ✓

### 🟢 Verificados (ya están listos):

✅ Todas las imágenes de proyectos  
✅ Tu foto de perfil (ImagenIsmael.jpg)  
✅ HTML, CSS y JavaScript actualizados  
✅ Sistema bilingüe implementado  
✅ Responsive móvil corregido  

---

## 🚀 PASO A PASO: SUBIR A GITHUB PAGES

### Paso 1: Prepara el repositorio en GitHub

1. Ve a [https://github.com/new](https://github.com/new)
2. Crea nuevo repositorio (público o privado)
3. Nombre del repositorio: `portfolio` (o el que prefieras)
4. **NO** subas con .gitignore ni README por ahora

### Paso 2: Comprime tu proyecto

En Windows, haz clic derecho en la carpeta `.portfolio` y selecciona **"Enviar a > Carpeta comprimida (zip)"**.

Descomprime el ZIP en una ubicación temporal (ej: Desktop).

### Paso 3: Sube los archivos al repositorio de GitHub

1. En tu repositorio nuevo, ve a "Files" (Archivos)
2. Arrastra y suelta TODOS los archivos del ZIP descomprimido
3. **Asegúrate de subir**: index.html, styles.css, script.js, assets/ (con todo dentro)
4. Espera a que termine la subida

### Paso 4: Configura GitHub Pages

1. En tu repositorio, ve a **Settings** → **Pages** (en el menú lateral)
2. En **"Sources"** (fuente):
   - Select "Deploy from a branch"
   - Branch: `main` (o master)
   - Folder/root: `/` (raíz)
3. Click en **Save**

### Paso 5: Espera y ¡listo!

- GitHub tarda 1-2 minutos en procesar
- Tu sitio estará disponible en:
  `https://tu-usuario.github.io/portfolio/`

---

## 🌐 URL FINAL

Una vez publicado, tu portafolio estará disponible en:

```
https://tu-usuario.github.io/portfolio/
```

**Reemplaza "tu-usuario" con tu nombre de usuario de GitHub real.**

---

## 🎨 Personalización rápida

### Cambiar textos:
- Edita `index.html` - busca los atributos `data-lang-es=""` y `data-lang-en=""`
- Los cambios se ven al instante en el navegador (sin guardar)

### Cambiar colores:
- Abre `styles.css` - línea 7, edita las variables:
```css
:root {
  --pink: #ff0069;       // Color rosa neón
  --green-neon: #96ff00; // Color verde neón
}
```

### Añadir más proyectos al slider:
1. En `index.html`, copia un bloque `<div class="slide" data-id="XX">...</div>`
2. Cambia el ID del siguiente proyecto (05, 06...)
3. Edita `script.js` - añade datos en `projectData['05']`, etc.

---

## 📱 Responsive & Mobile

El sitio está optimizado para:
- **Móviles**: Botones táctiles de 44x44px mínimo, texto legible
- **Tablets**: Layout ajustado, slider responsive
- **Desktop**: Full experiencia con todas las animaciones

---

## 🐛 Solución de problemas

### Imágenes no cargan:
- Verifica que los nombres de archivo coincidan EXACTAMENTE (minúsculas)
- GitHub Pages es Linux-sensitive: `PanzerdrifterCaptura.png` ≠ `panzerdriftercaptura.png`

### PDFs no descargan:
- Asegúrate de que `CV-Ismael-Perez-EN.pdf` exista en `assets/`
- Nombres exactos sin espacios ni tildes en extensiones

### Sistema bilingüe no funciona:
- Verifica que `script.js?v=3` esté cargado (el `?v=3` fuerza recarga)
- Limpia caché del navegador (Ctrl+F5)

---

## 📦 Entrega final

Tu portafolio estará listo cuando tengas:

✅ HTML actualizado (`index.html` con atributos bilingües)  
✅ CSS con responsive y botón idioma (`styles.css`)  
✅ JavaScript con lógica bilingüe (`script.js`)  
✅ **PDF de CV en inglés generado**  
✅ Todos los PDFs de GDD subidos  
✅ Imágenes de proyectos verificadas  

---

## 💡 Consejos finales

1. **Prueba en móvil**: Abre la URL desde tu teléfono para verificar
2. **Testea el cambio de idioma**: Pulsa EN/ES varias veces
3. **Descarga los PDFs**: Asegúrate de que funcionen desde GitHub Pages
4. **Comparte tu enlace**: ¡Tienes un portafolio profesional listo!

---

**¡Felicidades! Tu portafolio está completo y listo para mostrar a reclutadores o clientes.** 🎮

---

*Hecho con ❤️ para Ismael Pérez - Game Designer*