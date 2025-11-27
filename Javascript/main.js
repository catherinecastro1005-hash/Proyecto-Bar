const PRODUCTOS_DB = [
    {
        id: 1,
        nombre: "Vuse Go Blue Raspberry",
        precio: 19900,
        categoria: "Vape",
        imagen: "https://images.unsplash.com/photo-1550523376-45d479d0d4b3?w=500&q=80",
        stock: 15
    },
    {
        id: 2,
        nombre: "Ron Viejo de Caldas",
        precio: 55000,
        categoria: "Ron",
        imagen: "https://images.unsplash.com/photo-1614313511387-1436a4480ebb?w=500&q=80",
        stock: 8
    },
    {
        id: 3,
        nombre: "Aguardiente Antioqueño",
        precio: 45000,
        categoria: "Aguardiente",
        imagen: "https://images.unsplash.com/photo-1599021407577-530d77d23e1a?w=500&q=80",
        stock: 12
    },
    {
        id: 4,
        nombre: "Tequila Don Julio",
        precio: 220000,
        categoria: "Tequila",
        imagen: "https://images.unsplash.com/photo-1516535794938-6063878f08cc?w=500&q=80",
        stock: 5
    },
    {
        id: 5,
        nombre: "Cerveza Corona x6",
        precio: 28000,
        categoria: "Cerveza",
        imagen: "https://images.unsplash.com/photo-1608270586620-248524c67de9?w=500&q=80",
        stock: 25
    },
    {
        id: 6,
        nombre: "Vuse Go Watermelon",
        precio: 19900,
        categoria: "Vape",
        imagen: "https://images.unsplash.com/photo-1564221636-c36c04990553?w=500&q=80",
        stock: 18
    },
    {
        id: 7,
        nombre: "Vodka Absolut",
        precio: 85000,
        categoria: "Vodka",
        imagen: "https://images.unsplash.com/photo-1617134826274-6c5296972249?w=500&q=80",
        stock: 7
    },
    {
        id: 8,
        nombre: "Whisky Old Parr",
        precio: 120000,
        categoria: "Whisky",
        imagen: "https://images.unsplash.com/photo-1582037928769-181f2644ecb7?w=500&q=80",
        stock: 6
    }
];

let carrito = JSON.parse(localStorage.getItem('licorera_cart')) || [];

document.addEventListener('DOMContentLoaded', () => {
    const contenedor = document.getElementById('contenedor-productos');
    const contadorCarrito = document.getElementById('cart-count-badge');
    
    actualizarContador();

    if (contenedor) {
        let html = '';
        
        PRODUCTOS_DB.forEach(prod => {
            const precio = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumSignificantDigits: 3 }).format(prod.precio);
            
            html += `
                <div class="col-6 col-md-3 mb-4">
                    <div class="product-card h-100">
                        ${prod.stock < 10 ? '<span class="badge bg-warning">¡Pocas Unidades!</span>' : ''}
                        
                        <img src="${prod.imagen}" class="card-img-top" alt="${prod.nombre}" style="height: 200px; object-fit: contain;">
                        
                        <div class="card-body d-flex flex-column">
                            <h5 class="card-title">${prod.nombre}</h5>
                            <span class="text-muted small mb-2">${prod.categoria}</span>
                            <p class="card-text">${precio}</p>
                            
                            <button class="btn-add-cart mt-auto" onclick="agregarAlCarrito(${prod.id})">
                                <i class="fas fa-cart-plus"></i> Agregar
                            </button>
                        </div>
                    </div>
                </div>
            `;
        });
        
        contenedor.innerHTML = html;
    }
});

function agregarAlCarrito(id) {
    const producto = PRODUCTOS_DB.find(p => p.id === id);
    
    const itemEnCarrito = carrito.find(p => p.id === id);
    
    if (itemEnCarrito) {
        itemEnCarrito.cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }
    
    localStorage.setItem('licorera_cart', JSON.stringify(carrito));
    actualizarContador();
    
    alert(`¡${producto.nombre} agregado a la canasta!`);
}

function actualizarContador() {
    const contador = document.getElementById('cart-count-badge');
    if(contador) {
        const total = carrito.reduce((acc, item) => acc + item.cantidad, 0);
        contador.innerText = total;
        contador.style.display = total > 0 ? 'flex' : 'none';
    }
}

window.agregarAlCarrito = agregarAlCarrito;

function scrollMarcas(direction) {
    const container = document.getElementById('brandScroll');
    const scrollAmount = 300; 
    
    if (direction === 'left') {
        container.scrollLeft -= scrollAmount;
    } else {
        container.scrollLeft += scrollAmount;
    }
}

window.scrollMarcas = scrollMarcas;