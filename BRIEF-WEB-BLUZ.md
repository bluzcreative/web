# Brief: nueva web de Bluz Creative

## Contexto

Bluz Creative LLC es una agencia de marketing registrada en Estados Unidos, con clientes en Estados Unidos, Canadá, Australia y Latinoamérica. Servicios: paid media, estrategia de contenido, diseño web y automatizaciones.

Queremos rediseñar la web actual partiendo del repositorio existente (`bluzcreative/web`). Ya tiene una base fuerte, incluido un carrusel de logos de clientes. **No empezar de cero: adaptar lo que existe a este nuevo estilo.**

## Forma de trabajo

- Antes de escribir código, revisar el repositorio y proponer un plan por etapas.
- Avanzar paso por paso y mostrar cada etapa antes de seguir con la próxima.
- No usar em dashes (el guion largo) en ningún texto de la web.

## Referencias

- **ICON** (https://www.iconbuild.com/): menú a pantalla completa con las secciones en tipografía gigante, en gris, que se iluminan en blanco al pasar el cursor. Estética seria, mucho espacio, frases enormes como protagonistas.
- **Veintitrés** (https://veintitres.studio/): uso amplio del espacio, casi sin márgenes. En las páginas de proyecto, los elementos se superponen sobre las imágenes al hacer scroll. Logos de clientes corriendo.
- **Drool** (https://www.drool.design/): portafolio con tarjetas que cobran vida al pasar el cursor, mostrando varios mockups e imágenes del proyecto, y desde las que se entra a la página de cada proyecto. Botón de "Start your project" fijo arriba a la derecha.

## Dirección general

- Scrolltelling: la landing es sencilla, pero cada escena del scroll lleva hacia otra parte de la web.
- Espacio amplio, imágenes a todo lo ancho, pocos márgenes.
- Animaciones con intención, nunca a costa de la legibilidad. El contenido debe leerse aunque falle el JavaScript.
- Responsive de verdad: la versión móvil es una composición pensada para móvil, no una versión comprimida del escritorio.
- Stack sugerido para las animaciones: GSAP con ScrollTrigger, y Lenis solo si el scroll suave no da problemas.

## Mapa de páginas

### Fase 1 (lanzamiento)

1. **Inicio**: landing con scrolltelling (ver escenas abajo).
2. **Trabajo**: portafolio con tarjetas animadas al hover.
3. **Página de proyecto**: plantilla reutilizable para cada cliente.
4. **Servicios**: paid media, estrategia de contenido, diseño web y automatizaciones.
5. **Nosotros**: manifiesto, cómo trabajamos y con quiénes trabajamos.
6. **Bluz Lab**: hub de recursos.
7. **Contacto**: pop-up, no página.
8. **Legales**: Privacidad, Términos y Condiciones, Política de Cookies (en el footer, no en el menú).

### Fase 2

- **Portal de clientes** propio, inspirado en ManyRequests pero con la marca Bluz, para revisar y aprobar las grillas de contenido. No construir ahora, pero dejar la estructura preparada para sumarlo (por ejemplo, un acceso en el menú más adelante).

## Componentes globales

### Menú
- Pantalla completa sobre fondo oscuro.
- Nombres de las secciones en tipografía gigante, en gris, que se iluminan al pasar el cursor (como ICON).
- Debajo de "Bluz Lab", una línea pequeña: "Recursos y newsletter".
- Abajo: redes sociales y la suscripción a Contraluz.
- Botón de cerrar arriba a la derecha.

### Botón "Empieza tu proyecto"
- Fijo arriba a la derecha en toda la web.
- Abre el pop-up de contacto.

### Pop-up de contacto
- Se abre desde cualquier botón de contacto, sin salir de la página.
- Debe existir también una URL propia (por ejemplo `/contacto`) que abra el pop-up directamente, para usarla en anuncios, Instagram y firmas de correo.

### Aviso de cookies
- Necesario porque la web usará analítica y pixel de Meta.

## Landing: escenas del scroll

1. **El impacto**: frase gigante a todo lo ancho sobre un video o reel de fondo con trabajos de Bluz.
2. **Qué hacemos**: los cuatro servicios en tipografía enorme; cada palabra pasa de gris a blanco con el scroll. Lleva a **Servicios**.
3. **El trabajo**: tres o cuatro tarjetas de proyectos destacados que cobran vida al hover. Lleva a **Trabajo**.
4. **Con quiénes**: logos de clientes corriendo (reutilizar el carrusel del repo) y los países donde trabajamos. Lleva a **Nosotros**.
5. **El manifiesto**: una frase del manifiesto, enorme, que se va escribiendo con el scroll. Lleva a **Nosotros**.
6. **El laboratorio**: adelanto de lo último en Bluz Lab y suscripción a Contraluz. Lleva a **Bluz Lab**.
7. **El cierre**: un "¿Hablamos?" gigante que abre el pop-up de contacto.

## Portafolio

### Grilla (página Trabajo)
- Tarjetas que, al pasar el cursor, se animan y muestran varios mockups e imágenes del proyecto (estilo Drool).
- Cada tarjeta muestra nombre del cliente, industria, país y servicios.
- Al hacer clic, entra a la página del proyecto.

### Página de proyecto (plantilla)
- Imágenes a todo lo ancho, sin márgenes.
- Al hacer scroll, textos, mockups e imágenes se superponen sobre otras imágenes (estilo Veintitrés).
- Estructura: reto, enfoque, piezas y resultados (cifras como CPA, ROAS o crecimiento cuando existan), y un testimonio al final si lo hay.
- La plantilla debe permitir agregar proyectos nuevos fácilmente (por ejemplo, desde un archivo de datos por proyecto).

## Nosotros

1. **Manifiesto**: 3 a 5 frases con fuerza.
2. **Cómo trabajamos**: concreto y práctico, no visión. Pasos de un proyecto (brief, estrategia, producción, aprobación, lanzamiento, medición), tiempos de respuesta, reuniones y su frecuencia, reportes que recibe el cliente, herramientas, idiomas y manejo de husos horarios.
3. **Con quiénes trabajamos**: logos y países.

## Bluz Lab (hub de recursos)

Secciones:
- **Artículos**: guías y análisis, pensados para SEO.
- **Descargables**: plantillas, checklists y reportes a cambio del correo (alimentan la newsletter).
- **Experimentos**: pruebas de automatización e IA.
- **Contraluz**: archivo de la newsletter, cada edición como página propia e indexable.

Título SEO sugerido para la página: "Bluz Lab: recursos de marketing digital por Bluz Creative".

## Newsletter: Contraluz

- Nombre: **Contraluz** (no se traduce; se usa igual en español y en inglés).
- Subtítulo en español: "El marketing, visto desde otro ángulo".
- Subtítulo en inglés: "Marketing, seen from another angle".
- Suscripción disponible en el menú, en Bluz Lab y en la escena 6 de la landing.

## Pendiente de definir

Estos puntos todavía no están cerrados. Si hacen falta para avanzar, preguntar antes de decidir:

- Estilo visual final: colores, tipografías y si el fondo general es oscuro (tipo ICON) o claro (tipo Drool). Mientras tanto, partir de la identidad que ya tiene el repo.
- Frase principal del hero y textos finales de todas las secciones.
- Texto del manifiesto.
- Lista de proyectos para el portafolio y sus materiales (imágenes, mockups, videos, cifras).
- Si la web será bilingüe (español e inglés).
- Herramienta para la newsletter y los formularios.
