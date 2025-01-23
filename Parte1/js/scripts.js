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
    image.addEventListener('click', function () {
        modalImage.src = this.src; // Cambia la imagen en el modal a la imagen clickeada
    });
});

// Función para cambiar dinámicamente las imágenes del carrusel
const changeImagesBtn = document.getElementById('changeImagesBtn');
const carouselItems = document.querySelectorAll('.carousel-inner .carousel-item img');

changeImagesBtn.addEventListener('click', function () {
    console.log('Cambiando imágenes...');
    // Nuevas fuentes de imagen (puedes usar URLs diferentes o cambiar las que tienes)
    const newImages = [
        './media/imagen1.png',
        './media/imagen2.png',
        './media/imagen3.png'
    ];

    // Cambiar las imágenes del carrusel
    carouselItems.forEach((item, index) => {
        console.log('Cambiando imagen', index);
        if (newImages[index]) {
            console.log('Nueva imagen:', newImages[index]);
            item.src = newImages[index]; // Actualiza la fuente de la imagen
        }
    });
});

