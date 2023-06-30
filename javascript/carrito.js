let tablaCarrito = document.getElementById("tablaCarrito");
let totalHtml = document.getElementById("total");
let carro = JSON.parse(localStorage.getItem("carro")) || [];

function calcularTotal() {
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

    carro.forEach((prod, index) => {
        const fila = document.createElement("tr");
        const imagenCelda = document.createElement("td");
        const imagen = document.createElement("img");
        imagen.src = prod.foto;
        imagen.alt = "Imagen del producto";
        imagen.style.width = "70px";
        imagen.style.height = "auto";
        imagenCelda.appendChild(imagen);
        fila.appendChild(imagenCelda);
        fila.innerHTML += `
            <td>${prod.modelo}</td>
            <td class="fw-bold fs-4">$${prod.precio}</td>
            <button id=${prod.id} class="eliminar">Eliminar Producto</button>
        `;
        tablaCarrito.appendChild(fila);

        let botones = document.getElementsByClassName("eliminar");
        for (const boton of botones) {
            boton.addEventListener("click", () => {
                const prodACarro = carro.find((producto) => producto.id == boton.id);
                carro.splice(index, 1);
                localStorage.setItem("carro", JSON.stringify(carro));
                calcularTotal();
                localStorage.removeItem("carro");
                console.log(prodACarro);
            });
        }
    });
}

calcularTotal();

//FINALIZAR COMPRA
let finalizarBtn = document.getElementById("finalizar");
finalizarBtn.onclick = () => {
    carro = [];
    document.getElementById("tablaCarrito").innerHTML = '';
    document.getElementById("total").innerHTML = `Total a pagar $: `;
    localStorage.removeItem("carro");
    Toastify({
        text: 'Gracias por tu compra, en las proximas 48 horas recibiras tu pedido!',
        duration: 3000,
        gravity: 'botton',
        position: 'left',
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
    }).showToast();
}