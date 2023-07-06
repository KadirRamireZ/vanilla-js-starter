

// Resto del código del módulo module.js
// ...

// Utiliza las funciones del módulo API.js
async function insertarTarea() {
  // Resto del código de la función insertarTarea
  // ...

  let saveData = await sendPostRequest(nuevaTarea);
  agregarTarea(saveData.nombre, saveData.id, false, false);
}

// Utiliza las funciones del módulo API.js
async function deleteTask(id) {
  // Resto del código de la función deleteTask
  // ...

  await deleteData(id);
}

// Utiliza las funciones del módulo API.js
async function updateTask(task) {
  // Resto del código de la función updateTask
  // ...

  await putData(task);
}

// Resto del código del módulo module.js
// ...

export { insertarTarea, pulsar, deleteTask, updateTask };
