// Esperar a que el DOM esté cargado
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");
    const clearButton = document.getElementById("clearForm");
    const toastElement = document.getElementById("toastNotification");
    const toast = new bootstrap.Toast(toastElement);

    // Validaciones adicionales
    function validateForm() {
        let isValid = true;

        // Validar que el nombre no contenga números ni caracteres especiales
        const nameInput = document.getElementById("name");
        const nameError = document.getElementById("nameError");
        const nameRegex = /^[a-zA-Z\s]+$/;
        if (!nameRegex.test(nameInput.value)) {
            nameError.textContent = "El nombre solo puede contener letras y espacios.";
            nameError.classList.remove("d-none");
            isValid = false;
        } else {
            nameError.classList.add("d-none");
        }

        // Validar rango de fechas (fecha de nacimiento)
        const dobInput = document.getElementById("dob");
        const dobError = document.getElementById("dobError");
        const minDate = new Date("1900-01-01");
        const maxDate = new Date();
        const dob = new Date(dobInput.value);
        if (dob < minDate || dob > maxDate || isNaN(dob)) {
            dobError.textContent = "La fecha debe estar entre 1900-01-01 y hoy.";
            dobError.classList.remove("d-none");
            isValid = false;
        } else {
            dobError.classList.add("d-none");
        }

        // Verificar que al menos un checkbox esté seleccionado
        const checkbox = document.getElementById("subscribe");
        const checkboxError = document.getElementById("checkboxError");
        if (!checkbox.checked) {
            checkboxError.textContent = "Debe aceptar los términos y condiciones.";
            checkboxError.classList.remove("d-none");
            isValid = false;
        } else {
            checkboxError.classList.add("d-none");
        }

        // Validar número de teléfono (que tenga al menos 9 dígitos)
        const phoneInput = document.getElementById("phone");
        const phoneError = document.getElementById("phoneError");
        const phoneRegex = /^[0-9]{9,}$/;  // Asegurarse de que el teléfono tenga al menos 9 dígitos
        if (!phoneRegex.test(phoneInput.value)) {
            phoneError.textContent = "El teléfono debe contener al menos 9 dígitos.";
            phoneError.classList.remove("d-none");
            isValid = false;
        } else {
            phoneError.classList.add("d-none");
        }

        return isValid;
    }


    // Mostrar Toast con un mensaje específico
    function showToast(message) {
        const toastBody = toastElement.querySelector(".toast-body");
        toastBody.textContent = message;
        toast.show();
    }

    // Manejar el botón "Limpiar"
    clearButton.addEventListener("click", function () {
        form.reset();
        showToast("Todos los campos se han borrado correctamente.");
    });

    // Manejar el envío del formulario
    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Evitar el envío real del formulario

        if (validateForm()) {
            showToast("Formulario enviado correctamente.");
            setTimeout(() => {
                form.reset(); // Restablecer el formulario tras 4 segundos
            }, 4000);
        } else {
            showToast("Por favor, corrija los errores antes de enviar.");
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const themeToggleButton = document.getElementById("themeToggle");
    const body = document.body;

    // Función para cambiar entre modos
    function toggleTheme() {
        if (body.classList.contains("dark-mode")) {
            body.classList.remove("dark-mode");
            themeToggleButton.textContent = "Modo Oscuro";
            themeToggleButton.classList.replace("btn-outline-light", "btn-outline-dark");
            localStorage.setItem("theme", "light");
        } else {
            body.classList.add("dark-mode");
            themeToggleButton.textContent = "Modo Claro";
            themeToggleButton.classList.replace("btn-outline-dark", "btn-outline-light");
            localStorage.setItem("theme", "dark");
        }
    }

    // Cargar el tema desde localStorage
    if (localStorage.getItem("theme") === "dark") {
        body.classList.add("dark-mode");
        themeToggleButton.textContent = "Modo Claro";
        themeToggleButton.classList.replace("btn-outline-dark", "btn-outline-light");
    }

    // Evento al hacer clic en el botón
    themeToggleButton.addEventListener("click", toggleTheme);
});

function updateClock() {
    const clock = document.getElementById("clock");
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    clock.textContent = `${hours}:${minutes}`;
}

// Inicia el reloj y actualízalo cada segundo
setInterval(updateClock, 1000);
updateClock(); // Llamada inicial

// Función para cambiar la imagen del modal cuando se hace clic en una imagen del carrusel
const carouselImages = document.querySelectorAll('.carousel-item img');
const modalImage = document.getElementById('modalImage');

carouselImages.forEach(image => {
    console.log(image);
    image.addEventListener('click', function () {
        console.log(this.src);
        modalImage.src = this.src; // Cambia la imagen en el modal a la imagen clickeada
    });
});

// Definir imágenes para el carrusel y el modal
const newImages = [
    './media/imagen1.png',
    './media/imagen2.png',
    './media/imagen3.png'
];
let currentImageIndex = 0; // Índice de la imagen actual

// Función para actualizar la imagen en el modal
function updateModalImage(index) {
    console.log("Index: " + index);
    const modalImage = document.getElementById('modalImage');
    modalImage.src = newImages[index];
}

carouselImages.forEach((image, index) => {
    image.addEventListener('click', function () {
        currentImageIndex = index; // Establecer la imagen actual
        updateModalImage(currentImageIndex); // Actualizar la imagen del modal
    });
});

// Evento para el botón de cambiar imágenes en el modal
const changeImagesBtn = document.getElementById('changeImagesBtn');

changeImagesBtn.addEventListener('click', function () {
    console.log("Cambiando imagen...");
    currentImageIndex = (currentImageIndex + 1) % newImages.length; // Pasar a la siguiente imagen (cíclico)
    updateModalImage(currentImageIndex); // Actualizar la imagen del modal
});

// Campo de búsqueda y tabla
const searchInput = document.getElementById("searchInput");
const tableRows = document.querySelectorAll(".table tbody tr");

// Función de búsqueda dinámica
searchInput.addEventListener("input", function () {
    const query = searchInput.value.toLowerCase();
    let found = false;

    // Iterar sobre las filas de la tabla
    tableRows.forEach((row) => {
        const cells = row.querySelectorAll("td");
        const rowText = Array.from(cells).map(cell => cell.textContent.toLowerCase()).join(" ");
        
        // Buscar coincidencia
        if (rowText.includes(query)) {
            found = true;
            row.style.display = ""; // Mostrar fila
            row.style.backgroundColor = "#fffa90"; // Resaltar fila
            setTimeout(() => {
                row.style.backgroundColor = ""; // Quitar el resaltado después de 2 segundos
            }, 2000);

            // Hacer scroll hasta la fila
            row.scrollIntoView({ behavior: "smooth", block: "center" });
        } else {
            row.style.display = "none"; // Ocultar filas sin coincidencia
        }
    });

    // Si no se encuentra nada
    if (!found && query !== "") {
        console.log("No se encontraron coincidencias.");
    }

    // Mostrar todas las filas si el campo está vacío
    if (query === "") {
        tableRows.forEach(row => (row.style.display = ""));
    }
});

document.getElementById("clearForm").addEventListener("click", function () {
    let form = document.getElementById("contactForm");
    form.reset(); // Resetea el formulario

    // Oculta todos los mensajes de error
    let errorMessages = document.querySelectorAll(".text-danger");
    errorMessages.forEach(function (error) {
        error.classList.add("d-none");
    });
});

