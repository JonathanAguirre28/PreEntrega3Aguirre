let productos;
obtenerJsonProds();
let contenedorProds = document.getElementById("misprods");
const carroExistente = localStorage.getItem("carro");
const carro = carroExistente ? JSON.parse(carroExistente) : [];

// Renderizar los productos en el contenedor
function renderizarProductos(listaprods) {
  contenedorProds.innerHTML = "";

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
}

// Actualizar el carrito
function actualizarCarro() {
  let botones = document.getElementsByClassName("compra");
  for (const boton of botones) {
    boton.addEventListener("click", () => {
      const prodACarro = productos.find((producto) => producto.id == boton.id);
      console.log(prodACarro);

      Swal.fire({
        title: 'Fantastico!',
        text: `Agregaste al carrito: ${prodACarro.modelo}`,
        imageUrl: prodACarro.foto,
        imageWidth: 200,
        imageHeight: 200,
        imageAlt: prodACarro.modelo,
      })

      const index = carro.findIndex((producto) => producto.id == prodACarro.id);

      if (index !== -1) {
        carro[index].cantidad++;
      } else {
        prodACarro.cantidad = 1;
        carro.push(prodACarro);
      }

      localStorage.setItem("carro", JSON.stringify(carro));
    });

    boton.onmouseover = () => {
      boton.classList.replace("btn-primary", "btn-warning");
    }

    boton.onmouseout = () => {
      boton.classList.replace("btn-warning", "btn-primary");
    }
  }
}

let tablaCarrito = document.getElementById("tablaCarrito");

actualizarCarro();

let filtro = document.getElementById("filtro");
let filtroNombre = document.getElementById("modelo");
let minimo = document.getElementById("minimo");
let maximo = document.getElementById("maximo");
let marca = document.getElementById("modelo");
let refrescarPagina = document.getElementById("actualizar");

// Evento para filtrar por precio
function filtrarPorPrecio(preciominimo, preciomaximo) {
  const filtrados = productos.filter((prod) => (prod.precio >= preciominimo) && (prod.precio <= preciomaximo));
  sessionStorage.setItem("filtrados", JSON.stringify(filtrados));
  localStorage.setItem("filtrados", JSON.stringify(filtrados));
  return filtrados;
}

// Filtrar productos por precio
filtro.onclick = () => {
  if ((minimo.value != "") && (maximo.value != "") && (minimo.value < maximo.value)) {
    let listaFiltrados = filtrarPorPrecio(minimo.value, maximo.value);
    renderizarProductos(listaFiltrados);
    actualizarCarro();
  }
}

// Filtrar productos por modelo
function filtrarPorModelo(modelo) {
  const filtrados = productos.filter((prod) => prod.modelo.toLowerCase().includes(modelo.toLowerCase()));
  sessionStorage.setItem("filtrados", JSON.stringify(filtrados));
  return filtrados;
}

// Evento para filtrar por modelo
filtroNombre.onkeydown = () => {
  if (modelo.value != "") {
    let listaFiltrados = filtrarPorModelo(modelo.value);
    renderizarProductos(listaFiltrados);
    actualizarCarro();
  }
}

// evento para actualizar pagina despues de elegir un modelo o precio
refrescarPagina.addEventListener("click", () => {
  location.reload();
});

// Obtener productos desde un archivo JSON local
function obtenerJsonProds() {
  const URLJSON = "./json/productos.json";
  fetch(URLJSON)
    .then(response => response.json())
    .then(data => {
      productos = data;
      renderizarProductos(productos);
      actualizarCarro();
    })
    .catch(error => {
      console.error('Error al obtener los datos del archivo JSON:', error);
    });
}

// Obtener cotización del dólar desde una API externa
function obtenerDolar() {
  const URLDOLAR = "https://api.bluelytics.com.ar/v2/latest";
  fetch(URLDOLAR)
    .then(respuesta => respuesta.json())
    .then(datos => {
      const cotizacionesBlue = datos.blue;
      document.getElementById("cotizaciones").innerText = `Dólar compra: $${cotizacionesBlue.value_buy} - Dólar venta: $${cotizacionesBlue.value_sell}`;
    })
}
obtenerDolar();