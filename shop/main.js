// Definición de la clase Articulo
class Articulo {
    constructor(nombre, precio, imagenURL, material, estilo, color, tipo) {
        this.nombre = nombre;
        this.precio = precio;
        this.imagenURL = imagenURL;
        this.material = material;
        this.estilo = estilo;
        this.color = color;
        this.tipo = tipo;
    }

    obtenerHTML() {
        // Genera el HTML para mostrar el artículo en la página
        return `
            <div class="product" data-id="${this.id}" data-material="${this.material}" data-estilo="${this.estilo}" data-color="${this.color}" data-tipo="${this.tipo}">
                <div class="object">
                    <img src="${this.imagenURL}" alt="${this.nombre}">
                </div>
                <h3>${this.nombre}</h3>
                <p>Precio: S/. ${this.precio.toFixed(2)}</p>
                <button onclick="agregarAlCarrito('${this.id}', ${this.precio})">Agregar al carrito</button>
            </div>
        `;
    }
    
    
}

// Función para cargar productos desde el archivo JSON
async function cargarProductos() {
    try {
        const response = await fetch('productos.json'); // Cambia la URL al archivo JSON
        const productos = await response.json();

        // Obtener el contenedor principal para productos
        const mainContent = document.querySelector('.main-content');
        mainContent.innerHTML = ''; // Limpia el contenido existente

        // Crear instancias de la clase Articulo y agregar productos al contenedor
        productos.forEach((producto) => {
            const articulo = new Articulo(
                producto.nombre,
                producto.precio,
                producto.imagenURL,
                producto.material,
                producto.estilo,
                producto.color,
                producto.tipo
            );
            mainContent.innerHTML += articulo.obtenerHTML();
        });
    } catch (error) {
        console.error('Error al cargar productos:', error);
    }
}


// Llama a la función para cargar los productos al cargar la página
cargarProductos();

// Función para agregar un artículo al carrito
function agregarAlCarrito(nombre, precio) {
    // Aquí puedes implementar la lógica para agregar el artículo al carrito
    // Por ejemplo, puedes usar un array para mantener un seguimiento de los productos en el carrito.
    console.log(`Agregado al carrito: ${nombre} - Precio: $${precio.toFixed(2)}`);
}

// ...

// Función para filtrar productos según los filtros seleccionados
function filtrarProductos() {
    const materialSeleccionado = document.getElementById('material').value;
    const estiloSeleccionado = document.getElementById('estilo').value;
    const colorSeleccionado = document.getElementById('color').value;
    const tipoSeleccionado = document.getElementById('tipo').value;

    const productos = document.querySelectorAll('.product');

    productos.forEach((producto) => {
        const productoMaterial = producto.getAttribute('data-material');
        const productoEstilo = producto.getAttribute('data-estilo');
        const productoColor = producto.getAttribute('data-color');
        const productoTipo = producto.getAttribute('data-tipo');

        if (
            (materialSeleccionado === 'todos' || productoMaterial === materialSeleccionado) &&
            (estiloSeleccionado === 'todos' || productoEstilo === estiloSeleccionado) &&
            (colorSeleccionado === 'todos' || productoColor === colorSeleccionado) &&
            (tipoSeleccionado === 'todos' || productoTipo === tipoSeleccionado)
        ) {
            producto.style.display = 'block'; // Mostrar el producto
        } else {
            producto.style.display = 'none'; // Ocultar el producto
        }
    });
}

// Escuchar cambios en los filtros y llamar a la función de filtrado
document.getElementById('material').addEventListener('change', filtrarProductos);
document.getElementById('estilo').addEventListener('change', filtrarProductos);
document.getElementById('color').addEventListener('change', filtrarProductos);
document.getElementById('tipo').addEventListener('change', filtrarProductos);

// ...
function buscarPorNombre() {
    const inputBusqueda = document.getElementById('busqueda');
    const textoBusqueda = inputBusqueda.value.toLowerCase(); // Obtener el texto de búsqueda en minúsculas

    const productos = document.querySelectorAll('.product');

    productos.forEach((producto) => {
        const nombreProducto = producto.querySelector('h3').textContent.toLowerCase(); // Obtener el nombre del producto en minúsculas

        if (nombreProducto.includes(textoBusqueda)) {
            producto.style.display = 'block'; // Mostrar el producto si coincide con la búsqueda
        } else {
            producto.style.display = 'none'; // Ocultar el producto si no coincide con la búsqueda
        }
    });
}

// Escuchar el evento 'input' en el campo de búsqueda para buscar en tiempo real
const inputBusqueda = document.getElementById('busqueda');
inputBusqueda.addEventListener('input', buscarPorNombre);


