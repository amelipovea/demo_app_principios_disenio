const API_URL = "http://localhost:8080/api/productos";

async function cargarProductos() {
    const contenedor = document.getElementById("productos");

    contenedor.innerHTML = "<p>Cargando productos...</p>";

    try {
        const respuesta = await fetch(API_URL);

        if (!respuesta.ok) {
            throw new Error("No se pudieron obtener los productos");
        }

        const productos = await respuesta.json();

        mostrarProductos(productos);
    } catch (error) {
        contenedor.innerHTML = `
            <div class="error">
                Error al conectar con el servidor.
            </div>
        `;
        console.error(error);
    }
}

async function buscarProducto() {
    const id = document.getElementById("productoId").value;
    const resultado = document.getElementById("resultado");

    if (!id) {
        resultado.innerHTML = `
            <div class="error">
                Ingresa un ID de producto.
            </div>
        `;
        return;
    }

    resultado.innerHTML = "<p>Buscando producto...</p>";

    try {
        const respuesta = await fetch(`${API_URL}/${id}`);

        if (!respuesta.ok) {
            throw new Error("Producto no encontrado");
        }

        const producto = await respuesta.json();

        resultado.innerHTML = `
            <div class="mensaje">
                <h3>${producto.nombre}</h3>
                <p><strong>ID:</strong> ${producto.id}</p>
                <p><strong>Categoría:</strong> ${producto.categoria}</p>
                <p><strong>Precio:</strong> $${producto.precio.toFixed(2)}</p>
            </div>
        `;
    } catch (error) {
        resultado.innerHTML = `
            <div class="error">
                No se encontró el producto con ID ${id}.
            </div>
        `;
        console.error(error);
    }
}

function mostrarProductos(productos) {
    const contenedor = document.getElementById("productos");

    contenedor.innerHTML = "";

    productos.forEach(producto => {
        const tarjeta = document.createElement("div");

        tarjeta.className = "producto";

        tarjeta.innerHTML = `
            <h3>${producto.nombre}</h3>
            <p><strong>ID:</strong> ${producto.id}</p>
            <p><strong>Categoría:</strong> ${producto.categoria}</p>
            <p class="precio">$${producto.precio.toFixed(2)}</p>
        `;

        contenedor.appendChild(tarjeta);
    });
}

cargarProductos();