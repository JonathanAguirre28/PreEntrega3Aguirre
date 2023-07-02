let contenedorProds = document.getElementById("misprods");
const carroExistente = localStorage.getItem("carro");
const carro = carroExistente ? JSON.parse(carroExistente) : [];

function renderizarProductos(listaprods) {
    //vaciamos el contenedor para evitar duplicados
    contenedorProds.innerHTML = "";
    //cargamos las cartas de los productos solicitados
    for (const prod of listaprods) {
        contenedorProds.innerHTML += `
        <div class="card col-sm-3 m-2 bg-secondary border border-3 rounded-5 p-3" style="width: 250px">
           <img class="card-img-top w-75 m-3" src=${prod.foto} alt="card image cap">
            <div class="card-body d-grid ">
            <h5 class="card-title text-center text-light fw-bolder">${prod.modelo}</h5>
            <p class="card-text text-center text-light fw-bolder">$ ${prod.precio}</p>
            <button id=${prod.id} class="btn btn-danger rounded-5 compra">Añadir al carrito</button>
          </div>
       </div>
        `;
    }

    //EVENTOS
    let botones = document.getElementsByClassName("compra");
    for (const boton of botones) {
        boton.addEventListener("click", () => {
            const prodACarro = productos.find((producto) => producto.id == boton.id);
            console.log(prodACarro);

            Swal.fire({
                title: 'Fantastico!',
                text: `Agregaste al carrito: ${prodACarro.modelo}`,
                imageUrl: prodACarro.foto,
                imageWidth: 250,
                imageHeight: 150,
                imageAlt: prodACarro.modelo,
            })

            let carro;

            if (carroExistente) {
                carro = JSON.parse(carroExistente);
                if (!Array.isArray(carro)) {
                    carro = [];
                }
            } else {
                carro = [];
            }

            carro.push(prodACarro);

            localStorage.setItem("carro", JSON.stringify(carro));

        })
        boton.onmouseover = () => {
            boton.classList.replace("btn-primary", "btn-warning");
        }
        boton.onmouseout = () => {
            boton.classList.replace("btn-warning", "btn-primary");
        }
    }
}


let tablaCarrito = document.getElementById("tablaCarrito");


renderizarProductos(productos);

let filtro = document.getElementById("filtro");
let filtroNombre = document.getElementById("modelo");
let minimo = document.getElementById("minimo");
let maximo = document.getElementById("maximo");
let marca = document.getElementById("modelo");

//funcion para poder filtrar por precio
function filtrarPorPrecio(preciominimo, preciomaximo) {
    const filtrados = productos.filter((prod) => (prod.precio >= preciominimo) && (prod.precio <= preciomaximo));
    sessionStorage.setItem("filtrados", JSON.stringify(filtrados));
    return filtrados;
}

filtro.onclick = () => {
    if ((minimo.value != "") && (maximo.value != "") && (minimo.value < maximo.value)) {
        let listaFiltrados = filtrarPorPrecio(minimo.value, maximo.value);
        renderizarProductos(listaFiltrados);
    }
}

//funcion para poder filtrar por marca
function filtrarPorModelo(modelo) {
    const filtrados = productos.filter((prod) => prod.modelo.toLowerCase().includes(modelo.toLowerCase()));
    sessionStorage.setItem("filtrados", JSON.stringify(filtrados));
    return filtrados;
}

filtroNombre.onkeydown = () => {
    if (modelo.value != "") {
        let listaFiltrados = filtrarPorModelo(modelo.value);
        renderizarProductos(listaFiltrados);
    }
}