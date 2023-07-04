import { insertarTarea, pulsar} from "./module.js";

const input = document.querySelector("#input");
const botonEnter = document.querySelector("#enter");

botonEnter.addEventListener("click", insertarTarea);
input.addEventListener("keypress", pulsar);
