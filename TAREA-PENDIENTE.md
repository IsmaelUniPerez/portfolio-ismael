# ⚠️ IMPORTANTE: PASOS PARA COMPLETAR TU PORTAFOLIO

## 🔴 ARCHIVO FALTANTE - DEBE SER CREADO MANUALMENTE:

### `assets/CV-Ismael-Perez-EN.pdf`

**POR QUÉ LO NECESITAS:**
El sistema bilingüe muestra dos botones de descarga según el idioma:
- Español → descarga CV español (`CV-Ismael-Perez.pdf`)
- Inglés → descarga CV inglés (**`CV-Ismael-Perez-EN.pdf`**)

**CÓMO CREARLO (3 OPCIONES):**

---

### 🟢 OPCIÓN 1: Manual más rápida (RECOMENDADO)

1. Abre [Google Docs](https://docs.google.com/)
2. Crea un nuevo documento con tu información profesional en inglés:
   - **Name**: Ismael Pérez  
   - **Title**: Game Designer  
   - **Email**: ismaeluniperez@gmail.com  
   - **Portfolio**: https://www.artstation.com/ismaelperezrodriguez  
   - **Experience**: Tus trabajos (Prácticas Creative Rainbow, Universidad Europea)  
   - **Skills**: Diseñio de sistemas, niveles, UX, etc.  
   - **Projects**: Link a tus 4 proyectos  
3. Ve a **Archivo → Descargar → PDF**
4. Guarda como `CV-Ismael-Perez-EN.pdf` en la carpeta `assets/`

---

### 🟡 OPCIÓN 2: Usar Canva

1. Busca "Currículum" en Canva
2. Elige una plantilla profesional
3. Rellena con tu información en inglés
4. Exporta como PDF
5. Guarda en `assets/`

---

### 🔴 OPCIÓN 3: Generar con Python (si tienes reportlab instalado)

```python
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet

doc = SimpleDocTemplate('assets/CV-Ismael-Perez-EN.pdf', pagesize=letter)
styles = getSampleStyleSheet()

story = []
story.append(Paragraph('ISMAEL PÉREZ - GAME DESIGNER', styles['Title']))
story.append(Spacer(1, 12))
# ... añadir más contenido ...

doc.build(story)
```

---

## 📁 ARCHIVOS ACTUALES EN assets/:

✅ BarEspacialCaptura.png  
✅ CV-Ismael-Perez.html (versión web del CV español)  
⚠️ **CV-Ismael-Perez.pdf** (tu CV original español)  
⚠️ **CV-Ismael-Perez-EN.pdf** ← **FALTA CREARLO AQUÍ**  
✅ GDD-Mentirosos.pdf  
✅ GDD-Panzerdrifter.pdf  
✅ GDD-TTSI.pdf  
✅ ImagenIsmael.jpg  
✅ MentirososCaptura.png  
✅ PanzerdrifterCaptura.png  
✅ TTSICaptura.png  

---

## 🚀 SIGUIENTE PASO DESPUÉS DE CREAR EL PDF:

1. **Comprime la carpeta `.portfolio` en ZIP**
2. **Sube todo al repositorio de GitHub** (incluyendo el nuevo PDF)
3. **Activa GitHub Pages** (Settings → Pages)
4. **¡Listo! Tu portafolio estará en línea**

---

## 📝 RESUMEN DE LO QUE HEMOS HECHO:

✅ HTML actualizado con sistema bilingüe  
✅ CSS con estilos responsive y botón idioma  
✅ JavaScript con lógica de cambio de idioma  
✅ IntersectionObserver para animar barras habilidades  
✅ Flechas del slider corregidas  
✅ Modal funcional con imágenes y botones  
✅ Responsive móvil optimizado  

---

## 💡 RECUERDA:

- El archivo `CV-Ismael-Perez-EN.html` que hay en `assets/` es una versión web
- Necesitas el PDF para que funcione la descarga desde GitHub Pages
- Puedes usar cualquier PDF en inglés con tu info profesional

---

## ✨ UNA VEZ TENGA EL PDF:

Tu portafolio estará completo y listo para publicar!

**Prueba localmente:**
1. Abre `index.html` directamente en tu navegador
2. Pulsa el botón "EN" en la navbar
3. Verás que cambia todos los textos automáticamente
4. Intenta descargar ambos CVs (el inglés fallará hasta crear el PDF)

---

**¡Cualquier duda! Pregúntame.** 🎮