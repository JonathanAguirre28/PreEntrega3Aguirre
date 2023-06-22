console.table(productos);
const carro= JSON.parse (localStorage.getItem("carro")) || [];
let contenedorProds = document.getElementById("misprods");
let tablaBody = document.getElementById("tablabody");

function renderizarProductos(listaprods) {
    //vaciamos el contenedor para evitar duplicados
    contenedorProds.innerHTML = '';
    //cargamos las cartas de los productos solicitados
    for (const prod of listaprods) {
        contenedorProds.innerHTML += `
        <div class="card col-sm-3 m-2">
           <img class="card-img-top" src=${prod.foto} alt="card image cap">
            <div class="card-body">
            <h5 class="card-title">${prod.modelo}</h5>
            <p class="card-text">${prod.precio}</p>
            <button id=${prod.id} class="btn btn-primary compra">Comprar</button>
          </div>
       </div>
        `;
    }

    //EVENTOS
    let botones = document.getElementsByClassName("compra");
    for(const boton of botones){
        boton.addEventListener("click", ()=> {
            const prodACarro = productos.find((producto)=> producto.id == boton.id);
            console.log(prodACarro);
            //cargar prod al carro
            agregarACarrito(prodACarro);
        })
        boton.onmouseover = () =>{
            boton.classList.replace("btn-primary","btn-warning");
        }
        boton.onmouseout = () =>{
            boton.classList.replace("btn-warning","btn-primary");
        }
    }
}

renderizarProductos(productos);

function agregarACarrito(producto){
    carro.push(producto);
    console.table(carro);
    tablaBody.innerHTML=`
    <tr>
    <td>${producto.id}</td>
    <td>${producto.modelo}</td>
    <td>${producto.precio}</td>
    </tr>`;

    //calcular total
    let total = carro.reduce((ac,prod) => ac + prod.precio, 0);
    console.table(total);
    document.getElementById("total").innerText=`total a pagar $:${total}`;
    //agregamos storage
    localStorage.setItem("carro", JSON.stringify(carro))
}

let filtro = document.getElementById("filtro");
let filtroNombre = document.getElementById("modelo");
let minimo = document.getElementById("minimo");
let maximo = document.getElementById("maximo");
let marca = document.getElementById("modelo");

//funcion para poder filtrar por precio
function filtrarPorPrecio(preciominimo, preciomaximo){
    const filtrados = productos.filter((prod) => (prod.precio >= preciominimo) && (prod.precio <= preciomaximo));
    sessionStorage.setItem("filtrados", JSON.stringify(filtrados));
    return filtrados; 
}

filtro.onclick = () => {
    if((minimo.value != "")&&(maximo.value != "")&&(minimo.value < maximo.value)){
        let listaFiltrados = filtrarPorPrecio (minimo.value, maximo.value);
        renderizarProductos(listaFiltrados);
    }
}

//cambiar una variable que tengo de mas

//funcion para poder filtrar por marca
function filtrarPorModelo(modelo) {
    const filtrados = productos.filter((prod) => prod.modelo.toLowerCase().includes(modelo.toLowerCase()));
    sessionStorage.setItem("filtrados", JSON.stringify(filtrados));
    return filtrados;
  }

filtroNombre.onkeydown = () => {
    if(modelo.value != ""){
        let listaFiltrados = filtrarPorModelo(modelo.value);
        renderizarProductos(listaFiltrados);
    }
}


