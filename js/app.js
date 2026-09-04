
// =========================================================
// GUARDIÁN DE AUTENTICACIÓN
// =========================================================
const usuarioActivo = localStorage.getItem("artenik_active_user");

// Si no hay nadie logueado, lo expulsamos al login inmediatamente
if (!usuarioActivo) {
    window.location.href = "login.html";
}


/* =========================================================
   ARTENIK
   JAVASCRIPT PRINCIPAL
========================================================= */


// ================================================
// MENÚ MOBILE
// ================================================

const mobileMenuBtn = document.getElementById("mobileMenuBtn");

const mobileMenu = document.getElementById("mobileMenu");


mobileMenuBtn.addEventListener("click", () => {

    mobileMenu.classList.toggle("active");


    const icon = mobileMenuBtn.querySelector("i");


    if (mobileMenu.classList.contains("active")) {

        icon.classList.remove("fa-bars");

        icon.classList.add("fa-xmark");

    } else {

        icon.classList.remove("fa-xmark");

        icon.classList.add("fa-bars");

    }

});


// ================================================
// CERRAR MENÚ MOBILE AL SELECCIONAR
// ================================================

const mobileLinks = mobileMenu.querySelectorAll("a");


mobileLinks.forEach(link => {

    link.addEventListener("click", () => {

        mobileMenu.classList.remove("active");

        const icon = mobileMenuBtn.querySelector("i");

        icon.classList.remove("fa-xmark");

        icon.classList.add("fa-bars");

    });

});


// ================================================
// FAVORITOS
// ================================================

const favoriteButtons =
    document.querySelectorAll(".favorite-btn");


favoriteButtons.forEach(button => {

    button.addEventListener("click", () => {

        const icon = button.querySelector("i");


        if (icon.classList.contains("fa-regular")) {

            icon.classList.remove("fa-regular");

            icon.classList.add("fa-solid");

            button.style.color = "#c75b5b";

        } else {

            icon.classList.remove("fa-solid");

            icon.classList.add("fa-regular");

            button.style.color = "";

        }

    });

});


// ================================================
// CARRITO
// ================================================

let carrito = [];
let cartCount = 0;

const cartCounter =
    document.querySelector(".cart-count");

// ================================================
// BOTÓN CARRITO
// ================================================

const cartBtn =
    document.getElementById("cartBtn");

const cartModal =
    document.getElementById("cartModal");

const cartClose =
    document.getElementById("cartClose");

const cartOverlay =
    document.getElementById("cartOverlay");


// ABRIR CARRITO

cartBtn.addEventListener("click", () => {

    mostrarCarrito();

    cartModal.classList.add("active");

});


// CERRAR CON LA X

cartClose.addEventListener("click", () => {

    cartModal.classList.remove("active");

});


// CERRAR HACIENDO CLIC FUERA

cartOverlay.addEventListener("click", () => {

    cartModal.classList.remove("active");

});

// ================================================
// MOSTRAR PRODUCTOS DEL CARRITO
// ================================================

const cartItems =
    document.getElementById("cartItems");

const cartSubtotal =
    document.getElementById("cartSubtotal");

const cartTotal =
    document.getElementById("cartTotal");

// ==========================================
// MODAL DEL PEDIDO
// ==========================================

const checkoutBtn =
    document.getElementById("checkoutBtn");

const orderModal =
    document.getElementById("orderModal");

const orderClose =
    document.getElementById("orderClose");

const orderOverlay =
    document.getElementById("orderOverlay");

const orderBackBtn =
    document.getElementById("orderBackBtn");


checkoutBtn.addEventListener("click", () => {

    if (carrito.length === 0) {

        alert("Tu carrito está vacío.");

        return;
    }

    mostrarResumenPedido();

    cartModal.classList.remove("active");

    orderModal.classList.add("active");

});


orderClose.addEventListener("click", () => {

    orderModal.classList.remove("active");

});


orderOverlay.addEventListener("click", () => {

    orderModal.classList.remove("active");

});


orderBackBtn.addEventListener("click", () => {

    orderModal.classList.remove("active");

    cartModal.classList.add("active");

});

function actualizarContadorCarrito() {

    cartCount = carrito.reduce(
        (total, item) => total + item.cantidad,
        0
    );

    cartCounter.textContent = cartCount;

}

function mostrarCarrito() {

    if (!cartItems) return;

    cartItems.innerHTML = "";

    if (carrito.length === 0) {

        cartItems.innerHTML = `
            <div class="cart-empty">

                <i class="fa-solid fa-bag-shopping"></i>

                <h3>Tu carrito está vacío</h3>

                <p>
                    Explora nuestro catálogo
                    y descubre productos hechos
                    en Nicaragua.
                </p>

            </div>
        `;

        cartSubtotal.textContent = "C$0";
        cartTotal.textContent = "C$0";

        return;
    }


    let subtotal = 0;
    let precioEmprendedorActivo = false;

    const totalBase = carrito.reduce((total, item) => {
    return total + (item.producto.precioNormal * item.cantidad);
}, 0);

precioEmprendedorActivo = totalBase >= 3000;
    carrito.forEach((item, index) => {

        const producto = item.producto;
        const cantidad = item.cantidad;

     let precioAplicado = producto.precioNormal;

if (precioEmprendedorActivo) {
    precioAplicado = producto.precioEmprendedor;
} else if (cantidad >= 3) {
    precioAplicado = producto.precioVolumen;
}



const subtotalProducto =
    precioAplicado * cantidad;

        subtotal += subtotalProducto;


        const elemento = document.createElement("div");

        elemento.className = "cart-item";

        elemento.innerHTML = `

            <div class="cart-item-image">

                <i class="fa-solid fa-image"></i>

            </div>


            <div class="cart-item-info">

                <span class="cart-item-origin">
                    ${producto.departamento}
                </span>

                <h3>
                    ${producto.nombre}
                </h3>

               <strong>
    C$${precioAplicado} c/u
</strong>


                <div class="cart-quantity">

                    <button
                        class="quantity-btn decrease-btn"
                        data-index="${index}"
                    >
                        <i class="fa-solid fa-minus"></i>
                    </button>

                    <span>
                        ${cantidad}
                    </span>

                    <button
                        class="quantity-btn increase-btn"
                        data-index="${index}"
                    >
                        <i class="fa-solid fa-plus"></i>
                    </button>

                </div>


                <div class="cart-item-subtotal">
                    Subtotal: <strong>C$${subtotalProducto}</strong>
                </div>

            </div>


            <button
                class="cart-item-remove"
                data-index="${index}"
                aria-label="Eliminar producto"
            >

                <i class="fa-solid fa-trash"></i>

            </button>

        `;

        cartItems.appendChild(elemento);

    });


    cartSubtotal.textContent =
        `C$${subtotal}`;

    cartTotal.textContent =
        `C$${subtotal}`;



     // ==========================================
    // PROGRESO PRECIO EMPRENDEDOR
    // ==========================================

    const metaEmprendedor = 3000;

    const porcentaje =
        Math.min((subtotal / metaEmprendedor) * 100, 100);

    let progresoHTML = "";

    if (subtotal >= metaEmprendedor) {

        progresoHTML = `
            <div class="wholesale-progress">

                <div class="wholesale-progress-header">
                    <span>Precio para emprendedor</span>
                    <strong>¡Desbloqueado!</strong>
                </div>

                <div class="wholesale-progress-bar">

                    <div
                        class="wholesale-progress-fill"
                        style="width: ${porcentaje}%"
                    ></div>

                </div>

                <p class="wholesale-message wholesale-success">
                    🎉 ¡Felicidades! Has alcanzado el mínimo
                    de C$3,000 para obtener tu precio emprendedor.
                </p>

            </div>
        `;

    } else {

        const faltante =
            metaEmprendedor - subtotal;

        progresoHTML = `
            <div class="wholesale-progress">

                <div class="wholesale-progress-header">
                    <span>Precio para emprendedor</span>

                    <strong>
                        C$${subtotal} / C$${metaEmprendedor}
                    </strong>
                </div>

                <div class="wholesale-progress-bar">

                    <div
                        class="wholesale-progress-fill"
                        style="width: ${porcentaje}%"
                    ></div>

                </div>

                <p class="wholesale-message">
                    Te faltan
                    <strong>C$${faltante}</strong>
                    para desbloquear tu precio emprendedor.
                </p>

            </div>
        `;
    }

    cartItems.insertAdjacentHTML(
        "beforeend",
        progresoHTML
    );


    // ==========================================
    // AUMENTAR CANTIDAD
    // ==========================================

    const increaseButtons =
        document.querySelectorAll(".increase-btn");

    increaseButtons.forEach(button => {

        button.addEventListener("click", () => {

            const index =
                Number(button.dataset.index);

            carrito[index].cantidad++;

            actualizarContadorCarrito();

            mostrarCarrito();

        });

    });


    // ==========================================
    // DISMINUIR CANTIDAD
    // ==========================================

    const decreaseButtons =
        document.querySelectorAll(".decrease-btn");

    decreaseButtons.forEach(button => {

        button.addEventListener("click", () => {

            const index =
                Number(button.dataset.index);

            if (carrito[index].cantidad > 1) {

                carrito[index].cantidad--;

            } else {

                carrito.splice(index, 1);

            }

            actualizarContadorCarrito();

            mostrarCarrito();

        });

    });


   // ELIMINAR PRODUCTO
const removeButtons =
    document.querySelectorAll(".cart-item-remove");

removeButtons.forEach(button => {

    button.addEventListener("click", () => {

        const index =
            Number(button.dataset.index);

        carrito.splice(index, 1);

        actualizarContadorCarrito();

        mostrarCarrito();

    });

});
}


// ==========================================
// MOSTRAR RESUMEN DEL PEDIDO
// ==========================================

function mostrarResumenPedido() {

    const orderItems =
        document.getElementById("orderItems");

    const orderSubtotal =
        document.getElementById("orderSubtotal");

    const orderTotal =
        document.getElementById("orderTotal");


    if (!orderItems) return;


    orderItems.innerHTML = "";

    let subtotal = 0;


    const totalBase = carrito.reduce(
        (total, item) => {

            return total +
                (item.producto.precioNormal * item.cantidad);

        },
        0
    );


    const precioEmprendedorActivo =
        totalBase >= 3000;


    carrito.forEach(item => {

        const producto = item.producto;

        const cantidad = item.cantidad;


        let precioAplicado =
            producto.precioNormal;

        let etiquetaPrecio =
            "Precio normal";


        if (precioEmprendedorActivo) {

            precioAplicado =
                producto.precioEmprendedor;

            etiquetaPrecio =
                "⭐ Precio emprendedor";

        } else if (cantidad >= 3) {

            precioAplicado =
                producto.precioVolumen;

            etiquetaPrecio =
                "📦 Precio por volumen";

        }


        const subtotalProducto =
            precioAplicado * cantidad;


        subtotal += subtotalProducto;


        orderItems.insertAdjacentHTML(
            "beforeend",
            `
            <div class="order-item">

                <div class="order-item-info">

                    <h4>
                        ${producto.nombre}
                    </h4>

                    <span>
                        ${producto.departamento}
                    </span>

                    <span class="order-price-type">
    ${etiquetaPrecio}
</span>

                </div>


                <div class="order-item-price">

                    <span>
                        ${cantidad} x C$${precioAplicado}
                    </span>

                    <strong>
                        C$${subtotalProducto}
                    </strong>

                </div>

            </div>
            `
        );

    });


    orderSubtotal.textContent =
        `C$${subtotal}`;

    orderTotal.textContent =
        `C$${subtotal}`;

}   

// ================================================
// PERFIL Y SESIÓN ACTIVA (Desktop y Móvil)
// ================================================

const profileBtn = document.getElementById("profileBtn");
const profileDropdown = document.getElementById("profileDropdown");
const dropdownName = document.getElementById("dropdownName");
const dropdownEmail = document.getElementById("dropdownEmail");
const logoutBtn = document.getElementById("logoutBtn");

// Capturamos el nuevo botón del menú móvil
const mobileAuthLink = document.getElementById("mobileAuthLink");

if (profileBtn) {
    const activeUser = JSON.parse(localStorage.getItem("artenik_active_user"));
    const profileText = profileBtn.querySelector("span");

    if (activeUser) {
        // --- 1. LÓGICA DESKTOP ---
        profileText.textContent = activeUser.nombre.split(" ")[0];
        
        if(dropdownName && dropdownEmail) {
            dropdownName.textContent = activeUser.nombre;
            dropdownEmail.textContent = activeUser.email;
        }

        profileBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            profileDropdown.classList.toggle("active");
        });

        logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("artenik_active_user");
            window.location.href = "login.html"; 
        });

        document.addEventListener("click", (e) => {
            if (!profileDropdown.contains(e.target)) {
                profileDropdown.classList.remove("active");
            }
        });

        // --- 2. LÓGICA MÓVIL ---
        if (mobileAuthLink) {
            // Cambiamos el texto e ícono a Cerrar Sesión
            mobileAuthLink.innerHTML = '<i class="fa-solid fa-arrow-right-from-bracket"></i> Cerrar sesión';
            mobileAuthLink.style.color = "#c75b5b"; // Color rojo para indicar salida
            
            mobileAuthLink.addEventListener("click", (e) => {
                e.preventDefault();
                localStorage.removeItem("artenik_active_user");
                window.location.href = "login.html"; 
            });
        }

    } else {
        // Si no hay sesión (Lógica de respaldo)
        if(profileDropdown) profileDropdown.remove();
        
        profileBtn.addEventListener("click", () => {
            window.location.href = "login.html";
        });

        if (mobileAuthLink) {
            mobileAuthLink.addEventListener("click", (e) => {
                e.preventDefault();
                window.location.href = "login.html";
            });
        }
    }
}

// ==========================================
// BUSCADOR DE PRODUCTOS
// ==========================================

const searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", () => {

    const search = prompt("¿Qué producto estás buscando?");

    if (!search || search.trim() === "") {
        return;
    }

    const textoBusqueda = search
        .toLowerCase()
        .trim();

    const resultados = productos.filter(producto =>
        producto.nombre.toLowerCase().includes(textoBusqueda) ||
        producto.categoria.toLowerCase().includes(textoBusqueda) ||
        producto.departamento.toLowerCase().includes(textoBusqueda)
    );

    mostrarProductos(resultados);

    if (resultados.length === 0) {

        alert(
            `No encontramos productos relacionados con "${search}".`
        );

    } else {

        document
            .getElementById("catalogo")
            .scrollIntoView({
                behavior: "smooth"
            });

    }

});


// ================================================
// CONSOLA
// ================================================

console.log(
    "🇳🇮 ArteNik iniciado correctamente"
);

// ==========================================
// CATÁLOGO DE PRODUCTOS - ARTENIK
// ==========================================

const productos = [
    {
        id: 1,
        nombre: "Camisa tradicional",
        categoria: "Ropa típica",
        departamento: "Masaya",
        precioNormal: 300,
        precioVolumen: 280,
        precioEmprendedor: 200,
        ganancia: 80
    },

    {
        id: 2,
        nombre: "Hamaca artesanal",
        categoria: "Hogar",
        departamento: "Masaya",
        precioNormal: 550,
        precioVolumen: 500,
        precioEmprendedor: 400,
        ganancia: 150
    },

    {
        id: 3,
        nombre: "Bolso artesanal",
        categoria: "Accesorios",
        departamento: "León",
        precioNormal: 300,
        precioVolumen: 280,
        precioEmprendedor: 200,
        ganancia: 80
    },

    {
        id: 4,
        nombre: "Máscara del Güegüense",
        categoria: "Cultura",
        departamento: "Diriamba",
        precioNormal: 450,
        precioVolumen: 400,
        precioEmprendedor: 320,
        ganancia: 120
    }
];

console.log("Productos cargados:", productos);

// ==========================================
// MOSTRAR PRODUCTOS EN EL CATÁLOGO
// ==========================================

const productsGrid = document.getElementById("products-grid");

function mostrarProductos(listaProductos) {

    if (!productsGrid) return;
      productsGrid.innerHTML = "";

        const resultsCount = document.getElementById("results-count");

    if (resultsCount) {

        const cantidad = listaProductos.length;

        resultsCount.textContent =
            cantidad === 1
                ? "1 producto encontrado"
                : `${cantidad} productos encontrados`;
    }

    listaProductos.forEach(producto => {

        const tarjeta = document.createElement("article");

        tarjeta.className = "product-card";

        tarjeta.innerHTML = `
            <div class="product-image">
                <div class="product-placeholder">
                    <i class="fa-solid fa-image"></i>
                    <span>Imagen del producto</span>
                </div>

                <button class="favorite-btn" data-id="${producto.id}">
                    <i class="fa-regular fa-heart"></i>
                </button>
            </div>

            <div class="product-info">

                <span class="product-origin">
                    <i class="fa-solid fa-location-dot"></i>
                    ${producto.departamento}
                </span>

                <h3>${producto.nombre}</h3>

                <span class="product-category">
                    ${producto.categoria}
                </span>

               <div class="product-bottom">

            <div class="product-price">

            <span class="price-label">
            Precio
             </span>

            <strong>C$${producto.precioNormal}</strong>

              </div>

              <span class="profit">
              + C$${producto.ganancia}
                potencial
               </span>

             </div>

        <button class="add-cart-btn" data-id="${producto.id}">
         <i class="fa-solid fa-cart-plus"></i>
         Agregar
         </button>
            </div>
        `;

               productsGrid.appendChild(tarjeta);

        const addButton = tarjeta.querySelector(".add-cart-btn");

        addButton.addEventListener("click", () => {

            const productoId = Number(addButton.dataset.id);
         console.log("Producto seleccionado:", productoId);
            const producto = productos.find(
                producto => producto.id === productoId
            );

            if (!producto) return;

const productoExistente = carrito.find(
    item => item.producto.id === producto.id
);

if (productoExistente) {

    productoExistente.cantidad++;

} else {

    carrito.push({
        producto: producto,
        cantidad: 1
    });

}

cartCount = carrito.reduce(
    (total, item) => total + item.cantidad,
    0
);

cartCounter.textContent = cartCount;

            // Animación del contador
            cartCounter.style.transform = "scale(1.5)";
            setTimeout(() => {
                cartCounter.style.transform = "scale(1)";
            }, 200);

            // Cambiar temporalmente el botón
            const originalText = addButton.innerHTML;

            addButton.innerHTML =
                '<i class="fa-solid fa-check"></i> Agregado';

            addButton.style.background = "#27845c";
            addButton.style.color = "white";

            setTimeout(() => {

                addButton.innerHTML = originalText;
                addButton.style.background = "";
                addButton.style.color = "";

            }, 1200);

        });
         });
}


// Mostrar productos al cargar la página
mostrarProductos(productos);

// ==========================================
// FILTRO POR CATEGORÍA
// ==========================================

const categoryButtons = document.querySelectorAll(".category-card");

categoryButtons.forEach(button => {

    button.addEventListener("click", () => {

        const categoria = button.dataset.category;

        const resultados = productos.filter(producto =>
            producto.categoria === categoria
        );

        mostrarProductos(resultados);

        document
            .getElementById("catalogo")
            .scrollIntoView({
                behavior: "smooth"
            });

    });

});

// ==========================================
// FILTROS DEL CATÁLOGO
// ==========================================

const categoryFilter = document.getElementById("categoryFilter");
const departmentFilter = document.getElementById("departmentFilter");
const clearFilters = document.getElementById("clearFilters");

function aplicarFiltros() {

    const categoriaSeleccionada = categoryFilter.value;
    const departamentoSeleccionado = departmentFilter.value;

    const resultados = productos.filter(producto => {

        const coincideCategoria =
            categoriaSeleccionada === "todas" ||
            producto.categoria === categoriaSeleccionada;

        const coincideDepartamento =
            departamentoSeleccionado === "todos" ||
            producto.departamento === departamentoSeleccionado;

        return coincideCategoria && coincideDepartamento;
    });

    mostrarProductos(resultados);

    document
        .getElementById("catalogo")
        .scrollIntoView({
            behavior: "smooth"
        });
}


// Cuando cambia la categoría
categoryFilter.addEventListener("change", aplicarFiltros);


// Cuando cambia el departamento
departmentFilter.addEventListener("change", aplicarFiltros);


// Limpiar filtros
clearFilters.addEventListener("click", () => {

    categoryFilter.value = "todas";
    departmentFilter.value = "todos";

    mostrarProductos(productos);

});