
function navigateToPage() {
    let select = document.getElementById('Select');
    let url = select.value;
    if (url) {
        window.location.href = url;
    }
}


/*Muestras para Usuarios con Cuenta*/

// Define la variable account en el ámbito global y empieza como 
if(document.title==="Alquilá tu Cancha"){
let decide = prompt("Decide (true/false)");
let account;

// Verifica si la entrada del usuario es "true" (ignorando mayúsculas/minúsculas)
if (decide.trim().toLowerCase() === "true") {
    account = true;
}
// Verifica si la entrada del usuario es "false" (ignorando mayúsculas/minúsculas)
else if (decide.trim().toLowerCase() === "false") {
    account = false;
}
// Si la entrada no es ni "true" ni "false", muestra un mensaje de error
else {
    alert("Entrada inválida. Por favor, ingresa 'true' o 'false'.");
}


document.addEventListener("DOMContentLoaded", function () {
    updateMenu();
});

function updateMenu() {
    let withAccountElements = document.getElementsByClassName('with-acount');
    let withoutAccountElements = document.getElementsByClassName('without-acount');
    if (account === false) {
        for (let i = 0; i < withAccountElements.length; i++) {
            withAccountElements[i].classList.add('DisplayNone');
        }
        for (let i = 0; i < withoutAccountElements.length; i++) {
            withoutAccountElements[i].classList.remove('DisplayNone');
        }
    } else {
        for (let i = 0; i < withAccountElements.length; i++) {
            withAccountElements[i].classList.remove('DisplayNone');
        }
        for (let i = 0; i < withoutAccountElements.length; i++) {
            withoutAccountElements[i].classList.add('DisplayNone');
        }
    }
}

function cerrarSesion() {
    account = false;
    updateMenu(); // Actualiza el menú
    alert("Sesión Cerrada");
}

document.getElementById('Select').addEventListener('change', function () {
    if (this.value === 'cerrarSesion') {
        cerrarSesion();
    } else {
        // Manejar otras opciones, si es necesario
        navigateToPage(this.value);
    }
});

updateMenu(); // Actualiza el menú inicialmente
}   
function navigateToPage(url) {
    if (url === 'perfil') {
const modal = document.querySelector('.modal-perfil');
const closeModal = document.querySelector('.modal_close-perfil');
modal.classList.add('modal--show');

closeModal.addEventListener('click',(e)=>{
    e.preventDefault();
    modal.classList.remove('modal--show');
    // Restablece el valor del select al valor predeterminado
    const select = document.getElementById('Select');
    select.value = '';
});
    }else if (url === 'turnos'){
const modal = document.querySelector('.modal-turnos');
const closeModal = document.querySelector('.modal_close-turnos');
modal.classList.add('modal--show');

closeModal.addEventListener('click',(e)=>{
    e.preventDefault();
    modal.classList.remove('modal--show');
    // Restablece el valor del select al valor predeterminado
    const select = document.getElementById('Select');
    select.value = '';
});
    } else if (url === 'gestion') {
        window.location.href = 'gestion.html';
    }
}

function modificarPerfil(){
    const modalp = document.querySelector('.modal-perfil');
    const modal = document.querySelector('.modal-modificar');
const closeModal = document.querySelector('.modal_close-modificar');
modal.classList.add('modal--show');
modalp.classList.remove('modal--show');

closeModal.addEventListener('click',(e)=>{
    e.preventDefault();
    modal.classList.remove('modal--show');
    // Restablece el valor del select al valor predeterminado
    const select = document.getElementById('Select');
    select.value = '';
});
}

//Validacion de la caja de comentarios


const MAX_COMMENTS = 10; // Ajusta el límite de comentarios según sea necesario

function addComment() {
    const commentText = document.getElementById('commentText').value.trim();
    const errorMessage = document.getElementById('commentError'); // Obtiene el elemento del mensaje de error

    // Reinicia el mensaje de error
    errorMessage.style.display = 'none';
    errorMessage.innerText = '';

    if (commentText === '') {
        errorMessage.innerText = 'Por favor, escribe un comentario.'; // Establece el mensaje de error
        errorMessage.style.display = 'block'; // Muestra el mensaje de error
        return;
    }

    let comments = JSON.parse(localStorage.getItem('comments')) || [];

    if (comments.length >= MAX_COMMENTS) {
        comments.shift(); // Eliminar el comentario más antiguo si se alcanza el límite
    }

    const now = new Date();
    const newComment = {
        author: prompt("Ingrese su Nombre") || 'Anónimo',
        text: commentText,
        date: formatDate(now), // Formatear la fecha
        time: formatTime(now) // Formatear la hora
    };

    comments.unshift(newComment); // Agregar el comentario al principio del array
    localStorage.setItem('comments', JSON.stringify(comments));

    // Insertar el nuevo comentario al principio del contenedor
    const commentsContainer = document.getElementById('commentsContainer');
    commentsContainer.insertBefore(createCommentElement(newComment), commentsContainer.firstChild);
    document.getElementById('commentText').value = '';
}

function clearComments() {
    localStorage.removeItem('comments');
    document.getElementById('commentsContainer').innerHTML = '';
}

function createCommentElement(comment) {
    const commentDiv = document.createElement('div');
    commentDiv.innerHTML = `
        <div>
            <strong>${comment.author}</strong>: ${comment.text}
            <div style="font-size: small; color: gray;">${comment.date} ${comment.time}</div>
        </div>
    `;
    return commentDiv;
}

function formatDate(date) {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    return date.toLocaleDateString('es-ES', options);
}

function formatTime(date) {
    const options = { hour: 'numeric', minute: 'numeric' };
    return date.toLocaleTimeString('es-ES', options);
}

// Cargar comentarios al iniciar la página
window.onload = function() {
    const comments = JSON.parse(localStorage.getItem('comments')) || [];
    comments.forEach(comment => {
        document.getElementById('commentsContainer').appendChild(createCommentElement(comment));
    });
};







/*Ventana de Alquiler*/
// Función para manejar el alquiler
const today = new Date().toISOString().split('T')[0];
document.getElementById("fecha").setAttribute("value", today);
document.getElementById("fecha").setAttribute("min", today);

// Obtener la hora actual
const now = new Date();
let hours = now.getHours();
let minutes = now.getMinutes();

// Si los minutos son mayores a 0, siempre redondear al siguiente intervalo de 30 minutos
if (minutes > 0 && minutes <= 30) {
minutes = "30";
} else if (minutes > 30) {
minutes = "00";
hours += 1; // Aumentar la hora al siguiente si ya es más de 30 minutos
}

// Si la hora es menor de 10, agregar un 0 al inicio (para que sea 09:00 en lugar de 9:00)
hours = hours < 10 ? `0${hours}` : hours;

// Formatear la hora como "HH:MM"
const timeString = `${hours}:${minutes}`;

// Asignar la hora redondeada al campo de hora
document.getElementById("hora").setAttribute("value", timeString);



// Asignar la función a cada botón de horario con el horario correspondiente
const buttons = document.querySelectorAll('.menu_main-horarios-turnos button');
buttons.forEach(button => {
    button.addEventListener('click', () => {
        Alquiler(button.querySelector('span').innerText);
    });
});



        // Función para alternar la visibilidad de la contraseña
        function togglePasswordVisibility(input, icon) {
            const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
            input.setAttribute('type', type);

            if (type === 'text') {
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        }

        // Añadir eventos de clic a todos los botones de mostrar/ocultar contraseña
        document.querySelectorAll('.toggle-password').forEach(toggle => {
            toggle.addEventListener('click', function() {
                const input = this.previousElementSibling;
                const icon = this.firstElementChild;
                togglePasswordVisibility(input, icon);
            });
        });

//Validacion formulario registro
document.addEventListener('DOMContentLoaded', function () {
    const emailInput = document.getElementById('email');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const form = document.getElementById('register-form');

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function showError(element, message) {
        let errorElement = element.nextElementSibling;
        if (!errorElement || !errorElement.classList.contains('error')) {
            errorElement = document.createElement('div');
            errorElement.className = 'error';
            errorElement.style.color = 'red';
            element.insertAdjacentElement('afterend', errorElement);
        }
        errorElement.textContent = message;
    }

    function clearError(element) {
        let errorElement = element.nextElementSibling;
        if (errorElement && errorElement.classList.contains('error')) {
            errorElement.remove();
        }
    }

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevenir el envío del formulario y la recarga de la página
        let isValid = true;

        // Validación de email
        if (!validateEmail(emailInput.value)) {
            showError(emailInput, 'Por favor ingrese un email válido.');
            isValid = false;
        } else {
            clearError(emailInput);
        }

        // Validación de nombre de usuario
        if (usernameInput.value.trim() === '') {
            showError(usernameInput, 'El nombre y apellido son obligatorios.');
            isValid = false;
        } else {
            clearError(usernameInput);
        }

        // Validación de la contraseña
        if (passwordInput.value.trim() === '') {
            showError(passwordInput, 'La contraseña es obligatoria.');
            isValid = false;
        } else {
            clearError(passwordInput);
        }

        // Validación de confirmación de contraseña
        if (passwordInput.value !== confirmPasswordInput.value) {
            showError(confirmPasswordInput, 'Las contraseñas no coinciden.');
            isValid = false;
        } else {
            clearError(confirmPasswordInput);
        }

        if (isValid) {
            alert('Formulario enviado exitosamente!');
        }
    });
});


//Validacion del login
document.addEventListener('DOMContentLoaded', function () {
    const emailInput = document.getElementById('usuario');
    const passwordInput = document.getElementById('pass');
    const form = document.querySelector('form');

    // Función para validar el email
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Mostrar error debajo del campo
    function showError(element, message) {
        let errorElement = element.nextElementSibling;
        if (!errorElement || !errorElement.classList.contains('error')) {
            errorElement = document.createElement('div');
            errorElement.className = 'error';
            errorElement.style.color = 'red';
            element.insertAdjacentElement('afterend', errorElement);
        }
        errorElement.textContent = message;
    }

    // Limpiar mensaje de error
    function clearError(element) {
        let errorElement = element.nextElementSibling;
        if (errorElement && errorElement.classList.contains('error')) {
            errorElement.remove();
        }
    }

    // Manejo del envío del formulario
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevenir el envío del formulario hasta que se validen los datos
        let isValid = true;

        // Validación de email
        if (!validateEmail(emailInput.value)) {
            showError(emailInput, 'Por favor ingrese un email válido.');
            isValid = false;
        } else {
            clearError(emailInput);
        }

        // Validación de la contraseña (mínimo 6 caracteres)
        if (passwordInput.value.trim().length < 8) {
            showError(passwordInput, 'La contraseña debe tener al menos 8 caracteres.');
            isValid = false;
        } else {
            clearError(passwordInput);
        }

        // Si todo es válido, se muestra el mensaje de éxito
        if (isValid) {
            alert('Formulario enviado exitosamente!');
            // Aquí podrías permitir el envío del formulario si fuera necesario:
            // form.submit();
        }
    });
});

//Validacion del formulario contacto
document.addEventListener('DOMContentLoaded', function () {
    const nameInput = document.getElementById('usuario');
    const emailInput = document.getElementById('email');
    const telInput = document.getElementById('tel');
    const deporteSelect = document.getElementById('deporte');
    const comentarioInput = document.querySelector('.contacto_txt');
    const form = document.querySelector('form');

    // Función para validar el email
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Función para validar el teléfono (solo números y longitud mínima de 7 dígitos)
    function validatePhone(tel) {
        const re = /^[0-9]{7,15}$/;
        return re.test(tel);
    }

    // Mostrar error debajo del campo
    function showError(element, message) {
        let errorElement = element.nextElementSibling;
        if (!errorElement || !errorElement.classList.contains('error')) {
            errorElement = document.createElement('div');
            errorElement.className = 'error';
            errorElement.style.color = 'red';
            element.insertAdjacentElement('afterend', errorElement);
        }
        errorElement.textContent = message;
    }

    // Limpiar mensaje de error
    function clearError(element) {
        let errorElement = element.nextElementSibling;
        if (errorElement && errorElement.classList.contains('error')) {
            errorElement.remove();
        }
    }

    // Manejar el evento de envío del formulario
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevenir el envío del formulario hasta que se validen los datos
        let isValid = true;

        // Validación del nombre
        if (nameInput.value.trim() === '') {
            showError(nameInput, 'El email es obligatorio.');
            isValid = false;
        } else {
            clearError(nameInput);
        }

        // Validación de email
        if (!validateEmail(emailInput.value)) {
            showError(emailInput, 'Por favor ingrese un email válido.');
            isValid = false;
        } else {
            clearError(emailInput);
        }

        // Validación del teléfono
        if (!validatePhone(telInput.value)) {
            showError(telInput, 'Por favor ingrese un teléfono válido');
            isValid = false;
        } else {
            clearError(telInput);
        }

        // Validación del deporte
        if (deporteSelect.value === '') {
            showError(deporteSelect, 'Debe seleccionar un deporte.');
            isValid = false;
        } else {
            clearError(deporteSelect);
        }

        // Validación del comentario
        if (comentarioInput.value.trim() === '') {
            showError(comentarioInput, 'El comentario es obligatorio.');
            isValid = false;
        } else {
            clearError(comentarioInput);
        }

        // Si todo es válido, se muestra el mensaje de éxito
        if (isValid) {
            alert('Formulario enviado exitosamente!');
            // Aquí podrías permitir el envío del formulario si fuera necesario:
            // form.submit();
        }
    });


     //Validacion formulario de reserva

     document.getElementById("submitButton").addEventListener("click", function (event) {
        event.preventDefault(); // Evita el envío del formulario para la validación
    
        let cancha = document.getElementById("cancha").value;
        let fecha = document.getElementById("fecha").value;
        let hora = document.getElementById("hora").value;
        let nombre = document.getElementById("nombre1").value.trim();
        let telefono = document.getElementById("telefono1").value.trim();
        let dni = document.getElementById("dni1").value.trim();
    
        // Borrar mensajes de error previos
        clearErrors();
    
        let isValid = true;
    
        // Validación de la selección de Cancha
        if (cancha === "") {
            showError("canchaError", "Por favor, selecciona una cancha.");
            isValid = false;
        }
    
        // Validación de la fecha (no puede ser una fecha pasada)
        let hoy = new Date().toISOString().split('T')[0]; // Obtener la fecha actual en formato YYYY-MM-DD
        if (fecha < hoy) {
            showError("fechaError", "La fecha seleccionada no puede ser anterior a hoy.");
            isValid = false;
        }
    
        // Validación de la hora (opcional: rango de horas, por ejemplo, 8am a 10pm)
        let horaRegex = /^([01]\d|2[0-3]):([0-5]\d)$/; // Formato HH:MM de 24 horas
        if (!horaRegex.test(hora)) {
            showError("horaError", "Por favor, ingrese una hora válida.");
            isValid = false;
        }
    
        // Validación de Nombre y Apellido (que no esté vacío)
        if (nombre === "") {
            showError("nombreError", "Por favor, ingrese su Nombre y Apellido.");
            isValid = false;
        }
    
        // Validación de Teléfono (números de 7 a 15 dígitos)
        let telefonoRegex = /^[0-9]{7,15}$/;
        if (!telefonoRegex.test(telefono)) {
            showError("telefonoError", "Por favor, ingrese un número de teléfono válido (7-15 dígitos).");
            isValid = false;
        }
    
        // Validación de DNI (solo números, con 7 u 8 dígitos)
        let dniRegex = /^[0-9]{7,8}$/;
        if (!dniRegex.test(dni)) {
            showError("dniError", "Por favor, ingrese un DNI válido (7 u 8 dígitos).");
            isValid = false;
        }
    
        // Si todas las validaciones son correctas, se envía el formulario
        if (isValid) {
            document.getElementById("reservaForm").submit();
        }
    });
    
    function showError(id, message) {
        let errorElement = document.getElementById(id);
        errorElement.style.display = "block";
        errorElement.textContent = message;
    }
    
    function clearErrors() {
        let errors = document.querySelectorAll(".error");
        errors.forEach(function(error) {
            error.style.display = "none";
            error.textContent = "";
        });
    }
    //Generar horas cada 30 min
    var selectHora = document.getElementById("hora");
    var inicio = new Date();
    inicio.setHours(0, 0, 0, 0); // Inicia desde la medianoche

    for (var i = 0; i < 48; i++) { // Generar 48 opciones para cubrir un rango de 24 horas
        var hora = new Date(inicio.getTime() + i * 30 * 60 * 1000);
        var horaStr = hora.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        // Verificar si la hora está entre las 02:00 y las 08:00 y omitirla si es así
        var horaActual = hora.getHours();
        if (horaActual >= 2 && horaActual < 8) {
            continue; // Saltar esta iteración del bucle
        }

        var option = document.createElement("option");
        option.text = horaStr;
        option.value = horaStr;
        selectHora.add(option);
    }
    
}); 
