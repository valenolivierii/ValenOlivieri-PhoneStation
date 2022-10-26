class Producto {
    constructor(id, nombre, precio, img) {
        this.id = id;
        this.nombre = nombre; 
        this.precio = precio;
        this.img = img;
        this.cantidad = 1; 
    }
}

const macAir = new Producto(1, "MacBook Air 13´´ M1 8 GB RAM 512 GB - Plateado (Silver)", 1800, "img/macbookair-512gb-plateado.jpg");
const macPro = new Producto(2, "MacBook Pro 13´´ Touch Bar M1 512 GB - Plateado (Silver) (2020)", 2770, "img/macbookpro-512gb-plateado.jpg");
const macPro1tb = new Producto(3, "MacBook Pro 14´´ M1 Pro 1 TB - Gris Espacial (Space Gray)", 3000, "img/macbookpro-1tb-grisespacial.jpg");
const macProMax = new Producto(4, "MacBook Pro 16´´ M1 Max 1 TB - Gris Espacial (Space Gray)", 3740, "img/macbookpromax-1tb-grisespacial.jpg");
const iphone12 = new Producto(5, "iPhone 12 128 GB - Violeta (Purple)", 1300, "img/iphone12-128gb-violeta.jpg");
const iphone13 = new Producto(6, "iPhone 13 128 GB - Blanco Estrella (Starlight)", 1500, "img/iphone13-128gb-blanco.jpg");
const iphone13Pro = new Producto(7, "iPhone 13 Pro 256 GB - Azul Claro (Sierra Blue)", 1700, "img/iphone13pro-256gb-sierrablue.jpg");
const iphone13ProMax = new Producto(8, "iPhone 13 Pro Max 512 GB - Grafito (Graphite)", 1900, "img/iphone13promax-512gb-grafito.jpg");

//Array catálogo de productos: 

const productos = [macAir, macPro, macPro1tb, macProMax, iphone12, iphone13, iphone13Pro, iphone13ProMax];

//Array carrito 

let carrito = [];

//Si hay algo en el localStorage, lo cargamos en el carrito. 
if(localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
}

//DOM mostrando los productos: 

const contenedorProductos = document.getElementById("contenedorProductos");

//Función para mostrar los productos: 

const mostrarProductos = () => {
    productos.forEach((producto) => {
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-xs-12");
        card.innerHTML = `
            <div class="card">
                <img src="${producto.img}" class="card-img-top imgProductos" alt="${producto.nombre}">
                <div class="card-body">
                <h5 class="card-title"> ${producto.nombre} </h5>
                <p class="card-text"> U$D ${producto.precio} </p>
                <button class="btn btn-primary" id="boton${producto.id}"> Agregar al Carrito </button>
                </div>
            </div>
        `
        contenedorProductos.appendChild(card);

        //Agregar productos al carrito: 

        const boton = document.getElementById(`boton${producto.id}`);
        boton.addEventListener("click", () => {
            agregarAlCarrito(producto.id)
        })
    })
}

//Función agregar al carrito: 

const agregarAlCarrito = (id) => {
    const producto = productos.find((producto) => producto.id === id);
    const productoEnCarrito = carrito.find((producto) => producto.id === id);
    if(productoEnCarrito){
        productoEnCarrito.cantidad++;
    }else {
        carrito.push(producto);
        //Al final de la clase, guardamos en el localStorage. 
        //Trabajamos con el localStorage: 
        localStorage.setItem("carrito",JSON.stringify(carrito));
    }
    calcularTotal();
}

mostrarProductos();

//MOSTRAR EL CARRITO DE COMPRAS: 

const contenedorCarrito = document.getElementById("contenedorCarrito");

const verCarrito = document.getElementById("verCarrito");

verCarrito.addEventListener("click", () => {
    mostrarCarrito();
});

//Función para mostrar el Carrito: 

const mostrarCarrito = () => {
    contenedorCarrito.innerHTML = "";
    carrito.forEach((producto) => {
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-xs-12");
        card.innerHTML = `
        <div class="card">
            <img src="${producto.img}" class="card-img-top imgProductos" alt="${producto.nombre}">
            <div class="card-body">
                <h5 class="card-title"> ${producto.nombre} </h5>
                <p class="card-text"> U$D ${producto.precio} </p>
                <p class="card-text"> ${producto.cantidad} </p>
                <button class="btn btn-primary" id="eliminar${producto.id}">Eliminar Producto</button>
            </div>
        </div>
        `;
    contenedorCarrito.appendChild(card);

        //Eliminar productos del carrito: 
        const boton = document.getElementById(`eliminar${producto.id}`);
        boton.addEventListener("click", () => {
            eliminarDelCarrito(producto.id);
        })
    })
    calcularTotal();
}


//Función que elimina el producto del carrito: 

const eliminarDelCarrito = (id) => {
    const producto = carrito.find((producto) => producto.id === id);
    const indice = carrito.indexOf(producto);
    carrito.splice(indice, 1);
    mostrarCarrito();

    //LocalStorage:
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

//Vaciamos todo el carrito de compras: 

const vaciarCarrito = document.getElementById("vaciarCarrito");

vaciarCarrito.addEventListener("click", () => {
    eliminarTodoElCarrito();
})

//Función para eliminar todo el carrito: 

const eliminarTodoElCarrito = () => {
    carrito = [];
    mostrarCarrito();

    //LocalStorage. 
    localStorage.clear();
}

//Mostramos mensaje con el total de la compra 

const total = document.getElementById("total");

const calcularTotal = () => {
    let totalCompra = 0; 
    carrito.forEach((producto) => {
        totalCompra += producto.precio * producto.cantidad;
        //+= es igual a poner totalCompra = totalCompra + producto.precio * producto.cantidad;
    })
    total.innerHTML = ` Total: U$D ${totalCompra}`;
} 


// BUSCADOR DE PRODUCTOS 

const filtrarPorTexto = () => {
    contenedorProductos.innerHTML = ``;
    const texto = formulario.value.toLowerCase();
        for(let producto of productos){
            let nombre = producto.nombre.toLowerCase();
            if(nombre.indexOf(texto) !== -1){
                console.log(nombre.indexOf(texto));
                const card = document.createElement("div");
                card.classList.add("col-xl-3", "col-md-6", "col-xs-12");
                card.innerHTML = `
                <div class="card">
                <img src="${producto.img}" class="card-img-top imgProductos" alt="${producto.nombre}">
                <div class="card-body">
                <h5 class="card-title"> ${producto.nombre} </h5>
                <p class="card-text"> U$D ${producto.precio} </p>
                <button class="btn btn-primary" id="boton${producto.id}"> Agregar al Carrito </button>
                </div>
            </div>
        `
        contenedorProductos.appendChild(card);
            const boton = document.getElementById(`boton${producto.id}`);
            boton.addEventListener("click", () => {
            agregarAlCarrito(producto.id);})
        } else if(nombre.indexOf(texto) === 0){
            contenedorProductos.innerHTML = ``;
            mostrarProductos();
        }
    }
    if(contenedorProductos.innerHTML === ""){
        contenedorProductos.innerHTML += `
        <div>Producto no encontrado.</div>`;
    }
}
botonBuscar.addEventListener('click', filtrarPorTexto);
formulario.addEventListener('keyup', filtrarPorTexto);

