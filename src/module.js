import { sendPostRequest, fetchTaskData, deleteData, putData } from "./API.js";

const fecha = document.querySelector("#fecha");
const lista = document.querySelector("#lista");
const elemento = document.querySelector("#elemento");
let input = document.querySelector("#input");
const botonEnter = document.querySelector("#enter");
const contadorDiv = document.querySelector("#contador");
const textpend = document.querySelector("#tareaspendientes");
const check = "fa-check-circle";
const uncheck = "fa-circle";

let LIST = [];
let id;

function obtenerHoraActual() {
  let fecha1 = new Date();
  let hora = fecha1.getHours();
  let minutos = fecha1.getMinutes();
  let segundos = fecha1.getSeconds();

  return hora + ":" + minutos + ":" + segundos;
}

function actualizarHora() {
  let horaElemento = document.getElementById("hora");
  horaElemento.textContent = obtenerHoraActual();
}

setInterval(actualizarHora, 1000);

let fechaActual = document.getElementById("fechaActual");
let fecha1 = new Date();
fechaActual.textContent = fecha1.toLocaleDateString();

document.addEventListener("DOMContentLoaded", cargarTarea);

async function cargarTarea() {
  let tareas = await fetchTaskData();
  let contadorAux = 0;
  tareas.forEach((tarea) => {
    agregarTarea(tarea.id, tarea.nombre, tarea.check);
  });
  actualizarContador();

  for (let index = 0; index < tareas.length; index++) {
    if (tareas[index].realizado == check) {
      contadorAux++;
    }
  }

  contadorDiv.innerHTML = contadorAux;
}

const insertarTarea = async () => {
  let texto = input.value.trim();
  console.log(texto);
  let valorc = "";

  if (texto != valorc) {
    const tarea = input.value;
    if (tarea) {
      let nuevaTarea = {
        nombre: tarea,
        // id: id,
        check: false,
      };

      LIST.push(nuevaTarea);
      let saveData = await sendPostRequest(nuevaTarea);
      agregarTarea(saveData.id, saveData.nombre, false);

      // localStorage.setItem("TODO", JSON.stringify(LIST));
      // id++;
      // input.value = "";
    }
  } else {
    let Modal = document.getElementById("Modal");
    Modal.style.display = "block";
  }
};

function actualizarContador() {
  const tareas = document.querySelectorAll("." + check);
  contadorDiv.innerHTML = tareas.length;
}

function pulsar(e) {
  if (e.keyCode === 13 && !e.shiftKey) {
    e.preventDefault();

    insertarTarea();
  }
}

let modalCloseButton = document.getElementById("Cerrar");

modalCloseButton.addEventListener("click", () => {
  let modal = document.getElementById("Modal");
  modal.style.display = "none";
});

function agregarTarea(id, tarea, realizado) {
  const REALIZADO = realizado ? check : uncheck; // si realizado es verdadero check si no uncheck

  const LINE = realizado ? "lineThrough" : "";
  textpend.style.display = "none";
  const elemento = `
                        <li id="${id}">
                        <i class="far ${REALIZADO}" data="realizado"></i>
                        <p class="text ${LINE}">${tarea}</p>
                        <i class="fas fa-trash de" data="eliminado" "> </i> 
                        </li>
                     `;

  lista.insertAdjacentHTML("beforeend", elemento);
}

//Cotador de tareas realizadas

function incrementarContador() {
  let cuenta = Number(contadorDiv.textContent);
  cuenta = cuenta + 1;
  contadorDiv.textContent = cuenta;

  console.log("incrementando", contadorDiv.textContent);
}

// funcion de Tarea Realizada

function tareaRealizada(element, id) {
  let elem = element.classList.toggle(check);
  element.classList.toggle(uncheck);

  if (elem) {
    incrementarContador();
    // putData({ check: true }, id);
  } else {
    contadorDiv.innerHTML = Number(contadorDiv.innerHTML) - 1;
    // putData({ check: false }, id);
  }
  putData({ check: elem }, id);

  // element.parentNode.querySelector(".text").classList.toggle("lineThrough");
  // LIST[element.id].realizado = LIST[element.id].realizado ? false : true;
}

async function tareaEliminada(element) {
  // LIST[element.id].eliminado = true;

  let checkbox = element.parentNode.querySelector(".fa-check-circle");

  deleteData(element.parentNode.id);

  if (checkbox) {
    let cuent = Number(contadorDiv.textContent);

    contadorDiv.textContent = cuent - 1;
  }
  let cosa = lista.querySelectorAll("elemento");

  if (cosa.length === 0) {
    textpend.style.display = "block";
  }
  element.parentNode.parentNode.removeChild(element.parentNode);
}

// crear un evento para click en el enter y para habilitar el boton

lista.addEventListener("click", function (event) {
  const element = event.target.parentNode; //<li>
  const elementoI = event.target;
  const elementData = elementoI.attributes.data.value;

  // element.check = elementData;

  if (elementData == "realizado") {
    tareaRealizada(elementoI, element.id);
  } else if (elementData == "eliminado") {
    tareaEliminada(elementoI);
  }

  // localStorage.setItem("TODO", JSON.stringify(LIST));
});

// let data = localStorage.getItem("TODO");
// if (data) {
//   LIST = JSON.parse(data);

//   id = LIST.length;
//   cargarLista(LIST);
// } else {
//   LIST = [];
//   id = 0;
// }
// localStorage.clear();
// function cargarLista(array) {
//   array.forEach(function (item) {
//     agregarTarea(item.nombre, item.id, item.realizado, item.eliminado);
//   });
// }

export { insertarTarea, pulsar };
