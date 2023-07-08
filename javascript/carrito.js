const tablaCarrito = document.getElementById("tablaCarrito");
const totalHtml = document.getElementById("total");
let carro = JSON.parse(localStorage.getItem("carro")) || [];

// Función para calcular el total de los productos en el carrito
function calcularTotal() {
  let total = carro.reduce((ac, prod) => {
    if (typeof prod.precio === 'number' && !isNaN(prod.precio)) {
      return ac + (prod.precio * prod.cantidad);
    } else {
      return ac;
    }
  }, 0);

  console.log(total);
  totalHtml.innerHTML = `Total a pagar: $${total}`;

  tablaCarrito.innerHTML = "";

  for (let index = 0; index < carro.length; index++) {
    const prod = carro[index];
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
      <td class="fw-bold fs-4">${prod.cantidad}</td> 
      <button id=${prod.id} class="eliminar">Eliminar Producto</button>
      <button id=${prod.id} class="sumar">+</button>
      <button id=${prod.id} class="restar">-</button>
    `;
    tablaCarrito.appendChild(fila);
  }

  const botonesEliminar = document.getElementsByClassName("eliminar");
  const botonesSumar = document.getElementsByClassName("sumar");
  const botonesRestar = document.getElementsByClassName("restar");

  for (let i = 0; i < botonesEliminar.length; i++) {
    botonesEliminar[i].addEventListener("click", () => {
      const prodACarro = carro.find((producto) => producto.id == botonesEliminar[i].id);
      carro.splice(i, 1);
      localStorage.setItem("carro", JSON.stringify(carro));
      calcularTotal();
    });
  }

  for (let i = 0; i < botonesSumar.length; i++) {
    botonesSumar[i].addEventListener("click", () => {
      const prodACarro = carro.find((producto) => producto.id == botonesSumar[i].id);
      if (typeof prodACarro.cantidad === 'number' && !isNaN(prodACarro.cantidad)) {
        prodACarro.cantidad += 1;
        localStorage.setItem("carro", JSON.stringify(carro));
        calcularTotal();
      }
    });
  }

  for (let i = 0; i < botonesRestar.length; i++) {
    botonesRestar[i].addEventListener("click", () => {
      const prodACarro = carro.find((producto) => producto.id == botonesRestar[i].id);
      if (prodACarro.cantidad > 0) {
        prodACarro.cantidad -= 1;
        localStorage.setItem("carro", JSON.stringify(carro));
        calcularTotal();
      }
    });
  }
}
calcularTotal();

// Evento para finalizar la compra
const finalizarBtn = document.getElementById("finalizar");
finalizarBtn.onclick = () => {
  carro = [];
  tablaCarrito.innerHTML = "";
  totalHtml.innerHTML = `Compra finalizada!`;
  localStorage.removeItem("carro");
  Toastify({
    text: "Gracias por tu compra, en las próximas 48 horas recibirás tu pedido!",
    duration: 3000,
    gravity: "bottom",
    position: "left",
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
  }).showToast();
};

// Evento para vaciar el carrito
const vaciarBtn = document.getElementById("vaciar");
vaciarBtn.onclick = () => {
  carro = [];
  tablaCarrito.innerHTML = "";
  totalHtml.innerHTML = `Carrito vacio!`;
  localStorage.removeItem("carro");
  Toastify({
    text: "Carrito vacio, puedes volver a realizar tu compra!",
    duration: 3000,
    gravity: "bottom",
    position: "left",
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
  }).showToast();
};
