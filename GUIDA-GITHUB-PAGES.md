# 🎮 Guía Paso a Paso - Subir tu Portfolio a GitHub Pages

¡Hola Ismael! He corregido todos los errores de las versiones anteriores. Tu portfolio está listo. Aquí tienes el paso a paso para subirlo a GitHub Pages:

---

## ✅ ESTADO ACTUAL DE TUS ARCHIVOS

Todos los archivos están en `.portfolio/` y **ya están corregidos**:

| Archivo | Estado | Versión |
|---------|--------|---------|
| `index.html` | ✅ Corregido | v=6 |
| `styles.css` | ✅ Bien | v=5 |
| `script.js` | ✅ Corregido | v=6 |
| Imágenes en `assets/` | ✅ 5 imágenes listas | - |
| PDFs en `assets/` | ✅ CV y GDDs listos | - |

---

## 📋 PASO A PASO PARA SUBIR A GITHUB PAGES

### Paso 1: Iniciar sesión en GitHub (si no lo has hecho)

1. Ve a [github.com](https://github.com)
2. Haz clic en "Sign in"
3. Introduce tu correo y contraseña

---

### Paso 2: Crear el repositorio nuevo

1. En GitHub, haz clic en **"+"** (arriba a la derecha) → **"New repository"**
2. Rellena así:
   - **Repository name:** `portfolio-ismaelperez` (o lo que quieras)
   - **Description:** Game Designer Portfolio
   - **Public/Private:** Public (GitHub Pages solo funciona con repositorios públicos)
3. ✅ Desmarca "Add a README" y "Add .gitignore"
4. Haz clic en **"Create repository"**

---

### Paso 3: Subir los archivos desde tu ordenador

Ahora tienes dos opciones:

#### OPCIÓN A: Usar el botón de subida (más fácil para principiantes)

1. En tu nuevo repositorio, haz clic en el botón grande que dice **"uploading an/..."**
2. Arrastra la carpeta **`.portfolio`** completa (con todo su contenido) a la zona de subida
3. Espera a que termine

#### OPCIÓN B: Usar Git (más profesional, pero más complejo)

Si quieres usar Git:

```bash
# En la terminal, navega hasta donde tienes tu carpeta .portfolio
cd C:/Users/USUARIO/.lmstudio/apps/bionic/projects/1f3e652f-83fe-45f1-9c79-69c30a1e5617/workspace

# Inicia Git (si no lo has hecho)
git init

# Añade la carpeta .portfolio como nuevo repositorio
cd .portfolio
git init

# Sube todos los archivos
git add .
git commit -m "Portfolio v6 - Bilingüe ES/EN corregido"

# Enlaza con tu repositorio de GitHub (reemplaza TU-USER y repo-name)
git remote add origin https://github.com/TU-USER/portfolio-ismaelperez.git

# Sube los archivos
git push -u origin main
```

---

### Paso 4: Activar GitHub Pages

Una vez subidos los archivos:

1. En tu repositorio, ve a **Settings** (Configuración)
2. Haz clic en **Pages** en el menú izquierdo
3. En **"Build and deployment" → "Source"**, selecciona **Deploy from a branch**:
   - Branch: **main**
   - Folder: **/root/** (o /portfolio/ si quieres que la URL sea más corta)
4. Haz clic en **Save**
5. Espera 1-2 minutos
6. Vuelve a la página de Pages y verás tu URL

---

### Paso 5: Tu sitio estará online

Tu portfolio estará disponible en:
- `https://TU-USER.github.io/portfolio-ismaelperez/`

O si pusiste `/root/`:
- `https://TU-USER.github.io/`

---

## ⚠️ LO ÚNICO FALTA HACER ANTES DE SUBIR

**Debes crear tu CV en inglés:**

1. Abre `assets/CV-Ismael-Perez.pdf` (tu CV español)
2. Tradúcelo completamente al inglés
3. Guárdalo como `assets/CV-Ismael-Perez-EN.pdf`
4. **Importante:** Asegúrate de que el nombre sea exacto: `CV-Ismael-Perez-EN.pdf`

Sin este archivo, el botón "Download CV" en inglés no funcionará.

---

## 🎯 PRÓXIMAMENTE (FUNCIONALIDADES QUE PUEDES AÑADIR)

- [ ] Animaciones de entrada para las secciones
- [ ] Formulario de contacto con Formspree o Netlify Forms
- [ ] Sección de testimonios/clientes
- [ ] Blog personal sobre diseño de juegos
- [ ] Integración con LinkedIn/Twitter

---

## 📞 ¿NEVAS AYUDA?

Si te atascas en algún paso, dímelo y te ayudo. ¡Tu portfolio está casi listo!

**Buen trabajo!** 👏
