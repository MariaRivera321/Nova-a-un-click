let carrito = [];  // Array para almacenar los productos del carrito
let carritoCount = document.getElementById('carrito-count');  // Contador del carrito
let carritoPopup = document.getElementById('carrito-popup');  // Popup del carrito
let listaCarrito = document.getElementById('lista-carrito');  // Lista de productos en el popup
let totalCarrito = document.getElementById('total-carrito');  // Total del carrito
let formEnvio = document.getElementById('form-envio');  // Formulario de envío

// Función para recuperar el carrito desde localStorage (si existe)
function cargarCarrito() {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);  // Convertir el carrito guardado en un objeto
    }
    actualizarContador();  // Actualizar el contador del carrito al cargar la página
}

// Función para guardar el carrito en localStorage
function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));  // Guardar el carrito en localStorage
}

// Función para agregar productos al carrito
function agregarAlCarrito(nombre, precio) {
    const producto = { nombre, precio };  // Crear objeto del producto
    carrito.push(producto);  // Añadir el producto al carrito

    guardarCarrito();  // Guardar el carrito actualizado en localStorage
    actualizarContador();  // Actualizar el contador de productos en el header
}

// Función para actualizar el contador del carrito en el header
function actualizarContador() {
    if (carritoCount) {
        carritoCount.innerText = carrito.length;  // Mostrar la cantidad de productos en el carrito
    }
}

// Función para eliminar un producto del carrito
function eliminarProducto(index) {
    carrito.splice(index, 1);  // Eliminar el producto en la posición 'index' del carrito
    guardarCarrito();  // Guardar el carrito actualizado en localStorage
    actualizarContador();  // Actualizar el contador de productos en el header
    verCarrito();  // Volver a mostrar el carrito actualizado
}

// Función para mostrar el contenido del carrito en el popup
function verCarrito() {
    if (carrito.length > 0) {
        // Limpiar la lista antes de agregar los productos
        listaCarrito.innerHTML = '';
        let total = 0;

        // Agregar los productos del carrito al popup
        carrito.forEach((producto, index) => {
            let itemCarrito = document.createElement('li');
            itemCarrito.innerHTML = `${producto.nombre} - $${producto.precio} 
                                     <button onclick="eliminarProducto(${index})">Eliminar</button>`;
            listaCarrito.appendChild(itemCarrito);

            total += producto.precio;  // Calcular el total
        });

        totalCarrito.innerText = total.toFixed(2);  // Mostrar el total con 2 decimales
        carritoPopup.style.display = 'flex';  // Mostrar el popup
    } else {
        listaCarrito.innerHTML = '<li>El carrito está vacío.</li>';
        totalCarrito.innerText = '0.00';
        carritoPopup.style.display = 'flex';  // Mostrar el popup aunque esté vacío
    }
}

// Función para cerrar el popup del carrito
function cerrarCarrito() {
    carritoPopup.style.display = 'none';  // Ocultar el popup
}

// Función para mostrar el formulario de solicitud de envío
function solicitarEnvio() {
    if (carrito.length === 0) {
        alert("El carrito está vacío. No puedes solicitar un envío.");
        return;
    }

    // Mostrar el formulario de envío
    formEnvio.style.display = 'block';
}

// Función para cancelar el formulario de solicitud de envío
function cancelarEnvio() {
    formEnvio.style.display = 'none';  // Ocultar el formulario
}

// Función para procesar el formulario de solicitud de envío
document.getElementById('envio-form').addEventListener('submit', function(event) {
    event.preventDefault();  // Evitar que se recargue la página

    // Obtener los datos del formulario
    const nombre = document.getElementById('nombre').value;
    const direccion = document.getElementById('direccion').value;
    const telefono = document.getElementById('telefono').value;

    // Validar que todos los campos estén completos
    if (!nombre || !direccion || !telefono) {
        alert("Por favor, complete todos los campos.");
        return;
    }

    // Simular el envío (puedes hacer una solicitud AJAX aquí para enviar los datos a un servidor)
    alert(`¡Gracias por tu compra, ${nombre}! El envío se realizará a la dirección: ${direccion}.`);

    // Limpiar el carrito y el localStorage después de confirmar el envío
    carrito = [];
    localStorage.removeItem('carrito');
    actualizarContador();
    formEnvio.style.display = 'none';  // Ocultar el formulario de envío
    cerrarCarrito();  // Cerrar el popup del carrito
});

// Cargar el carrito al inicio de la página
window.addEventListener('load', cargarCarrito);
