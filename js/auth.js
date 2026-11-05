(function () {
  // Oculta la página hasta validar (evita ver el contenido por un instante)
  document.documentElement.style.display = "none";

  var logueado = sessionStorage.getItem("sesionActiva") === "true";

  if (!logueado) {
    // replace evita que el botón "atrás" regrese a la página protegida
    window.location.replace("index.html");
  } else {
    document.documentElement.style.display = "";
  }
})();

function cerrarSesion() {
  sessionStorage.removeItem("sesionActiva");
  window.location.replace("index.html");
}