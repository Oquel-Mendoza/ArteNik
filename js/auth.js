// Función para mostrar notificaciones sin alert()
function showNotification(message, type = "error") {
    const oldNotif = document.querySelector(".auth-notification");
    if (oldNotif) oldNotif.remove();

    const notif = document.createElement("div");
    notif.className = `auth-notification ${type}`;
    notif.innerHTML = `
        <i class="fa-solid ${type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notif);
    
    setTimeout(() => notif.classList.add("show"), 10);
    
    setTimeout(() => {
        notif.classList.remove("show");
        setTimeout(() => notif.remove(), 400);
    }, 3500);
}

// =========================================================
// CREAR CUENTA PREDETERMINADA AUTOMÁTICA
// =========================================================
let currentUsers = JSON.parse(localStorage.getItem("artenik_users")) || [];

// Revisa si ya existe la cuenta de prueba
const hasDefaultUser = currentUsers.find(user => user.email === "admin@artenik.com");

if (!hasDefaultUser) {
    currentUsers.push({
        nombre: "Usuario Admin",
        email: "admin@artenik.com",
        password: "1234"
    });
    localStorage.setItem("artenik_users", JSON.stringify(currentUsers));
}


/* =========================================================
   ARTENIK - AUTENTICACIÓN
========================================================= */

// Seleccionar los formularios y botones
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const showRegisterBtn = document.getElementById("showRegister");
const showLoginBtn = document.getElementById("showLogin");

// Mostrar formulario de Registro
showRegisterBtn.addEventListener("click", (e) => {
    e.preventDefault(); // Evita que la página se recargue
    loginForm.style.display = "none";
    registerForm.style.display = "block";
});

// Mostrar formulario de Inicio de Sesión
showLoginBtn.addEventListener("click", (e) => {
    e.preventDefault(); // Evita que la página se recargue
    registerForm.style.display = "none";
    loginForm.style.display = "block";
});

// =========================================================
// REGISTRO DE USUARIOS (Local Storage)
// =========================================================

registerForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Evita que se recargue la página al enviar el formulario

    // 1. Obtener los valores que escribió el usuario
    const name = document.getElementById("registerName").value;
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;

    // 2. Traer la lista de usuarios guardados (o crear una vacía si es la primera vez)
    const users = JSON.parse(localStorage.getItem("artenik_users")) || [];

    // 3. Verificar si el correo ya está registrado
    const userExists = users.find(user => user.email === email);

    if (userExists) {
        showNotification("Ese correo electrónico ya está registrado. Intenta con otro.", "error");
        return; // Detiene la ejecución aquí
    }

    // 4. Crear el nuevo usuario y meterlo a la lista
    const newUser = {
        nombre: name,
        email: email,
        password: password // En un proyecto real esto iría encriptado, pero para frontend local está bien así
    };
    
    users.push(newUser);

    // 5. Guardar la lista actualizada de nuevo en localStorage
    localStorage.setItem("artenik_users", JSON.stringify(users));

    showNotification("¡Cuenta creada exitosamente! Por favor, inicia sesión.", "success");

    // 6. Limpiar el formulario y mostrar la pantalla de Login
    registerForm.reset();
    registerForm.style.display = "none";
    loginForm.style.display = "block";
});

// =========================================================
// INICIO DE SESIÓN (Local Storage)
// =========================================================

loginForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Evita que se recargue la página

    // 1. Obtener los datos escritos
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    // 2. Traer la lista de usuarios guardados
    const users = JSON.parse(localStorage.getItem("artenik_users")) || [];

    // 3. Buscar si existe un usuario con ese correo Y esa contraseña
    const validUser = users.find(user => user.email === email && user.password === password);

    if (validUser) {
        // 4. Guardar quién es el usuario activo (para mostrar su nombre luego si quieres)
        localStorage.setItem("artenik_active_user", JSON.stringify(validUser));
        
        showNotification("¡Bienvenido a ArteNik, " + validUser.nombre + "!", "success");
        
        // 5. Redirigir al catálogo principal
        window.location.href = "index.html";
    } else {
        // 6. Mensaje de error si fallan las credenciales
        showNotification("Correo o contraseña incorrectos. Por favor, verifica tus datos.", "error");
    }
});