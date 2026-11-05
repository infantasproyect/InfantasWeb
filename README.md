# Infantas Web - Blog

## README: documentación funcional y técnica

**Tipo de proyecto:** plataforma educativa institucional de código abierto.\
**Institución:** Institución Educativa Infantas, área de Ética (año 2026).\
**Idioma:** español.\
**Tecnologías:** HTML, CSS y JavaScript del lado del cliente.\
**Publicación:** GitHub Pages.\
**URL pública:** _(agrega aquí la dirección de GitHub Pages)_

------------------------------------------------------------------------

# 1. Propósito del proyecto

**Infantas Web - Blog** es una plataforma educativa institucional donde
se reúnen los blogs y proyectos que desarrollan los estudiantes de los
grados 10º y 11º en la asignatura de Ética y Valores. Busca que el
trabajo de cada estudiante tenga un espacio visible y fácil de
encontrar para toda la comunidad educativa.

Sus objetivos son:

-   Reunir en un solo lugar los blogs y proyectos de los grados 10º y 11º.
-   Permitir encontrar el trabajo de cada estudiante por nombre o por grado.
-   Promover la reflexión, los valores y el pensamiento crítico.
-   Mantener un historial de cambios del sitio.
-   Documentar las herramientas y la organización técnica del proyecto.

El proyecto es de **código abierto** y **todo en él es modificable**:
páginas, estilos, listas, textos y scripts pueden editarse, adaptarse y
mejorarse según las necesidades de la institución.

El sitio es un recurso educativo. Los contenidos sensibles deben
tratarse con respeto, fuentes confiables y lenguaje apropiado para el
público.

# 2. Estructura del proyecto

El proyecto no usa base de datos ni servidor propio. Todo está hecho con
archivos estáticos:

``` text
InfantasWeb/
├── index.html               Login (pantalla de acceso)
├── home.html                Página principal
├── temas.html               Publicaciones por grado
├── busqueda-manual.html     Búsqueda global
├── actualizaciones.html     Historial de versiones
├── desarrollo.html          Información técnica del proyecto
├── desarrollo-mejorado.html Versión alterna de desarrollo
├── cuestionarios.html       Actividades
├── directorio_10B.html      Directorio del grado 10-B
├── 10a.html ... 11c.html    Lista de estudiantes de cada grado
├── admin.html               Panel de administración
├── README.md                Este documento
├── css/
│   ├── bootstrap.css
│   ├── fonts.css
│   ├── style.css
│   ├── style2.css
│   └── style3.css
├── js/
│   ├── core.min.js          Librerías base de la plantilla
│   ├── script.js            Comportamiento general de la plantilla
│   ├── saludo.js            Etiqueta de saludo al usuario
│   └── auth.js              Guardia de sesión
├── images/
└── fonts/
```

# 3. Secciones del sitio

## 3.1 Login (`index.html`)

Es la puerta de entrada. Pide dos datos:

-   **Nombre:** se valida que sea un nombre real (solo letras, cada
    parte con mayúscula inicial, sin groserías ni texto al azar).
-   **Rol:** `Docente`, `Estudiante` o `Visitante`.

Según el rol, el acceso cambia:

-   **Estudiante:** entra directamente tras validar el nombre.
-   **Docente:** el nombre se comprueba contra una lista de docentes
    definida en el propio script. Si no aparece, no se permite el acceso.
-   **Visitante:** además debe elegir cómo visita el sitio (Particular,
    Padre de familia o Egresado).

Si todo es correcto, se muestra una animación de bienvenida y se abre
`home.html`. Los datos **no se envían a ningún servidor**: solo se
guardan en el `sessionStorage` del navegador y se borran al cerrar la
pestaña o al cerrar sesión.

Las listas de palabras bloqueadas, los roles y los nombres de docentes
están al inicio del script del login y pueden editarse.

## 3.2 Inicio (`home.html`)

Página principal. Presenta el proyecto, muestra un carrusel con los
mensajes de bienvenida y ofrece accesos directos a los seis grados
(10-A, 10-B, 10-C, 11-A, 11-B y 11-C). Desde aquí también se navega al
resto de las secciones con la barra superior.

## 3.3 Publicaciones por grado (`temas.html` y páginas de cada grado)

Cada grado (`10a.html`, `10b.html`, `10c.html`, `11a.html`, `11b.html`,
`11c.html`) contiene una **lista de estudiantes**. La lista tiene un
buscador por nombre y cada estudiante enlaza (con un `href`) al trabajo
o blog que realizó.

Para agregar un estudiante, se añade una entrada a la lista del grado
correspondiente con su nombre y el enlace a su trabajo. Para quitarlo,
se elimina esa entrada.

## 3.4 Búsqueda manual (`busqueda-manual.html`)

Es una **búsqueda global**: permite encontrar a un estudiante por su
nombre, o consultar por grado, sin tener que entrar grado por grado. Al
encontrar el resultado, se abre el trabajo enlazado.

## 3.5 Actualizaciones (`actualizaciones.html`)

Historial de versiones del sitio. Cada versión se presenta con su
número, fecha y la lista de cambios implementados, corregidos o
retirados. Solo deben registrarse cambios que realmente estén
disponibles en la versión publicada.

## 3.6 Desarrollo Web (`desarrollo.html`)

Ficha técnica del proyecto: editor de código, programador, alojamiento,
tecnologías, fuentes de consulta y propósito del sitio.

Algunos textos usan `contenteditable`, que permite editarlos en
pantalla, pero **no guarda cambios**: se pierden al recargar. Para
conservarlos hay que editar el HTML y volver a publicarlo.

## 3.7 Cuestionarios (`cuestionarios.html`)

Sección de actividades didácticas relacionadas con los temas.

# 4. Control de acceso y sesión

## 4.1 Cómo funciona

1.  Al ingresar correctamente en el login, se guardan dos datos en el
    `sessionStorage`: el usuario (nombre, rol y tipo de visitante) y una
    marca de sesión activa.
2.  Cada página protegida carga `js/auth.js` al inicio de su `<head>`.
3.  `auth.js` oculta la página, comprueba que exista la marca de sesión
    y, si no existe, redirige a `index.html`. Si existe, muestra la
    página con normalidad.
4.  Al pulsar **Log Out**, se llama a `cerrarSesion()`, que borra la
    sesión y vuelve al login. Si el usuario regresa con el botón
    "atrás", `auth.js` vuelve a comprobar la sesión y lo expulsa.

Con esto, escribir directamente la dirección de una página (por ejemplo
`home.html`) sin haber iniciado sesión lleva de nuevo al login.

## 4.2 Cómo proteger una página nueva

1.  Agrega esto lo más arriba posible dentro del `<head>`:

    ``` html
    <script src="./js/auth.js"></script>
    ```

2.  En el enlace de Log Out de la página, usa:

    ``` html
    <a href="./index.html" onclick="cerrarSesion(); return false;">Log Out</a>
    ```

`index.html` y `admin.html` no cargan `auth.js`: el login es la página
pública de entrada y el panel admin tiene su propia comprobación.

## 4.3 Saludo (`js/saludo.js`)

Es un script sencillo que muestra una **etiqueta de saludo** con el
nombre del usuario. Solo aparece mientras la persona haya iniciado
sesión en el login y esté en `home.html`; al cerrar sesión o cerrar la
pestaña, desaparece.

## 4.4 Alcance de la seguridad

Este control de acceso funciona **en el navegador**. Evita que
cualquier visitante entre a las páginas escribiendo la dirección, y es
adecuado para proyectos y blogs escolares. Sin embargo:

-   Como GitHub Pages es un hosting estático, los archivos publicados
    son técnicamente accesibles por su dirección.
-   Alguien con conocimientos técnicos puede saltarse una comprobación
    hecha solo en el navegador.
-   Por eso **no debe usarse para proteger información confidencial**
    (datos personales, notas, documentos privados). Para eso se
    necesita un servidor o un servicio de autenticación.

# 5. Panel de administración (`admin.html`)

Es un panel privado de uso personal del administrador del sitio. Solo
se abre después de pasar por el acceso de administrador del login, que
incluye una **verificación con preguntas de seguridad**. Si se intenta
abrir por la dirección directa sin haber pasado por ese acceso, redirige
al login.

El panel ofrece:

-   **Listado de todas las páginas** del sitio, en tarjetas con su
    nombre, archivo, categoría (Principal, Contenido o Grados) y
    descripción.
-   **Abrir** cada página en una pestaña con un clic.
-   **Ver código:** muestra el código fuente de cada archivo en modo
    solo lectura, con numeración de líneas, número de líneas y tamaño.
-   **Buscador y filtros** por categoría.
-   **Indicadores:** cantidad de páginas, hora, estado y resultados
    mostrados.
-   **Cerrar sesión.**

La lista de páginas se define en una constante `FILES` dentro del script
del propio `admin.html`. Para agregar o quitar páginas del panel, se
edita esa lista.

## 5.1 Preguntas de seguridad

Las respuestas de las preguntas de seguridad **no están escritas en el
código**: se guardan **cifradas** como valores numéricos (una huella
calculada con una función de cifrado). Tras tres intentos fallidos, el
formulario se bloquea unos segundos.

Para cambiar una respuesta:

1.  Abre `index.html` en el navegador y abre la **consola** del
    navegador (`F12`, pestaña "Consola").
2.  Ejecuta la función `h53('NuevaRespuesta')`. Devuelve un número.
3.  Copia ese número y reemplaza el valor correspondiente en la lista
    `SEG` del script de `index.html`.
4.  Guarda y publica el cambio.

Las preguntas en sí (el texto que se muestra) se editan en el HTML del
formulario de seguridad dentro de `index.html`.

# 6. Navegación

La barra superior es común a las páginas del sitio e incluye el logo, los
enlaces a las secciones y el botón **Log Out**. En pantallas pequeñas se
convierte en un menú desplegable.

Si cada página tiene su propia copia de la barra, un cambio de enlace
debe repetirse en todas las páginas. Para cambiar un destino, se edita
el `href` del enlace. Las rutas del proyecto son relativas (`./home.html`),
lo que permite que funcionen dentro de la subcarpeta que GitHub Pages
asigna al repositorio. Evita rutas que comiencen con `/`, porque pueden
apuntar a la raíz del dominio y producir un error 404.

# 7. Tecnologías

-   **HTML:** estructura y contenido de cada página.
-   **CSS:** diseño visual. El login y el panel admin llevan sus
    estilos dentro de una etiqueta `<style>`; el resto de páginas usa
    las hojas de la carpeta `css/`. Se usan variables CSS (`:root`) para
    mantener la paleta de colores y diseño adaptable a móvil con
    `@media`.
-   **JavaScript:** validación del login, animaciones, buscadores,
    control de sesión (`auth.js`), saludo (`saludo.js`) y panel admin.
-   **Fuentes:** Fraunces y Figtree en el login; Space Grotesk y
    JetBrains Mono en el panel admin.

Se respeta `prefers-reduced-motion` para quienes prefieren menos
movimiento.

# 8. Publicación en GitHub Pages

GitHub Pages publica sitios estáticos desde un repositorio. No existe un
servidor propio ni base de datos.

Proceso de publicación:

1.  Editar los archivos en el editor de código.
2.  Guardar y probar localmente.
3.  Revisar la consola del navegador.
4.  Subir los cambios al repositorio.
5.  Esperar a que termine el despliegue.
6.  Probar la **URL pública**: login, navegación, buscadores, enlaces a
    los trabajos y panel admin.

Si no ves los cambios, recarga con `Ctrl + Shift + R` para evitar la
caché.

**Nota:** el visor de código del panel admin lee los archivos mediante
una petición al hosting, por lo que solo funciona en la versión
publicada o en un servidor local, no abriendo los archivos directamente
desde el disco.

# 9. Mantenimiento del contenido

## Agregar un estudiante

1.  Abre la página del grado (`10a.html`, `11b.html`, etc.).
2.  Agrega una entrada a la lista con el nombre y el enlace a su
    trabajo.
3.  Si la búsqueda manual usa una lista propia, agrega también al
    estudiante allí.
4.  Prueba el buscador y el enlace en la versión publicada.

## Agregar una página nueva

1.  Crea o duplica una página existente.
2.  Agrega `js/auth.js` en el `<head>` para protegerla.
3.  Añade el enlace en la barra de navegación.
4.  Agrégala a la lista `FILES` del panel admin.
5.  Registra el cambio en `actualizaciones.html`.

## Agregar un docente

Añade su nombre a la lista de docentes del script de `index.html`.

## Actualizar el historial

Cada versión debería indicar número, fecha, resumen y listas de cambios
implementados, corregidos o retirados.

# 10. Lista de pruebas antes de publicar

## Acceso

-   [ ] Abrir `home.html` directamente, sin sesión, redirige al login.
-   [ ] Cada rol (Estudiante, Docente, Visitante) puede ingresar.
-   [ ] Un nombre no válido o un docente que no está en la lista es
    rechazado.
-   [ ] Log Out cierra la sesión y "atrás" no devuelve a la página.
-   [ ] El panel admin no se abre sin pasar por su acceso.
-   [ ] El saludo aparece solo con sesión iniciada en `home.html`.

## Navegación y contenido

-   [ ] Todos los enlaces de la barra funcionan.
-   [ ] Los seis grados abren su lista de estudiantes.
-   [ ] El buscador de cada grado encuentra estudiantes.
-   [ ] La búsqueda manual funciona por nombre y por grado.
-   [ ] Los enlaces a los trabajos abren correctamente.
-   [ ] No hay errores 404 en la URL publicada.

## Diseño

-   [ ] Se ve bien en escritorio y móvil.
-   [ ] Las imágenes y los estilos cargan.
-   [ ] No hay desplazamiento horizontal involuntario.

## Publicación

-   [ ] Se probó la versión publicada y no solo la local.
-   [ ] La consola no muestra errores importantes.
-   [ ] No se publicaron claves ni datos confidenciales.
-   [ ] El historial refleja cambios reales.

# 11. Solución de problemas

**Error 404:** revisa el nombre del archivo, mayúsculas y minúsculas,
la carpeta donde está y que la ruta sea relativa (`./archivo.html`).

**La página aparece sin estilos:** comprueba la ruta de la hoja CSS en
`css/` y que el archivo exista.

**Una página protegida redirige siempre al login:** verifica que el
login se haya completado en esa misma pestaña (la sesión es por
pestaña) y que `js/auth.js` exista en la carpeta `js/`.

**El saludo no aparece:** debes haber iniciado sesión en el login y
estar en `home.html`, que debe cargar `js/saludo.js`.

**El visor de código del admin no carga:** abre el sitio desde la URL
publicada, no desde el disco.

**Los cambios no se ven:** espera a que termine el despliegue y recarga
con `Ctrl + Shift + R`.

# 12. Convenciones recomendadas

-   Usar nombres de archivo descriptivos y en minúscula.
-   No duplicar identificadores (`id`) dentro de una misma página.
-   Probar después de cada cambio importante.
-   Usar el historial de Git como copia de seguridad.
-   Actualizar este README cuando cambie el funcionamiento real.

# 13. Glosario

-   **HTML:** lenguaje de marcado para la estructura de la página.
-   **CSS:** lenguaje para el diseño visual.
-   **JavaScript:** lenguaje que añade interactividad en el navegador.
-   **`sessionStorage`:** almacenamiento temporal del navegador; se
    borra al cerrar la pestaña.
-   **Hosting estático:** servicio que entrega archivos sin ejecutar
    código en un servidor.
-   **GitHub Pages:** servicio para publicar sitios estáticos desde un
    repositorio.
-   **Ruta relativa:** ruta interpretada desde la ubicación del archivo
    actual.
-   **404:** error que indica que el recurso solicitado no se encontró.
-   **Caché:** almacenamiento temporal que puede mostrar versiones
    antiguas de una página.
-   **Código abierto:** el código está disponible para consultarse,
    usarse y modificarse.

# 14. Conclusión

**Infantas Web - Blog** reúne en una plataforma institucional abierta y
modificable el trabajo de los estudiantes de los grados 10º y 11º,
con acceso por login, búsqueda por nombre y por grado, y un panel para
su administración. Su calidad depende de que la navegación funcione, los
enlaces a los trabajos estén vigentes y la documentación se mantenga al
día.

**Regla principal de mantenimiento:** no dar por terminada una función
hasta haberla probado en la versión publicada.
