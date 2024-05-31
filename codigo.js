
function navigateToPage() {
    let select = document.getElementById('Select');
    let url = select.value;
    if (url) {
        window.location.href = url;
    }
}


// scripts.js
document.addEventListener('DOMContentLoaded', (event) => {
    const dateInput = document.getElementById('date-input');
    const today = new Date().toISOString().split('T')[0];
    dateInput.value = today;
});
