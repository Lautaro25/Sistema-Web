
function navigateToPage() {
    let select = document.getElementById('Select');
    let url = select.value;
    if (url) {
        window.location.href = url;
    }
}


/*Día*/
// scripts.js
document.addEventListener('DOMContentLoaded', (event) => {
    const dateInput = document.getElementById('date-input');
    const today = new Date().toISOString().split('T')[0];
    dateInput.value = today;
});

document.addEventListener('DOMContentLoaded', (event) => {
    const timeInput = document.getElementById('time-input');
    const now = new Time().toISOString().split('T')[0];
    dateInput.value = now;
});

/*Horaa*/

document.addEventListener('DOMContentLoaded', (event) => {
    const timeInput = document.getElementById('currentTime');

    // Obtener la hora actual
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = "00";

    // Formatear la hora en HH:MM
    const currentTime = `${hours}:${minutes}`;

    // Asignar el valor al campo de entrada
    timeInput.value = currentTime;
});


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



const MAX_COMMENTS = 15;

document.addEventListener('DOMContentLoaded', function () {
    loadComments();

    document.getElementById('commentForm').addEventListener('submit', function (event) {
        event.preventDefault(); // Evitar que el formulario se envíe por defecto
        addComment();
    });

    document.getElementById('clearCommentsButton').addEventListener('click', function () {
        clearComments();
    });
});

function loadComments() {
    const commentsContainer = document.getElementById('commentsContainer');
    const comments = JSON.parse(localStorage.getItem('comments')) || [];
    commentsContainer.innerHTML = '';

    // Iterar a través de los comentarios en orden inverso para que los más recientes aparezcan arriba
    for (let i = comments.length - 1; i >= 0; i--) {
        commentsContainer.insertBefore(createCommentElement(comments[i]), commentsContainer.firstChild);
    }
}

function addComment() {
    const commentText = document.getElementById('commentText').value.trim();
    if (commentText === '') {
        alert('Por favor, escribe un comentario.');
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
        avatar: 'https://via.placeholder.com/50',
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
    commentDiv.classList.add('menu_aside-comentarios-content');
    commentDiv.innerHTML = `
        <div>
            <div class="menu_aside-comentarios-author">${comment.author}</div>
            <div class="menu_aside-comentarios-text">${comment.text}</div>
            <div class="menu_aside-comentarios-date">${comment.date} ${comment.time}</div>
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


/*Ventana de Alquiler*/
// Función para manejar el alquiler
function Alquiler(horario) {
    const modal = document.querySelector('.modal-alquiler');
    const closeModalAlquiler = document.querySelector('.modal_close-alquiler');

    // Detectar el tamaño de la pantalla para seleccionar el select adecuado
    let selectCancha;
    if (window.innerWidth <= 1280) { // Asumiendo que 768px es el umbral para móviles
        selectCancha = document.getElementById('select-celular');
    } else {
        selectCancha = document.getElementById('select-pc');
    }

    // Obtener la cancha seleccionada
    const canchaSeleccionada = selectCancha.value;

    // Verificar si se ha seleccionado una cancha
    if (canchaSeleccionada === "empty") {
        alert("Debe seleccionar una Cancha");
    } else {
        // Mostrar el modal
        modal.classList.add('modal--show');

        // Obtener la fecha seleccionada
        const fechaInput = document.getElementById('date-input').value;

        // Formatear la fecha para mostrar solo el día y el mes
        const fecha = new Date(fechaInput);
        const dia = (fecha.getDate() + 1).toString().padStart(2, '0');
        const mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); // Los meses en JavaScript son de 0 a 11
        const fechaFormateada = `${dia}/${mes}`;

        // Actualizar contenido del modal
        document.getElementById("modal-horarios").innerText = horario; // Usar el horario del botón
        document.getElementById("modal-cancha").innerText = canchaSeleccionada; // Cancha seleccionada
        document.getElementById("modal-dias").innerText = fechaFormateada; // Fecha formateada

        // Cerrar modal al hacer clic en el botón de cerrar
        closeModalAlquiler.addEventListener('click', (e) => {
            e.preventDefault();
            modal.classList.remove('modal--show');
        });
    }
}


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
    // Obtener los elementos del formulario
    const emailInput = document.querySelector('input[type="email"]');
    const usernameInput = document.querySelector('input[type="text"]');
    const passwordInput = document.querySelector('input[type="password"]:nth-of-type(1)');
    const confirmPasswordInput = document.querySelector('input[type="password"]:nth-of-type(2)');
    const form = document.querySelector('form');

    // Función para validar el email
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Función para mostrar mensajes de error
    function showError(element, message) {
        const errorElement = document.createElement('div');
        errorElement.className = 'error';
        errorElement.style.color = 'white';
        errorElement.textContent = message;
        if (element.nextElementSibling) {
            element.nextElementSibling.remove();
        }
        element.insertAdjacentElement('afterend', errorElement);
    }

    // Función para eliminar mensajes de error
    function clearError(element) {
        if (element.nextElementSibling) {
            element.nextElementSibling.remove();
        }
    }

    // Validación al enviar el formulario
    form.addEventListener('submit', function (event) {
        let isValid = true;

        // Validar email
        if (!validateEmail(emailInput.value)) {
            showError(emailInput, 'Por favor ingrese un email válido.');
            isValid = false;
        } else {
            clearError(emailInput);
        }

        // Validar nombre de usuario
        if (usernameInput.value.trim() === '') {
            showError(usernameInput, 'El nombre de usuario es obligatorio.');
            isValid = false;
        } else {
            clearError(usernameInput);
        }

    // Validate confirmPassword
    if (confirmPassword === '') {
        document.getElementById('confirmPasswordError').innerText = 'Por favor confirma tu contraseña';
        isValid = false;
    } else if (confirmPassword !== password) {
        document.getElementById('confirmPasswordError').innerText = 'Las contraseñas no coinciden';
        isValid = false;
    }

    // If all fields are valid, submit the form
    if (isValid) {
        document.getElementById('registrationForm').submit();
    }
});

function isValidEmail(email) {
    // Basic email validation regex
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}})