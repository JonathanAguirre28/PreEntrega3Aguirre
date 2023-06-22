console.table(productos);

let contenedorProds = document.getElementById("misprods");

function renderizarProductos(listaproductos) {
    //vaciamos el contenedor para evitar duplicados
    contenedorProds.innerHTML = '';
    //cargamos las cartas de los productos solicitados
    for (const prod of listaproductos) {
        contenedorProds.innerHTML += `
        <div class="card col-sm-2">
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
    }
}

renderizarProductos(productos);

function agregarACarrito(productos){
    carro.push(prodACarro);
    console.table(carro);
}