let tablaCarrito = document.getElementById("tablaCarrito");
let totalHtml = document.getElementById("total");
let carro = JSON.parse(localStorage.getItem("carro")) || [];

function calcularTotal() {
    // Calcular el total
    let total = carro.reduce((ac, prod) => {
        if (typeof prod.precio === 'number' && !isNaN(prod.precio)) {
            return ac + prod.precio;
        } else {
            return ac;
        }
    }, 0);

    console.log(total);
    totalHtml.innerHTML = `Total a pagar: $${total}`;

    tablaCarrito.innerHTML = "";

    carro.forEach((prod) => {
        const fila = document.createElement("tr");
        const imagenCelda = document.createElement("td");
        const imagen = document.createElement("img");
        imagen.src = prod.foto;
        imagen.alt = "Imagen del producto";
        imagen.style.width = "100px"; 
        imagen.style.height = "auto"; 
        imagenCelda.appendChild(imagen);
        fila.appendChild(imagenCelda);
        fila.innerHTML += `
            <td>${prod.modelo}</td>
            <td>$${prod.precio}</td>
        `;
        tablaCarrito.appendChild(fila);
    });
}

calcularTotal();


