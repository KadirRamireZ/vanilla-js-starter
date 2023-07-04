const fecha = document.querySelector("#fecha");
const lista = document.querySelector("#lista");
const elemento = document.querySelector("#elemento");
let input = document.querySelector("#input");
const botonEnter = document.querySelector("#enter");
const contadorDiv = document.querySelector("#contador");
const textpend = document.querySelector("#tareaspendientes");
const check = "fa-check-circle";
const uncheck = "fa-circle";

let LIST;

let id;
const insertarTarea = () => {
  let texto = input.value.trim();
  console.log(texto);
  let valorc = "";

  if (texto != valorc) {
    const tarea = input.value;
    if (tarea) {
      agregarTarea(tarea, id, false, false);

      LIST.push({
        nombre: tarea,
        id: id,
        realizado: false,
        eliminado: false,
      });
      localStorage.setItem("TODO", JSON.stringify(LIST));
      id++;
      input.value = "";
    }
  } else {
    let Modal = document.getElementById("Modal");
    Modal.style.display = "block";
  }
};

function pulsar(e) {
  if (e.keyCode === 13 && !e.shiftKey) {
    e.preventDefault();
    const tarea = input.value.trim();

    if (tarea) {
      agregarTarea(tarea, id, false, false);
      LIST.push({
        nombre: tarea,
        id: id,
        realizado: false,
        eliminado: false,
      });
      localStorage.setItem("TODO", JSON.stringify(LIST));

      input.value = "";
      id++;
      console.log(LIST);
    } else {
      let Modal = document.getElementById("Modal");
      Modal.style.display = "block";
    }
  }
}

let modalCloseButton = document.getElementById("Cerrar");

modalCloseButton.addEventListener("click", () => {
  let modal = document.getElementById("Modal");
  modal.style.display = "none";
});

function agregarTarea(tarea, id, realizado, eliminado) {
  if (eliminado) {
    return;
  } // si existe eliminado es true si no es falso

  const REALIZADO = realizado ? check : uncheck; // si realizado es verdadero check si no uncheck

  const LINE = realizado ? "lineThrough" : "";

  const elemento = `
                        <li id="elemento">
                        <i class="far ${REALIZADO}" data="realizado" id="${id}"></i>
                        <p class="text ${LINE}">${tarea}</p>
                        <i class="fas fa-trash de" data="eliminado" id="${id}"></i> 
                        </li>
                    `;

  lista.insertAdjacentHTML("beforeend", elemento);
  textpend.style.display = "none";
}

//Cotador de tareas realizadas

function incrementarContador() {
  let cuenta = Number(contadorDiv.textContent);
  cuenta = cuenta + 1;
  contadorDiv.textContent = cuenta;
}

// funcion de Tarea Realizada

function tareaRealizada(element) {
  let elem = element.classList.toggle(check);
  element.classList.toggle(uncheck);

  if (elem == true) {
    contadorDiv.innerHTML = Number(contadorDiv.innerHTML) + 1;
  } else {
    contadorDiv.innerHTML = Number(contadorDiv.innerHTML) - 1;
  }

  element.parentNode.querySelector(".text").classList.toggle("lineThrough");
  LIST[element.id].realizado = LIST[element.id].realizado ? false : true;
}

function tareaEliminada(element) {
  element.parentNode.parentNode.removeChild(element.parentNode);
  LIST[element.id].eliminado = true;

  let checkbox = element.parentNode.querySelector(".fa-check-circle");

  if (checkbox) {
    let cuent = Number(contadorDiv.textContent);

    contadorDiv.textContent = cuent - 1;
  }
  let cosa = lista.querySelectorAll("elemento");

  if (cosa.length === 0) {
    textpend.style.display = "block";
  }
}

// crear un evento para click en el enter y para habilitar el boton

lista.addEventListener("click", function (event) {
  const element = event.target;
  const elementData = element.attributes.data.value;

  if (elementData == "realizado") {
    tareaRealizada(element);
  } else if (elementData == "eliminado") {
    tareaEliminada(element);
  }
  localStorage.setItem("TODO", JSON.stringify(LIST));
});

let data = localStorage.getItem("TODO");
if (data) {
  LIST = JSON.parse(data);

  id = LIST.length;
  cargarLista(LIST);
} else {
  LIST = [];
  id = 0;
}
localStorage.clear();
function cargarLista(array) {
  array.forEach(function (item) {
    agregarTarea(item.nombre, item.id, item.realizado, item.eliminado);
  });
}

fetch("http://localhost:3000/api/task", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({}),
})
  .then((response) => response.json())
  .then((data) => {})
  .catch((error) => {});



  

fetch("http://localhost:3000/api/task", {
  method: "DELETE",
})
  .then((response) => {})
  .catch((error) => {});





fetch("http://localhost:3000/api/task", {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({}),
})
  .then((response) => response.json())
  .then((data) => {})
  .catch((error) => {});

export { insertarTarea, pulsar };
