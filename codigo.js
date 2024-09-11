
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
            showError(usernameInput, 'El nombre de usuario es obligatorio.');
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
        if (passwordInput.value.trim().length < 6) {
            showError(passwordInput, 'La contraseña debe tener al menos 6 caracteres.');
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
            showError(nameInput, 'El nombre es obligatorio.');
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
});
