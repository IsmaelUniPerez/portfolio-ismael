# 🚀 Guía Paso a Paso: Subir tu Portafolio a GitHub Pages

## ✅ PASO 1: Copiar los archivos del portafolio

### Opción A: Si ya tienes la carpeta `.portfolio` en tu PC

1. Abre el **Explorador de Archivos** de Windows (tecla `Windows + E`)
2. Navega a donde están tus archivos
3. Busca la carpeta llamada `.portfolio`
4. Haz clic derecho sobre ella → **"Enviar a"** → **"Escritorio"**
5. En el escritorio, haz clic derecho sobre `.portfolio` → **"Comprimir en archivo zip o almacenado en un disco"
6. Espera a que se cree `Portfolio.zip`

### Opción B: Si necesitas descargar los archivos desde GitHub

Ve al enlace que te daré abajo y descarga el proyecto completo.

---

## ✅ PASO 2: Crear una cuenta en GitHub

**¿Qué es GitHub?** Es como "Google Drive para programadores".

1. Ve a https://github.com/
2. Haz clic en **"Sign up"** (derecha arriba)
3. Rellena:
   - Nombre de usuario (ej: `ismael-perez`)
   - Correo electrónico
   - Contraseña
   - Edad y país
4. Marca la casilla de verificación
5. Haz clic en **"I already have GitHub"** para saltarte la oferta de 2 meses gratis
6. Haz clic en **"Create account"**

✅ ¡Listo! Ahora tienes cuenta de GitHub.

---

## ✅ PASO 3: Crear un nuevo repositorio en GitHub

1. En GitHub, haz clic en **"+"** (derecha arriba) → **"New repository"**
2. Rellena así:
   - **Repository name:** `portfolio-ismael` (o el nombre que quieras)
   - **Description:** Ismael Pérez Game Designer Portfolio
   - **Public/Private:** Selecciona **"Public"** (importante!)
3. **NO** marques las casillas de "Add a README" ni de ".gitignore"
4. Haz clic en **"Create repository"**

✅ ¡Listo! Tienes un repositorio vacío listo para usar.

---

## ✅ PASO 4: Subir los archivos a GitHub

### Opción A: Sin instalar nada (FAÍCIL - RECOMENDADO)

1. Descarga **GitHub Desktop**: https://desktop.github.com/
2. Ábrelo y haz clic en **"File"** → **"Add local repository..."**
3. Busca el archivo `Portfolio.zip` que creaste
4. Descomprímelo primero (haz doble clic en ZIP)
5. Selecciona la carpeta `.portfolio`
6. Haz clic en **"Import into Git"**
7. Espera a que termine

### Opción B: Usando la web de GitHub (más rápido para principiantes)

1. En GitHub, ve a tu repositorio `portfolio-ismael`
2. Haz clic en **"uploading an existing file"**
3. Arrastra los archivos: `index.html`, `styles.css`, `script.js`, `README.md`
4. Para cada archivo, haz clic en el icono de lápiz ✏️ a la derecha → **"Edit"
5. En la parte inferior, ve a la sección **"Commit changes"**
6. Escribe un mensaje: "Subiendo portafolio inicial"
7. Haz clic en **"Propose and open pull request"**
8. Pon título: "Primer commit del portafolio"
9. Haz clic en **"Create pull request"**
10. En la descripción, escribe: "Mi portafolio web como Game Designer"
11. Haz clic en **"Create pull request"**
12. Espera 1 minuto a que se verifique el código (verás un check verde)

✅ ¡Listo! Tus archivos están ahora en GitHub.

---

## ✅ PASO 5: Activar GitHub Pages

1. En tu repositorio, ve a la pestaña **"Settings"** (arriba derecha)
2. En el menú de la izquierda, busca y haz clic en **"Pages"**
3. En **"Build and deployment"**:
   - **Source:** Selecciona **"Deploy from a branch"**
4. En **"Branch"**:
   - Cambia "main" a **"main"** (o "master" si usas esa rama)
   - En "Folder": selecciona **"/ (root)"**
5. Haz clic en **"Save"**
6. Espera 1-2 minutos...

✅ ¡Listo! GitHub Pages está activo.

---

## ✅ PASO 6: Ver tu página web

En 1-2 minutos recibirás un mensaje con tu URL tipo:

```
https://tu-usuario.github.io/portfolio-ismael/
```

Haz clic en el enlace y... **¡TU SITIO WEB ESTÁ ONLINE! 🎉**

---

## ✅ PASO 7: Personalizar tu página (opcional)

### Cambiar el email de contacto:
1. Abre `index.html` con cualquier editor de texto (Bloc de notas funciona)
2. Busca la línea que dice `ismaeluniperez@gmail.com`
3. Cámbiala por tu correo real
4. Guarda el archivo (Ctrl+S)

### Cambiar las imágenes:
1. En GitHub, ve a tu repositorio
2. Haz clic en **"Code"** (verde arriba) y copia la URL del repositorio
3. Ve a https://github.com/new
4. Usa esta herramienta para subir tus imágenes desde otra carpeta local:
   - [GitHub File Upload](https://github.com/new)

### Añadir más proyectos:
1. Edita `index.html`
2. Busca la sección de proyectos (línea ~35)
3. Copia y pega un bloque `<div class="slide">...</div>`
4. Cambia los nombres e imágenes

---

## 🎯 RESUMEN RÁPIDO (para imprimir)

```
1. Crear cuenta en GitHub.com ✓
2. Crear repositorio "portfolio-ismael" ✓
3. Subir archivos (index.html, styles.css, script.js, README.md) ✓
4. Ir a Settings → Pages y activar ✓
5. Esperar 2 minutos y abrir el enlace ✓
```

---

## 🆘 ¿TE ATORAS?

### Problema: "No encuentro la carpeta .portfolio"
**Solución:** Descarga estos archivos manualmente desde aquí:
- index.html
- styles.css  
- script.js
- README.md
Guárdalos todos en una carpeta nueva llamada `portfolio`.

### Problema: "GitHub me dice que necesita JavaScript habilitado"
**Solución:** Usa GitHub Desktop (Paso 4, opción A).

### Problema: "No sé dónde está mi repositorio Pages"
**Solución:** 
1. En GitHub ve a tu repositorio
2. Click en **Settings** → **Pages**
3. Espera 2 minutos a que se genere la URL

---

## 🎨 CONSEJOS FINALES

1. **Las imágenes deben ser JPG o WebP** (no PNG para el slider)
2. **Nombre de archivo:** Usa inglés sin tildes (ej: `panzerdrifter.jpg` no `pánzerdrífter.jpg`)
3. **Tamaño:** Máximo 500KB por imagen para que cargue rápido
4. **Revisar siempre:** Abre tu página en otro dispositivo para probar

---

## ✨ ¡ESTÁS LISTO!

Con estos pasos tendrás tu portafolio online y podrás compartirlo con cualquier persona.

**Tu URL final será algo como:**
`https://tu-usuario.github.io/portfolio-ismael/`

¡Diviértete creando tu presencia en internet! 🚀