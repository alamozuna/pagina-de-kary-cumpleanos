# Prompt para Antigravity — Web de cumpleaños de Karyleydi

Copia todo el bloque siguiente y pégalo en Antigravity:

---

## Contexto del proyecto

Quiero que construyas una página web de cumpleaños para **Karyleydi Ortíz Segura**, que cumple **24 años**. Es un regalo emotivo hecho por sus amigos y familia: un collage de fotos organizado por secciones, con estética de fotografía instantánea (tipo Polaroid), y con videos como pieza central de la experiencia.

## Referencia visual obligatoria

Antes de escribir una sola línea de código, visita e inspecciona esta página: **https://portafolio-one-ruddy-57.vercel.app/**

Extrae y documenta de ella:
- La **paleta de colores exacta** (colores primarios, secundarios, fondos, acentos) leyendo su CSS.
- La **tipografía** utilizada (familias, pesos, tamaños de headings vs. body).
- El **estilo general** de espaciado, bordes y sombras.

Usa esos mismos tokens de diseño como base del sistema visual de la nueva página. Crea un archivo de variables CSS (o config de Tailwind) con esos valores documentados antes de maquetar.

## Estructura de contenido

Las fotos están organizadas en carpetas locales. Cada carpeta es una **sección de la página**, en este orden:

1. Fotos con Alam
2. Fotos con Asleyri
3. Fotos con Bryan
4. Fotos con Carina y Daniel
5. Fotos con Gente Que te Quiere
6. Fotos con Leslie
7. Fotos con Ronel
8. Fotos de Kary en el Espectro

Requisitos de estructura:
- La página debe cargar las imágenes dinámicamente desde una carpeta `/public/fotos/<nombre-seccion>/`, de modo que pueda agregar o quitar fotos sin tocar el código. Genera un script o manifest (`fotos.json`) que se regenere automáticamente al hacer build escaneando las carpetas.
- Cada sección tiene un encabezado con el nombre (sin la palabra "Fotos con", solo el nombre de la persona o grupo, con estilo decorativo).
- Navegación sticky o menú flotante para saltar entre secciones, con scroll suave.
- Sección hero inicial: nombre de Kary, "Feliz cumpleaños #24", fecha, y una animación de entrada memorable (confeti, partículas o pétalos cayendo).

## Estilo de las fotos: marco de cámara instantánea

- Todas las fotos deben renderizarse con **marco tipo Polaroid**: borde blanco grueso, borde inferior más ancho, sombra suave, y una ligera rotación aleatoria (-4° a +4°) para efecto de collage real.
- En el borde inferior blanco de cada polaroid, espacio para un caption corto opcional (manuscrito, usar una tipografía handwriting que combine con la referencia).
- Layout masonry/collage: las fotos no deben verse en una grilla rígida, sino como un tablero de recuerdos.
- Al hacer hover: la foto se endereza (rotación a 0°), escala ligeramente y eleva su sombra.
- Al hacer clic: lightbox a pantalla completa con navegación entre fotos de la sección.

## Videos: la parte más importante

Algunas carpetas contendrán **videos** además de fotos. Los videos son el corazón emocional de la página:

- Detecta automáticamente archivos `.mp4`/`.webm`/`.mov` en cada carpeta y trátalos distinto a las fotos.
- Cada video debe estar **visualmente resaltado**: tamaño mayor que las polaroids, marco especial (por ejemplo dorado o con brillo/glow animado), un badge o etiqueta tipo "🎬 Mensaje especial", y una animación sutil de pulso o shimmer que atraiga la mirada.
- Reproducción en un reproductor elegante dentro de un modal/lightbox, con poster (thumbnail) generado o configurable.
- Si una sección tiene video, colócalo destacado al inicio de esa sección, no mezclado en el collage.

## Efectos y animaciones (femenino, emotivo y dinámico)

Quiero que la página se sienta viva y tierna, sin ser pesada:

- Animaciones de entrada por scroll (fade + slide up) para cada polaroid, con stagger.
- Micro-interacciones: corazones flotantes al hacer clic en una foto, sparkles sutiles en los títulos.
- Confeti o pétalos animados en el hero al cargar la página.
- Transiciones suaves entre secciones (parallax ligero o degradados animados de fondo).
- Divisores de sección decorativos (líneas con corazones, destellos o motivos florales acordes a la paleta extraída).
- Cursor personalizado opcional (un pequeño destello o corazón que sigue el mouse) — solo en desktop.
- Un botón flotante "🎁 Sorpresa" que dispare una lluvia de confeti + un mensaje de cumpleaños en overlay.
- Respeta `prefers-reduced-motion`.

## Requisitos técnicos

- Stack: **Vite + React** (o Astro si lo justificas), CSS con variables del sistema de diseño extraído. Puedes usar Framer Motion para animaciones y canvas-confetti para el confeti.
- 100% responsive: en móvil el collage pasa a 2 columnas y los videos a ancho completo. La mayoría lo verá desde el celular.
- Lazy loading de imágenes y videos, con placeholders blur para que cargue rápido aunque haya muchas fotos.
- Optimiza las imágenes en build (formatos modernos webp/avif con fallback).
- Meta tags Open Graph con una foto de portada, para que se vea bonito al compartir el link por WhatsApp.
- Código organizado por componentes: `Hero`, `SectionNav`, `PolaroidCard`, `VideoFeature`, `Lightbox`, `Confetti`.
- Deploy final pensado para Vercel.

## Proceso de trabajo

1. Inspecciona la página de referencia y documenta los tokens de diseño en un archivo.
2. Propón la arquitectura de carpetas y componentes y muéstramela antes de codificar.
3. Implementa primero el hero + una sección de ejemplo con fotos dummy para validar el estilo.
4. Cuando apruebe el estilo, completa las 8 secciones, el manejo de videos y los efectos.
5. Entrega instrucciones claras de cómo colocar mis fotos/videos en las carpetas y hacer deploy.

---
