// =========================================================
// GUARDIÁN DE AUTENTICACIÓN
// =========================================================

const usuarioActivo = localStorage.getItem("artenik_active_user");

if (!usuarioActivo) {
    window.location.href = "login.html";
}


// =========================================================
// ARTENIK
// JAVASCRIPT PRINCIPAL
// =========================================================


// =========================================================
// MENÚ MOBILE
// =========================================================

const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const mobileMenu = document.getElementById("mobileMenu");

if (mobileMenuBtn && mobileMenu) {

    mobileMenuBtn.addEventListener("click", () => {

        mobileMenu.classList.toggle("active");

        const icon = mobileMenuBtn.querySelector("i");

        if (!icon) return;

        if (mobileMenu.classList.contains("active")) {

            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");

        } else {

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        }

    });


    const mobileLinks = mobileMenu.querySelectorAll("a");

    mobileLinks.forEach(link => {

        link.addEventListener("click", () => {

            mobileMenu.classList.remove("active");

            const icon = mobileMenuBtn.querySelector("i");

            if (icon) {

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

            }

        });

    });

}


// =========================================================
// CARRITO
// =========================================================

let carrito = [];

let cartCount = 0;


// =========================================================
// ELEMENTOS DEL CARRITO
// =========================================================

const cartCounter =
    document.querySelector(".cart-count");

const cartBtn =
    document.getElementById("cartBtn");

const cartModal =
    document.getElementById("cartModal");

const cartClose =
    document.getElementById("cartClose");

const cartOverlay =
    document.getElementById("cartOverlay");

const cartItems =
    document.getElementById("cartItems");

const cartSubtotal =
    document.getElementById("cartSubtotal");

const cartTotal =
    document.getElementById("cartTotal");


// =========================================================
// CATÁLOGO DE PRODUCTOS
// =========================================================

const productos = [

    {
        id: 1,
        nombre: "Ropa típica de Boaco",
        categoria: "Ropa típica",
        departamento: "Boaco",
        precioNormal: 300,
        precioVolumen: 280,
        precioEmprendedor: 200,
        ganancia: 80,
        imagen: "assets/productos/ropa-tipica/boaco.jpg"
    },

    {
        id: 2,
        nombre: "Ropa típica de Diriamba",
        categoria: "Ropa típica",
        departamento: "Diriamba",
        precioNormal: 300,
        precioVolumen: 280,
        precioEmprendedor: 200,
        ganancia: 80,
        imagen: "assets/productos/ropa-tipica/diriamba.jpg"
    },

    {
        id: 3,
        nombre: "Ropa típica de El Viejo",
        categoria: "Ropa típica",
        departamento: "El Viejo",
        precioNormal: 300,
        precioVolumen: 280,
        precioEmprendedor: 200,
        ganancia: 80,
        imagen: "assets/productos/ropa-tipica/el viejo.jpg"
    },

    {
        id: 4,
        nombre: "Ropa típica de Estelí",
        categoria: "Ropa típica",
        departamento: "Estelí",
        precioNormal: 300,
        precioVolumen: 280,
        precioEmprendedor: 200,
        ganancia: 80,
        imagen: "assets/productos/ropa-tipica/esteli.jpg"
    },

    {
        id: 5,
        nombre: "Ropa típica de Jinotepe - Nagarote",
        categoria: "Ropa típica",
        departamento: "Jinotepe - Nagarote",
        precioNormal: 300,
        precioVolumen: 280,
        precioEmprendedor: 200,
        ganancia: 80,
        imagen: "assets/productos/ropa-tipica/jinotepe -nagarote.jpg"
    },

    {
        id: 6,
        nombre: "Ropa típica de Managua",
        categoria: "Ropa típica",
        departamento: "Managua",
        precioNormal: 300,
        precioVolumen: 280,
        precioEmprendedor: 200,
        ganancia: 80,
        imagen: "assets/productos/ropa-tipica/managua.jpg"
    },

    {
        id: 7,
        nombre: "Ropa típica de Nagarote",
        categoria: "Ropa típica",
        departamento: "Nagarote",
        precioNormal: 300,
        precioVolumen: 280,
        precioEmprendedor: 200,
        ganancia: 80,
        imagen: "assets/productos/ropa-tipica/nagarote.jpg"
    },

    {
        id: 8,
        nombre: "Ropa típica de Nandaime",
        categoria: "Ropa típica",
        departamento: "Nandaime",
        precioNormal: 300,
        precioVolumen: 280,
        precioEmprendedor: 200,
        ganancia: 80,
        imagen: "assets/productos/ropa-tipica/nandaime.jpg"
    },

    {
        id: 9,
        nombre: "Ropa típica de Nindirí",
        categoria: "Ropa típica",
        departamento: "Nindirí",
        precioNormal: 300,
        precioVolumen: 280,
        precioEmprendedor: 200,
        ganancia: 80,
        imagen: "assets/productos/ropa-tipica/nindiri.jpg"
    },

{
    id: 10,
    nombre: "Adorno artesanal",
    categoria: "Artesanías",
    departamento: "Boaco",
    precioNormal: 150,
    precioVolumen: 120,
    precioEmprendedor: 100,
    ganancia: 50,
    imagen: "assets/productos/artesanias/adorno.jpg"
},

{
    id: 11,
    nombre: "Barrito artesanal",
    categoria: "Artesanías",
    departamento: "Diriamba",
    precioNormal: 150,
    precioVolumen: 120,
    precioEmprendedor: 80,
    ganancia: 70,
    imagen: "assets/productos/artesanias/barrito.jpg"
},

{
    id: 12,
    nombre: "Decoración para el hogar",
    categoria: "Artesanías",
    departamento: "El viejo",
    precioNormal: 400,
    precioVolumen: 360,
    precioEmprendedor: 300,
    ganancia: 100,
    imagen: "assets/productos/artesanias/deco hogar.jpg"
},

{
    id: 13,
    nombre: "Florero artesanal",
    categoria: "Artesanías",
    departamento: "Masaya",
    precioNormal: 450,
    precioVolumen: 400,
    precioEmprendedor: 320,
    ganancia: 130,
    imagen: "assets/productos/artesanias/florero.jpg"
},

{
    id: 14,
    nombre: "Hamaca artesanal",
    categoria: "Artesanías",
    departamento: "Masaya",
    precioNormal: 550,
    precioVolumen: 500,
    precioEmprendedor: 400,
    ganancia: 150,
    imagen: "assets/productos/artesanias/hamaca.webp"
},

{
    id: 15,
    nombre: "Cuadro de sacuanjoche",
    categoria: "Artesanías",
    departamento: "Masaya",
    precioNormal: 300,
    precioVolumen: 250,
    precioEmprendedor: 150,
    ganancia: 50,
    imagen: "assets/productos/artesanias/sacuanj-cuadro.png"
},

{
    id: 16,
    nombre: "Tazas artesanales",
    categoria: "Artesanías",
    departamento: "Masaya",
    precioNormal: 300,
    precioVolumen: 270,
    precioEmprendedor: 220,
    ganancia: 80,
    imagen: "assets/productos/artesanias/tazas.jpg"
},

{
    id: 17,
    nombre: "Alcancía artesanal",
    categoria: "Accesorios",
    departamento: "Boaco",
    precioNormal: 250,
    precioVolumen: 220,
    precioEmprendedor: 180,
    ganancia: 70,
    imagen: "assets/productos/accesorios/alcancias.jpg"
},

{
    id: 18,
    nombre: "Accesorio de barro",
    categoria: "Accesorios",
    departamento: "Diriamba",
    precioNormal: 300,
    precioVolumen: 270,
    precioEmprendedor: 220,
    ganancia: 80,
    imagen: "assets/productos/accesorios/barro.jpg"
},

{
    id: 19,
    nombre: "Billetera artesanal",
    categoria: "Accesorios",
    departamento: "El Viejo",
    precioNormal: 350,
    precioVolumen: 320,
    precioEmprendedor: 260,
    ganancia: 90,
    imagen: "assets/productos/accesorios/billeteras.jpg"
},

{
    id: 20,
    nombre: "Bolso artesanal",
    categoria: "Accesorios",
    departamento: "Estelí",
    precioNormal: 450,
    precioVolumen: 400,
    precioEmprendedor: 320,
    ganancia: 130,
    imagen: "assets/productos/accesorios/bolsos.jpg"
},

{
    id: 21,
    nombre: "Pulseras artesanales",
    categoria: "Accesorios",
    departamento: "Jinotepe - Nagarote",
    precioNormal: 200,
    precioVolumen: 180,
    precioEmprendedor: 150,
    ganancia: 50,
    imagen: "assets/productos/accesorios/pulseras.jpg"
},

{
    id: 22,
    nombre: "Sandalias artesanales",
    categoria: "Accesorios",
    departamento: "Managua",
    precioNormal: 500,
    precioVolumen: 450,
    precioEmprendedor: 380,
    ganancia: 120,
    imagen: "assets/productos/accesorios/sandalias.jpg"
},

{
    id: 23,
    nombre: "Sombrero artesanal",
    categoria: "Accesorios",
    departamento: "Nagarote",
    precioNormal: 400,
    precioVolumen: 360,
    precioEmprendedor: 300,
    ganancia: 100,
    imagen: "assets/productos/accesorios/sombrero.jpg"
},

{
    id: 24,
    nombre: "Utensilios artesanales",
    categoria: "Accesorios",
    departamento: "Nandaime",
    precioNormal: 350,
    precioVolumen: 320,
    precioEmprendedor: 260,
    ganancia: 90,
    imagen: "assets/productos/accesorios/utensilios.jpg"
}


];

// =========================================================
// CALCULAR TOTAL BASE
// =========================================================
//
// El precio normal determina si se alcanzan los C$3,000.
// =========================================================

function calcularTotalBase() {

    return carrito.reduce((total, item) => {

        return total +
            (item.producto.precioNormal * item.cantidad);

    }, 0);

}


// =========================================================
// PRECIO EMPRENDEDOR ACTIVO
// =========================================================

function precioEmprendedorActivo() {

    return calcularTotalBase() >= 3000;

}


// =========================================================
// OBTENER PRECIO APLICADO
// =========================================================

function obtenerPrecioAplicado(producto, cantidad) {

    // =====================================================
    // PRECIO EMPRENDEDOR
    // =====================================================

    if (precioEmprendedorActivo()) {

        return {

            precio: producto.precioEmprendedor,

            etiqueta: "⭐ Precio emprendedor",

            tipo: "emprendedor"

        };

    }


    // =====================================================
    // PRECIO MAYORISTA
    // =====================================================

    if (cantidad >= 3) {

        return {

            precio: producto.precioVolumen,

            etiqueta: "📦 Precio mayorista",

            tipo: "mayorista"

        };

    }


    // =====================================================
    // PRECIO NORMAL
    // =====================================================

    return {

        precio: producto.precioNormal,

        etiqueta: "Precio normal",

        tipo: "normal"

    };

}


// =========================================================
// ACTUALIZAR CONTADOR
// =========================================================

function actualizarContadorCarrito() {

    cartCount = carrito.reduce(

        (total, item) => {

            return total + item.cantidad;

        },

        0

    );


    if (cartCounter) {

        cartCounter.textContent = cartCount;

    }

}


// =========================================================
// ABRIR CARRITO
// =========================================================

if (cartBtn && cartModal) {

    cartBtn.addEventListener("click", () => {

        mostrarCarrito();

        cartModal.classList.add("active");

    });

}


// =========================================================
// CERRAR CARRITO
// =========================================================

if (cartClose && cartModal) {

    cartClose.addEventListener("click", () => {

        cartModal.classList.remove("active");

    });

}


// =========================================================
// CERRAR CARRITO CON OVERLAY
// =========================================================

if (cartOverlay && cartModal) {

    cartOverlay.addEventListener("click", () => {

        cartModal.classList.remove("active");

    });

}


// =========================================================
// MOSTRAR CARRITO
// =========================================================

function mostrarCarrito() {

    if (!cartItems) return;


    cartItems.innerHTML = "";


    // =====================================================
    // CARRITO VACÍO
    // =====================================================

    if (carrito.length === 0) {

        cartItems.innerHTML = `

            <div class="cart-empty">

                <i class="fa-solid fa-bag-shopping"></i>

                <h3>
                    Tu carrito está vacío
                </h3>

                <p>
                    Explora nuestro catálogo y descubre
                    productos hechos en Nicaragua.
                </p>

            </div>

        `;


        if (cartSubtotal) {

            cartSubtotal.textContent = "C$0";

        }


        if (cartTotal) {

            cartTotal.textContent = "C$0";

        }


        return;

    }


    // =====================================================
    // TOTAL BASE
    // =====================================================

    const totalBase =
        calcularTotalBase();


    const emprendedorActivo =
        totalBase >= 3000;


    let subtotal = 0;


    // =====================================================
    // MOSTRAR PRODUCTOS
    // =====================================================

    carrito.forEach((item, index) => {

        const producto =
            item.producto;

        const cantidad =
            item.cantidad;


        const precioInfo =
            obtenerPrecioAplicado(
                producto,
                cantidad
            );


        const precioAplicado =
            precioInfo.precio;


        const subtotalProducto =
            precioAplicado * cantidad;


        subtotal += subtotalProducto;


        // =================================================
        // AHORRO
        // =================================================

        const precioNormalTotal =
            producto.precioNormal * cantidad;


        const ahorro =
            precioNormalTotal - subtotalProducto;


        // =================================================
        // ELEMENTO
        // =================================================

        const elemento =
            document.createElement("div");


        elemento.className =
            "cart-item";


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


                <span class="order-price-type">
                    ${precioInfo.etiqueta}
                </span>


                ${
                    ahorro > 0
                    ? `
                        <small class="cart-saving">
                            Ahorras C$${ahorro}
                        </small>
                    `
                    : ""
                }


                <div class="cart-quantity">

                    <button
                        class="quantity-btn decrease-btn"
                        data-index="${index}"
                        aria-label="Disminuir cantidad"
                    >

                        <i class="fa-solid fa-minus"></i>

                    </button>


                    <span>
                        ${cantidad}
                    </span>


                    <button
                        class="quantity-btn increase-btn"
                        data-index="${index}"
                        aria-label="Aumentar cantidad"
                    >

                        <i class="fa-solid fa-plus"></i>

                    </button>

                </div>


                <div class="cart-item-subtotal">

                    Subtotal:

                    <strong>
                        C$${subtotalProducto}
                    </strong>

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


    // =====================================================
    // TOTALES
    // =====================================================

    if (cartSubtotal) {

        cartSubtotal.textContent =
            `C$${subtotal}`;

    }


    if (cartTotal) {

        cartTotal.textContent =
            `C$${subtotal}`;

    }


    // =====================================================
    // PROGRESO EMPRENDEDOR
    // =====================================================

    const metaEmprendedor = 3000;


    const porcentaje =
        Math.min(
            (totalBase / metaEmprendedor) * 100,
            100
        );


    let progresoHTML = "";


    if (emprendedorActivo) {

        progresoHTML = `

            <div class="wholesale-progress">

                <div class="wholesale-progress-header">

                    <span>
                        Precio para emprendedor
                    </span>

                    <strong>
                        ¡Desbloqueado!
                    </strong>

                </div>


                <div class="wholesale-progress-bar">

                    <div
                        class="wholesale-progress-fill"
                        style="width: 100%"
                    ></div>

                </div>


                <p class="wholesale-message wholesale-success">

                    🎉 ¡Felicidades!

                    Has alcanzado el mínimo de

                    <strong>
                        C$3,000
                    </strong>

                    para obtener tu precio emprendedor.

                </p>

            </div>

        `;

    } else {

        const faltante =
            metaEmprendedor - totalBase;


        progresoHTML = `

            <div class="wholesale-progress">

                <div class="wholesale-progress-header">

                    <span>
                        Precio para emprendedor
                    </span>

                    <strong>
                        C$${totalBase} / C$${metaEmprendedor}
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

                    <strong>
                        C$${faltante}
                    </strong>

                    para desbloquear tu precio emprendedor.

                </p>

            </div>

        `;

    }


    cartItems.insertAdjacentHTML(
        "beforeend",
        progresoHTML
    );


    // =====================================================
    // AUMENTAR
    // =====================================================

    const increaseButtons =
        cartItems.querySelectorAll(
            ".increase-btn"
        );


    increaseButtons.forEach(button => {

        button.addEventListener("click", () => {

            const index =
                Number(button.dataset.index);


            if (!carrito[index]) return;


            carrito[index].cantidad++;


            actualizarContadorCarrito();

            mostrarCarrito();

        });

    });


    // =====================================================
    // DISMINUIR
    // =====================================================

    const decreaseButtons =
        cartItems.querySelectorAll(
            ".decrease-btn"
        );


    decreaseButtons.forEach(button => {

        button.addEventListener("click", () => {

            const index =
                Number(button.dataset.index);


            if (!carrito[index]) return;


            if (carrito[index].cantidad > 1) {

                carrito[index].cantidad--;

            } else {

                carrito.splice(index, 1);

            }


            actualizarContadorCarrito();

            mostrarCarrito();

        });

    });


    // =====================================================
    // ELIMINAR
    // =====================================================

    const removeButtons =
        cartItems.querySelectorAll(
            ".cart-item-remove"
        );


    removeButtons.forEach(button => {

        button.addEventListener("click", () => {

            const index =
                Number(button.dataset.index);


            if (!carrito[index]) return;


            carrito.splice(index, 1);


            actualizarContadorCarrito();

            mostrarCarrito();

        });

    });

}


// =========================================================
// MODAL DEL PEDIDO
// =========================================================

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

const confirmOrderBtn =
    document.getElementById("confirmOrderBtn");


// =========================================================
// CONTINUAR CON EL PEDIDO
// =========================================================

if (checkoutBtn) {

    checkoutBtn.addEventListener("click", () => {

        if (carrito.length === 0) {

            alert(
                "Tu carrito está vacío."
            );

            return;

        }


        mostrarResumenPedido();


        if (cartModal) {

            cartModal.classList.remove(
                "active"
            );

        }


        if (orderModal) {

            orderModal.classList.add(
                "active"
            );

        }

    });

}


// =========================================================
// CERRAR MODAL PEDIDO
// =========================================================

if (orderClose && orderModal) {

    orderClose.addEventListener("click", () => {

        orderModal.classList.remove(
            "active"
        );

    });

}


// =========================================================
// CERRAR CON OVERLAY
// =========================================================

if (orderOverlay && orderModal) {

    orderOverlay.addEventListener("click", () => {

        orderModal.classList.remove(
            "active"
        );

    });

}


// =========================================================
// VOLVER AL CARRITO
// =========================================================

if (orderBackBtn) {

    orderBackBtn.addEventListener("click", () => {

        if (orderModal) {

            orderModal.classList.remove(
                "active"
            );

        }


        if (cartModal) {

            cartModal.classList.add(
                "active"
            );

        }


        mostrarCarrito();

    });

}


// =========================================================
// MOSTRAR RESUMEN DEL PEDIDO
// =========================================================

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


    // =====================================================
    // PRODUCTOS
    // =====================================================

    carrito.forEach(item => {

        const producto =
            item.producto;

        const cantidad =
            item.cantidad;


        const precioInfo =
            obtenerPrecioAplicado(
                producto,
                cantidad
            );


        const precioAplicado =
            precioInfo.precio;


        const subtotalProducto =
            precioAplicado * cantidad;


        subtotal += subtotalProducto;


        const precioNormalTotal =
            producto.precioNormal * cantidad;


        const ahorro =
            precioNormalTotal - subtotalProducto;


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
                            ${precioInfo.etiqueta}
                        </span>


                        <div class="order-price-comparison">

                            <small>
                                Normal:
                                C$${producto.precioNormal}
                            </small>


                            <small>
                                Mayorista:
                                C$${producto.precioVolumen}
                            </small>


                            <small>
                                Emprendedor:
                                C$${producto.precioEmprendedor}
                            </small>

                        </div>


                        ${
                            ahorro > 0
                            ? `
                                <small class="cart-saving">

                                    Ahorras
                                    C$${ahorro}

                                </small>
                            `
                            : ""
                        }

                    </div>


                    <div class="order-item-price">

                        <span>

                            ${cantidad}
                            x
                            C$${precioAplicado}

                        </span>


                        <strong>

                            C$${subtotalProducto}

                        </strong>

                    </div>

                </div>

            `
        );

    });


    // =====================================================
    // SUBTOTAL
    // =====================================================

    if (orderSubtotal) {

        orderSubtotal.textContent =
            `C$${subtotal}`;

    }


    // =====================================================
    // ENVÍO
    // =====================================================

    const orderShipping =
        document.getElementById("orderShipping");


    if (orderShipping) {

        orderShipping.textContent =
            "Pendiente";

    }


    // =====================================================
    // TOTAL
    // =====================================================

    if (orderTotal) {

        orderTotal.textContent =
            `C$${subtotal}`;

    }

}


// =========================================================
// CONFIRMAR PEDIDO
// =========================================================

if (confirmOrderBtn) {

    confirmOrderBtn.addEventListener("click", () => {

        if (carrito.length === 0) {

            alert(
                "Tu carrito está vacío."
            );

            return;

        }


        const customerName =
            document.getElementById(
                "customerName"
            );


        const customerPhone =
            document.getElementById(
                "customerPhone"
            );


        const customerDepartment =
            document.getElementById(
                "customerDepartment"
            );


        const customerAddress =
            document.getElementById(
                "customerAddress"
            );


        // =================================================
        // VALIDAR DATOS
        // =================================================

        if (
            !customerName ||
            customerName.value.trim() === ""
        ) {

            alert(
                "Por favor escribe tu nombre completo."
            );

            customerName?.focus();

            return;

        }


        if (
            !customerPhone ||
            customerPhone.value.trim() === ""
        ) {

            alert(
                "Por favor escribe tu número de teléfono."
            );

            customerPhone?.focus();

            return;

        }


        if (
            !customerDepartment ||
            customerDepartment.value === ""
        ) {

            alert(
                "Por favor selecciona tu departamento."
            );

            customerDepartment?.focus();

            return;

        }


        if (
            !customerAddress ||
            customerAddress.value.trim() === ""
        ) {

            alert(
                "Por favor escribe tu dirección de entrega."
            );

            customerAddress?.focus();

            return;

        }


        // =================================================
        // TOTAL
        // =================================================

        let totalPedido = 0;


        carrito.forEach(item => {

            const precioInfo =
                obtenerPrecioAplicado(
                    item.producto,
                    item.cantidad
                );


            totalPedido +=
                precioInfo.precio *
                item.cantidad;

        });


        // =================================================
        // CONFIRMACIÓN
        // =================================================

        const confirmar =
            confirm(
                `¿Deseas confirmar tu pedido por C$${totalPedido}?`
            );


        if (!confirmar) {

            return;

        }


        // =================================================
        // PEDIDO
        // =================================================

        const pedido = {

            id:
                "ART-" +
                Date.now(),

            fecha:
                new Date().toISOString(),

            cliente: {

                nombre:
                    customerName.value.trim(),

                telefono:
                    customerPhone.value.trim(),

                departamento:
                    customerDepartment.value,

                direccion:
                    customerAddress.value.trim(),

                notas:
                    document.getElementById(
                        "orderNotes"
                    )?.value.trim() || ""

            },

            productos:
                carrito.map(item => {

                    const precioInfo =
                        obtenerPrecioAplicado(
                            item.producto,
                            item.cantidad
                        );


                    return {

                        id:
                            item.producto.id,

                        nombre:
                            item.producto.nombre,

                        cantidad:
                            item.cantidad,

                        precioUnitario:
                            precioInfo.precio,

                        tipoPrecio:
                            precioInfo.tipo,

                        subtotal:
                            precioInfo.precio *
                            item.cantidad

                    };

                }),

            total:
                totalPedido

        };


        // =================================================
        // GUARDAR PEDIDO
        // =================================================

        localStorage.setItem(
            "artenik_last_order",
            JSON.stringify(pedido)
        );


        // =================================================
        // MENSAJE
        // =================================================

        alert(
            `¡Pedido registrado correctamente!\n\nNúmero de pedido: ${pedido.id}\nTotal: C$${pedido.total}`
        );


        // =================================================
        // CERRAR MODAL
        // =================================================

        if (orderModal) {

            orderModal.classList.remove(
                "active"
            );

        }


        // =================================================
        // LIMPIAR CARRITO
        // =================================================

        carrito = [];

        actualizarContadorCarrito();

        mostrarCarrito();

    });

}


// =========================================================
// PERFIL Y SESIÓN
// =========================================================

const profileBtn =
    document.getElementById("profileBtn");

const profileDropdown =
    document.getElementById("profileDropdown");

const dropdownName =
    document.getElementById("dropdownName");

const dropdownEmail =
    document.getElementById("dropdownEmail");

const logoutBtn =
    document.getElementById("logoutBtn");

const mobileAuthLink =
    document.getElementById("mobileAuthLink");


let activeUser = null;


try {

    const storedUser =
        localStorage.getItem(
            "artenik_active_user"
        );


    if (storedUser) {

        activeUser =
            JSON.parse(storedUser);

    }

} catch (error) {

    console.error(
        "Error al leer el usuario activo:",
        error
    );

}


// =========================================================
// PERFIL
// =========================================================

if (profileBtn) {

    const profileText =
        profileBtn.querySelector("span");


    if (activeUser) {

        if (
            profileText &&
            activeUser.nombre
        ) {

            profileText.textContent =
                activeUser.nombre.split(" ")[0];

        }


        if (
            dropdownName &&
            activeUser.nombre
        ) {

            dropdownName.textContent =
                activeUser.nombre;

        }


        if (
            dropdownEmail &&
            activeUser.email
        ) {

            dropdownEmail.textContent =
                activeUser.email;

        }


        if (profileDropdown) {

            profileBtn.addEventListener(
                "click",
                event => {

                    event.stopPropagation();

                    profileDropdown.classList.toggle(
                        "active"
                    );

                }
            );

        }


        if (logoutBtn) {

            logoutBtn.addEventListener(
                "click",
                () => {

                    localStorage.removeItem(
                        "artenik_active_user"
                    );

                    window.location.href =
                        "login.html";

                }
            );

        }


        document.addEventListener(
            "click",
            event => {

                if (
                    profileDropdown &&
                    !profileDropdown.contains(
                        event.target
                    ) &&
                    !profileBtn.contains(
                        event.target
                    )
                ) {

                    profileDropdown.classList.remove(
                        "active"
                    );

                }

            }
        );


        if (mobileAuthLink) {

            mobileAuthLink.innerHTML =
                '<i class="fa-solid fa-arrow-right-from-bracket"></i> Cerrar sesión';

            mobileAuthLink.style.color =
                "#c75b5b";


            mobileAuthLink.addEventListener(
                "click",
                event => {

                    event.preventDefault();

                    localStorage.removeItem(
                        "artenik_active_user"
                    );

                    window.location.href =
                        "login.html";

                }
            );

        }

    } else {

        profileBtn.addEventListener(
            "click",
            () => {

                window.location.href =
                    "login.html";

            }
        );


        if (mobileAuthLink) {

            mobileAuthLink.addEventListener(
                "click",
                event => {

                    event.preventDefault();

                    window.location.href =
                        "login.html";

                }
            );

        }

    }

}


// =========================================================
// MOSTRAR PRODUCTOS
// =========================================================

const productsGrid =
    document.getElementById(
        "products-grid"
    );


function mostrarProductos(listaProductos) {

    if (!productsGrid) return;


    productsGrid.innerHTML = "";


    const resultsCount =
        document.getElementById(
            "results-count"
        );


    if (resultsCount) {

        resultsCount.textContent =
            listaProductos.length === 1
                ? "1 producto encontrado"
                : `${listaProductos.length} productos encontrados`;

    }


    // =====================================================
    // SIN RESULTADOS
    // =====================================================

    if (listaProductos.length === 0) {

        productsGrid.innerHTML = `

            <div class="catalog-empty">

                <i class="fa-solid fa-box-open"></i>

                <h3>
                    No encontramos productos
                </h3>

                <p>
                    Intenta cambiar los filtros
                    o buscar otra categoría.
                </p>

            </div>

        `;

        return;

    }


    // =====================================================
    // CREAR PRODUCTOS
    // =====================================================

    listaProductos.forEach(producto => {

        const tarjeta =
            document.createElement(
                "article"
            );


        tarjeta.className =
            "product-card";


        tarjeta.innerHTML = `

           <div class="product-image">
             <img
        class="product-img"
        src="${producto.imagen || 'assets/images/producto-default.png'}"
        alt="${producto.nombre}"
    >
    
                <button
                    class="favorite-btn"
                    data-id="${producto.id}"
                    aria-label="Agregar a favoritos"
                    type="button"
                >

                    <i class="fa-regular fa-heart"></i>

                </button>

            </div>


            <div class="product-info">

                <span class="product-origin">

                    <i class="fa-solid fa-location-dot"></i>

                    ${producto.departamento}

                </span>


                <h3>
                    ${producto.nombre}
                </h3>


                <span class="product-category">
                    ${producto.categoria}
                </span>


                <div class="product-bottom">

                    <div class="product-price">

                        <span class="price-label">
                            Precio normal
                        </span>

                        <strong>
                            C$${producto.precioNormal}
                        </strong>

                    </div>


                    <span class="profit">

                        + C$${producto.ganancia}
                        potencial

                    </span>

                </div>


                <div class="product-prices-mini">

                    <span>
                        Mayorista:
                        <strong>
                            C$${producto.precioVolumen}
                        </strong>
                    </span>


                    <span>
                        Emprendedor:
                        <strong>
                            C$${producto.precioEmprendedor}
                        </strong>
                    </span>

                </div>


                <button
                    class="add-cart-btn"
                    data-id="${producto.id}"
                    type="button"
                >

                    <i class="fa-solid fa-cart-plus"></i>

                    Agregar

                </button>

            </div>

        `;


        productsGrid.appendChild(
            tarjeta
        );


        // =================================================
        // FAVORITO
        // =================================================

        const favoriteButton =
            tarjeta.querySelector(
                ".favorite-btn"
            );


        if (favoriteButton) {

            favoriteButton.addEventListener(
                "click",
                () => {

                    const icon =
                        favoriteButton.querySelector(
                            "i"
                        );


                    if (!icon) return;


                    if (
                        icon.classList.contains(
                            "fa-regular"
                        )
                    ) {

                        icon.classList.remove(
                            "fa-regular"
                        );

                        icon.classList.add(
                            "fa-solid"
                        );

                        favoriteButton.style.color =
                            "#c75b5b";

                    } else {

                        icon.classList.remove(
                            "fa-solid"
                        );

                        icon.classList.add(
                            "fa-regular"
                        );

                        favoriteButton.style.color =
                            "";

                    }

                }
            );

        }


        // =================================================
        // AGREGAR AL CARRITO
        // =================================================

        const addButton =
            tarjeta.querySelector(
                ".add-cart-btn"
            );


        if (addButton) {

            addButton.addEventListener(
                "click",
                () => {

                    const productoId =
                        Number(
                            addButton.dataset.id
                        );


                    const productoEncontrado =
                        productos.find(
                            producto =>
                                producto.id ===
                                productoId
                        );


                    if (!productoEncontrado) return;


                    const productoExistente =
                        carrito.find(
                            item =>
                                item.producto.id ===
                                productoEncontrado.id
                        );


                    if (productoExistente) {

                        productoExistente.cantidad++;

                    } else {

                        carrito.push({

                            producto:
                                productoEncontrado,

                            cantidad:
                                1

                        });

                    }


                    actualizarContadorCarrito();


                    // -------------------------------------
                    // ANIMACIÓN DEL CONTADOR
                    // -------------------------------------

                    if (cartCounter) {

                        cartCounter.style.transform =
                            "scale(1.5)";


                        setTimeout(() => {

                            cartCounter.style.transform =
                                "scale(1)";

                        }, 200);

                    }


                    // -------------------------------------
                    // CAMBIAR BOTÓN
                    // -------------------------------------

                    const originalText =
                        addButton.innerHTML;


                    addButton.innerHTML =
                        '<i class="fa-solid fa-check"></i> Agregado';


                    addButton.style.background =
                        "#27845c";


                    addButton.style.color =
                        "white";


                    setTimeout(() => {

                        addButton.innerHTML =
                            originalText;

                        addButton.style.background =
                            "";

                        addButton.style.color =
                            "";

                    }, 1200);

                }
            );

        }

    });

}


// =========================================================
// MOSTRAR PRODUCTOS INICIALES
// =========================================================

mostrarProductos(productos);


// =========================================================
// CATEGORÍAS
// =========================================================

const categoryButtons =
    document.querySelectorAll(
        ".category-card"
    );


categoryButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            const categoria =
                button.dataset.category;


            const resultados =
                productos.filter(
                    producto =>
                        producto.categoria ===
                        categoria
                );


            // =================================================
            // ACTUALIZAR SELECT
            // =================================================

            const categoryFilter =
                document.getElementById(
                    "categoryFilter"
                );


            const departmentFilter =
                document.getElementById(
                    "departmentFilter"
                );


            if (categoryFilter) {

                categoryFilter.value =
                    categoria;

            }


            if (departmentFilter) {

                departmentFilter.value =
                    "todos";

            }


            mostrarProductos(
                resultados
            );


            const catalogo =
                document.getElementById(
                    "catalogo"
                );


            if (catalogo) {

                catalogo.scrollIntoView({
                    behavior: "smooth"
                });

            }

        }
    );

});


// =========================================================
// FILTROS
// =========================================================

const categoryFilter =
    document.getElementById(
        "categoryFilter"
    );

const departmentFilter =
    document.getElementById(
        "departmentFilter"
    );

const clearFilters =
    document.getElementById(
        "clearFilters"
    );


// =========================================================
// APLICAR FILTROS
// =========================================================

function aplicarFiltros() {

    if (
        !categoryFilter ||
        !departmentFilter
    ) {

        return;

    }


    const categoriaSeleccionada =
        categoryFilter.value;


    const departamentoSeleccionado =
        departmentFilter.value;


    const resultados =
        productos.filter(producto => {

            const coincideCategoria =
                categoriaSeleccionada === "todas" ||
                producto.categoria ===
                categoriaSeleccionada;


            const coincideDepartamento =
                departamentoSeleccionado === "todos" ||
                producto.departamento ===
                departamentoSeleccionado;


            return (
                coincideCategoria &&
                coincideDepartamento
            );

        });


    mostrarProductos(
        resultados
    );

}


// =========================================================
// CAMBIO DE CATEGORÍA
// =========================================================

if (categoryFilter) {

    categoryFilter.addEventListener(
        "change",
        aplicarFiltros
    );

}


// =========================================================
// CAMBIO DE DEPARTAMENTO
// =========================================================

if (departmentFilter) {

    departmentFilter.addEventListener(
        "change",
        aplicarFiltros
    );

}


// =========================================================
// LIMPIAR FILTROS
// =========================================================

if (clearFilters) {

    clearFilters.addEventListener(
        "click",
        () => {

            if (categoryFilter) {

                categoryFilter.value =
                    "todas";

            }


            if (departmentFilter) {

                departmentFilter.value =
                    "todos";

            }


            mostrarProductos(
                productos
            );

        }
    );

}


// =========================================================
// BUSCADOR
// =========================================================

const searchBtn =
    document.getElementById(
        "searchBtn"
    );


if (searchBtn) {

    searchBtn.addEventListener(
        "click",
        () => {

            const search =
                prompt(
                    "¿Qué producto estás buscando?"
                );


            if (
                !search ||
                search.trim() === ""
            ) {

                return;

            }


            const textoBusqueda =
                search
                    .toLowerCase()
                    .trim();


            const resultados =
                productos.filter(
                    producto =>

                        producto.nombre
                            .toLowerCase()
                            .includes(
                                textoBusqueda
                            )

                        ||

                        producto.categoria
                            .toLowerCase()
                            .includes(
                                textoBusqueda
                            )

                        ||

                        producto.departamento
                            .toLowerCase()
                            .includes(
                                textoBusqueda
                            )

                );


            mostrarProductos(
                resultados
            );


            const catalogo =
                document.getElementById(
                    "catalogo"
                );


            if (catalogo) {

                catalogo.scrollIntoView({
                    behavior: "smooth"
                });

            }


            if (resultados.length === 0) {

                alert(
                    `No encontramos productos relacionados con "${search}".`
                );

            }

        }
    );

}


// =========================================================
// INICIALIZAR
// =========================================================

actualizarContadorCarrito();


console.log(
    "🇳🇮 ArteNik iniciado correctamente"
);

// =========================================================
// MÉTODOS DE PAGO
// =========================================================

const paymentMethods =
    document.querySelectorAll(
        'input[name="paymentMethod"]'
    );

const cardPaymentDetails =
    document.getElementById(
        "cardPaymentDetails"
    );


paymentMethods.forEach(method => {

    method.addEventListener("change", () => {

        if (!cardPaymentDetails) return;


        if (method.value === "tarjeta") {

            cardPaymentDetails.classList.add(
                "active"
            );

        } else {

            cardPaymentDetails.classList.remove(
                "active"
            );

        }

    });

});


// =========================================================
// FORMATO DEL NÚMERO DE TARJETA
// =========================================================

const cardNumber =
    document.getElementById("cardNumber");

if (cardNumber) {

    cardNumber.addEventListener(
        "input",
        () => {

            let value =
                cardNumber.value
                    .replace(/\D/g, "")
                    .substring(0, 16);

            value =
                value.replace(
                    /(\d{4})(?=\d)/g,
                    "$1 "
                );

            cardNumber.value =
                value;

        }
    );

}


// =========================================================
// FORMATO VENCIMIENTO
// =========================================================

const cardExpiry =
    document.getElementById("cardExpiry");

if (cardExpiry) {

    cardExpiry.addEventListener(
        "input",
        () => {

            let value =
                cardExpiry.value
                    .replace(/\D/g, "")
                    .substring(0, 4);

            if (value.length >= 3) {

                value =
                    value.substring(0, 2)
                    + "/"
                    + value.substring(2);

            }

            cardExpiry.value =
                value;

        }
    );

}