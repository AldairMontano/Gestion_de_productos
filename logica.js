class Articulo {
  constructor(codigo, descripcion, precio) {
    this.codigo = codigo;
    this.descripcion = descripcion;
    this.precio = precio;
  }
}

let idTabla;
let cel;

//Se declaran los elementos para iniciar la logica de la pagina
let form = document.getElementById("form");
let modify = document.getElementById("modificar");
modify.disabled = true;
// let agregar = document.getElementById("agregar");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  let formObj = new FormData(form);
  if (formObj.get("_codigo") != 0) {
    crearObj(formObj);
  } else {
    alert("Debe ingresar un código de articulo distinto a cero");
  }
});

//Generar la tabla con elementos del local storage
document.addEventListener("DOMContentLoaded", function () {
  let productosArray = JSON.parse(localStorage.getItem("Articulo"));
  productosArray.forEach((element) => {
    agregarDatos(element);
  });
});

//agregar evento al boton modificar
modify.addEventListener("click", (event) => {
  modificar(idTabla);
});

//funcion para crear objetos, tambien manda a llamar a guardarArticulos
function crearObj(formObj) {
  let articulo = new Articulo(
    formObj.get("_codigo"),
    formObj.get("_des"),
    formObj.get("_precio")
  );
  guardarArticulo(articulo);
}

//funcion para agregar los datos colocados en el form a la tabla
function agregarDatos(articulo) {
  let tabla = document.getElementById("tabla");
  let fila = document.createElement("tr");
  fila.setAttribute("data-codigo", articulo.codigo);
  let celda1 = document.createElement("td");
  let celda2 = document.createElement("td");
  let celda3 = document.createElement("td");
  let celda4 = document.createElement("td");
  let celda5 = document.createElement("td");
  let borrar = document.createElement("button");
  let seleccionar = document.createElement("button");
  tabla.appendChild(fila);
  fila.appendChild(celda1);
  fila.appendChild(celda2);
  fila.appendChild(celda3);
  fila.appendChild(celda4);
  fila.appendChild(celda5);
  celda4.appendChild(borrar);
  celda5.appendChild(seleccionar);
  celda1.textContent = articulo.codigo;
  celda2.textContent = articulo.descripcion;
  celda3.textContent = articulo.precio;
  borrar.textContent = "Borrar";
  seleccionar.textContent = "Seleccionar";
  select(seleccionar);
  borrarDatos(borrar);
}

//funcion para guardar articulos en el local storage y mandar a llamar a AgregarDatos.
function guardarArticulo(articulo) {
  let productos = JSON.parse(localStorage.getItem("Articulo")) || [];
  //validamos que el codigo no este agregado al array.
  let pos = productos.map((e) => e.codigo).indexOf(articulo.codigo);
  if (pos == -1) {
    productos.push(articulo);
    agregarDatos(articulo);
    form.reset();
  } else {
    alert("Ya existe el producto con ese codigo");
  }
  let articuloJson = JSON.stringify(productos);
  localStorage.setItem("Articulo", articuloJson);
}

//Funcion para modificar los datos de la tabla y del local storage
function select(seleccionar) {
  seleccionar.addEventListener("click", (event) => {
    cel = event.target.parentNode.parentNode;
    idTabla = cel.getAttribute("data-codigo");

    document.getElementById("_des").value = cel.cells[1].innerHTML;
    document.getElementById("_precio").value = cel.cells[2].innerHTML;

    modify.disabled = false;
  });
}

//funcion para Borrar datos de la tabla y del local storage
function borrarDatos(borrar) {
  borrar.addEventListener("click", (event) => {
    let bor = event.target.parentNode.parentNode;
    let codigo = bor.getAttribute("data-codigo");
    let productosArray = JSON.parse(localStorage.getItem("Articulo"));
    let indice = productosArray.findIndex(
      (element) => element.codigo === codigo
    );
    if (confirm("Deseas borrar el producto!")) {
      bor.remove();
      productosArray.splice(indice, 1);
      let articuloJson = JSON.stringify(productosArray);
      localStorage.setItem("Articulo", articuloJson);
    } else {
      alert("Ok");
    }
  });
}

function modificar(idTabla) {
  let productosArray = JSON.parse(localStorage.getItem("Articulo"));
  let indice = productosArray.findIndex(
    (element) => element.codigo === idTabla
  );

  cel.cells[1].innerHTML = document.getElementById("_des").value;
  cel.cells[2].innerHTML = document.getElementById("_precio").value;

  productosArray[indice].descripcion = document.getElementById("_des").value;
  productosArray[indice].precio = document.getElementById("_precio").value;
  let articuloJson = JSON.stringify(productosArray);
  localStorage.setItem("Articulo", articuloJson);
  form.reset();
  modify.disabled = true;
}
