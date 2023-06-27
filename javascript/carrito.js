let tablaCarrito = document.getElementById("tablaCarrito");
let totalHtml = document.getElementById("total");
let carro = JSON.parse(localStorage.getItem("carro")) || [];
//si habia algo en el storage dibujar las filas de las tablas 
function calcularTotal(producto) {
    // Calcular el total
    let total = carro.reduce((ac, prod) => {
        if (typeof prod.precio === 'number' && !isNaN(prod.precio)) {
            return ac + prod.precio;
        } else {
            return ac;
        }
    }, 0);

    console.log(total);
    totalHtml.innerHTML = `total a pagar $:${total}`;
}

calcularTotal(carro);