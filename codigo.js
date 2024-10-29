document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const usuario = document.getElementById("usuario");
    const contraseña = document.getElementById("contraseña");
    const usuarioError = document.getElementById("usuarioError");
    const contraseñaError = document.getElementById("contraseñaError");

    let isValid = true;

    // Validar usuario
    if (usuario.value.trim() === "") {
        usuarioError.textContent = "El campo usuario es obligatorio.";
        isValid = false;
    } else {
        usuarioError.textContent = "";
    }

    // Validar contraseña
    if (contraseña.value.trim() === "") {
        contraseñaError.textContent = "El campo contraseña es obligatorio.";
        isValid = false;
    } else {
        contraseñaError.textContent = "";
    }

    // Enviar el formulario si es válido
    if (isValid) {
        this.submit();
    }
});
