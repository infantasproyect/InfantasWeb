/* saludo.js: muestra "Hola! Nombre" en la esquina superior derecha.
   Color según el rol: Estudiante = verde, Docente = azul, Visitante = rojo.
   Lee los datos que guardó el login (index.html) en sessionStorage. */
(function () {
  var data = null;
  try { data = JSON.parse(sessionStorage.getItem('usuario')); } catch (e) {}
  if (!data || !data.nombre) return;            // sin login previo: no muestra nada

  /* Colores por rol: fondo, borde, texto y separador. Cámbialos aquí si quieres otros tonos. */
  var COLORES = {
    Estudiante: { bg: '#e0f5e6', bd: '#2f9e5b', tx: '#0f3d22', sep: '#9fd5b2' },   // verde
    Docente:    { bg: '#e1efff', bd: '#3b82f6', tx: '#0f2f5c', sep: '#9ec3f5' },   // azul
    Visitante:  { bg: '#ffe3e0', bd: '#e5484d', tx: '#5c1414', sep: '#f2a9a6' },   // rojo
    Admin:      { bg: 'linear-gradient(90deg,#7b2ff7,#f107a3)', bd: '#ffd1f0', tx: '#ffffff', sep: 'rgba(255,255,255,.55)' }   // morado + rosado
  };
  var c = COLORES[data.rol] || { bg: '#e8f3da', bd: '#5aa469', tx: '#163823', sep: '#b8d3a8' };

  function mostrar() {
    var css = document.createElement('style');
    css.textContent =
      '.saludo-usuario{position:fixed;top:10px;right:14px;z-index:9999;display:flex;align-items:center;gap:8px;' +
      'background:' + c.bg + ';color:' + c.tx + ';border:1.5px solid ' + c.bd + ';border-radius:999px;padding:6px 14px;' +
      'font:600 14px Poppins,system-ui,sans-serif;box-shadow:0 6px 18px rgba(0,0,0,.16);' +
      'animation:saludoIn .7s cubic-bezier(.2,1.3,.4,1) both}' +
      '.saludo-usuario .punto{width:9px;height:9px;border-radius:50%;background:' + c.bd + ';animation:saludoPulso 2s ease-in-out infinite}' +
      '.saludo-usuario .mano{display:inline-block;transform-origin:70% 70%;animation:saludoOnda 1.8s ease-in-out 1s 2}' +
      '.saludo-usuario small{font-weight:600;opacity:.8;border-left:1px solid ' + c.sep + ';padding-left:8px}' +
      '@keyframes saludoIn{from{transform:translateY(-30px);opacity:0}}' +
      '@keyframes saludoPulso{50%{transform:scale(1.5);opacity:.5}}' +
      '@keyframes saludoOnda{0%,60%,100%{transform:rotate(0)}10%,30%{transform:rotate(16deg)}20%,40%{transform:rotate(-10deg)}}' +
      '@media (max-width:575px){.saludo-usuario small{display:none}.saludo-usuario{font-size:13px;top:8px;right:8px}}' +
      '@media (prefers-reduced-motion:reduce){.saludo-usuario,.saludo-usuario .mano,.saludo-usuario .punto{animation:none}}';
    document.head.appendChild(css);

    var box = document.createElement('div');
    box.className = 'saludo-usuario';
    box.setAttribute('role', 'status');

    var mano = document.createElement('span');
    mano.className = 'mano';
    mano.setAttribute('aria-hidden', 'true');
    mano.textContent = '\uD83D\uDC4B';

    var texto = document.createElement('span');
    texto.textContent = 'Hola! ' + String(data.nombre).split(' ')[0];   // solo el primer nombre

    box.appendChild(mano);
    box.appendChild(texto);

    if (data.rol) {
      var rol = document.createElement('small');
      var TIPOS = ['Particular', 'Padre de familia', 'Egresado'];
      var extra = (data.rol === 'Visitante' && TIPOS.indexOf(data.tipo) > -1) ? ' \u00B7 ' + data.tipo : '';
      rol.textContent = data.rol + extra;
      box.appendChild(rol);
    }
    // punto de color que late junto al rol
    var punto = document.createElement('span');
    punto.className = 'punto';
    punto.setAttribute('aria-hidden', 'true');
    box.appendChild(punto);

    document.body.appendChild(box);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mostrar);
  else mostrar();

  /* Al darle "Log Out" se borra el saludo */
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href$="index.html"]');
    if (a && !a.hasAttribute('data-keep')) { try { sessionStorage.removeItem('usuario'); sessionStorage.removeItem('admin'); } catch (err) {} }
  });
})();
