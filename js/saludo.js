/* saludo.js: muestra "Hola! Nombre" en la esquina superior derecha.
   Lee los datos que guardó el login (index.html) en sessionStorage ("usuario").
   Colores: Estudiante = verde · Docente = azul · Visitante = rojo · Auxiliar = naranja
            Administrativo = turquesa · Admin = morado + rosado.
   Si no aparece, abre la consola del navegador (F12): este script deja un aviso con la causa. */
(function () {
  /* Colores por rol: fondo, borde, texto y separador. Cámbialos aquí si quieres otros tonos. */
  var COLORES = {
    Estudiante:     { bg: '#e0f5e6', bd: '#2f9e5b', tx: '#0f3d22', sep: '#9fd5b2' },   // verde
    Docente:        { bg: '#e1efff', bd: '#3b82f6', tx: '#0f2f5c', sep: '#9ec3f5' },   // azul
    Visitante:      { bg: '#ffe3e0', bd: '#e5484d', tx: '#5c1414', sep: '#f2a9a6' },   // rojo
    Auxiliar:       { bg: '#ffecd6', bd: '#e0780c', tx: '#5a2c00', sep: '#f3c28f' },   // naranja
    Administrativo: { bg: '#d9f4f6', bd: '#0e8f9c', tx: '#06363b', sep: '#8fd2d8' },   // turquesa
    Admin:          { bg: 'linear-gradient(90deg,#7b2ff7,#f107a3)', bd: '#ffd1f0', tx: '#ffffff', sep: 'rgba(255,255,255,.55)' }   // morado + rosado
  };
  var TIPOS = ['Particular', 'Padre de familia', 'Egresado'];

  function leer() {
    try { return JSON.parse(sessionStorage.getItem('usuario')); } catch (e) { return null; }
  }

  function dibujar() {
    var viejo = document.querySelector('.saludo-usuario');
    if (viejo) viejo.remove();                                  // nunca duplicar la burbuja

    var data = leer();
    if (!data || typeof data.nombre !== 'string' || !data.nombre.trim()) {
      if (window.console) console.warn('[saludo] No hay sesión "usuario" en sessionStorage: inicia sesión desde index.html (o revisa que auth.js no la borre).');
      return;
    }
    var c = COLORES[data.rol] || { bg: '#e8f3da', bd: '#5aa469', tx: '#163823', sep: '#b8d3a8' };

    if (!document.getElementById('saludo-css')) {
      var css = document.createElement('style');
      css.id = 'saludo-css';
      css.textContent =
        '.saludo-usuario{position:fixed;top:10px;right:14px;z-index:99999;display:flex;align-items:center;gap:8px;' +
        'border-radius:999px;padding:6px 14px;font:600 14px Poppins,system-ui,sans-serif;box-shadow:0 6px 18px rgba(0,0,0,.16);' +
        'animation:saludoIn .7s cubic-bezier(.2,1.3,.4,1) both}' +
        '.saludo-usuario .punto{width:9px;height:9px;border-radius:50%;animation:saludoPulso 2s ease-in-out infinite}' +
        '.saludo-usuario .mano{display:inline-block;transform-origin:70% 70%;animation:saludoOnda 1.8s ease-in-out 1s 2}' +
        '.saludo-usuario small{font-weight:600;opacity:.8;padding-left:8px;border-left:1px solid}' +
        '@keyframes saludoIn{from{transform:translateY(-30px);opacity:0}}' +
        '@keyframes saludoPulso{50%{transform:scale(1.5);opacity:.5}}' +
        '@keyframes saludoOnda{0%,60%,100%{transform:rotate(0)}10%,30%{transform:rotate(16deg)}20%,40%{transform:rotate(-10deg)}}' +
        '@media (max-width:575px){.saludo-usuario small{display:none}.saludo-usuario{font-size:13px;top:8px;right:8px}}' +
        '@media (prefers-reduced-motion:reduce){.saludo-usuario,.saludo-usuario .mano,.saludo-usuario .punto{animation:none}}';
      document.head.appendChild(css);
    }

    var box = document.createElement('div');
    box.className = 'saludo-usuario';
    box.setAttribute('role', 'status');
    box.style.background = c.bg;
    box.style.color = c.tx;
    box.style.border = '1.5px solid ' + c.bd;

    var mano = document.createElement('span');
    mano.className = 'mano';
    mano.setAttribute('aria-hidden', 'true');
    mano.textContent = '\uD83D\uDC4B';

    var texto = document.createElement('span');
    texto.textContent = 'Hola! ' + String(data.nombre).trim().split(' ')[0];   // solo el primer nombre

    box.appendChild(mano);
    box.appendChild(texto);

    if (data.rol) {
      var rol = document.createElement('small');
      var extra = (data.rol === 'Visitante' && TIPOS.indexOf(data.tipo) > -1) ? ' \u00B7 ' + data.tipo : '';
      rol.textContent = data.rol + extra;
      rol.style.borderLeftColor = c.sep;
      box.appendChild(rol);
    }
    var punto = document.createElement('span');
    punto.className = 'punto';
    punto.setAttribute('aria-hidden', 'true');
    punto.style.background = c.bd;
    box.appendChild(punto);

    document.body.appendChild(box);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', dibujar);
  else dibujar();

  /* Si vuelven con el botón "Atrás", el navegador puede restaurar la página sin volver a ejecutar scripts */
  window.addEventListener('pageshow', function (e) { if (e.persisted) dibujar(); });

  /* Al darle "Log Out" (enlace a index.html) se borra la sesión del saludo */
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href$="index.html"]');
    if (a && !a.hasAttribute('data-keep')) {
      try { sessionStorage.removeItem('usuario'); sessionStorage.removeItem('admin'); } catch (err) {}
    }
  });
})();
