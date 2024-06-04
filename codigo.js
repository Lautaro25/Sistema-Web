
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

document.getElementById('sesionCerrada').addEventListener('click', function () {
    cerrarSesion();
});


function cerrarSesion() {
    alert("holaaaaaaa")
}