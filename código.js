var select = document.getElementById('deporte');

// Agregar un evento change al select
select.addEventListener('change', function () {
    // Obtener el valor seleccionado
    var opcionSeleccionada = select.value;
    // Mostrar la opción seleccionada en la consola
    console.log('Opción seleccionada:', opcionSeleccionada);
});



