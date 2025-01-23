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
