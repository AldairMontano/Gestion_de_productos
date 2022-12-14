document.addEventListener("DOMContentLoaded", function () {
  let productosArray = JSON.parse(localStorage.getItem("Articulo"));
  productosArray.forEach((element) => {
    agregarDatos(element);
  });
});

function agregarDatos(elemento) {
  let producto = document.getElementById("productos");
  let div = document.createElement("div");
  div.id = "tarjeta";
  producto.appendChild(div);
  let img = document.createElement("img");
  div.appendChild(img);
  let p = document.createElement("p");
  div.appendChild(p);
  let pp = document.createElement("p");
  div.appendChild(pp);

  img.src = "./assets/descarga.png";
  p.textContent = elemento.descripcion;
  pp.textContent = "$ " + elemento.precio + ".00";
}
