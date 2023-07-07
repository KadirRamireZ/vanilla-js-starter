async function sendPostRequest(task) {
  try {
    const response = await fetch("http://localhost:3000/api/task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });

    const data = await response.json();
    return data;
  } catch (error) {}
}

async function fetchTaskData() {
  try {
    const response = await fetch("http://localhost:3000/api/task/");
    const data = await response.json();
    return data;
  } catch (error) {}
}

async function deleteData(id) {
  try {
    await fetch(`http://localhost:3000/api/task/${id}`, {
      method: "DELETE",
    });
  } catch (error) {}
}

async function putData(task, id) {
  try {
    const response = await fetch(`http://localhost:3000/api/task/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });

    const data = await response.json();
    return data;
  } catch (error) {}
}

export { sendPostRequest, fetchTaskData, deleteData, putData };
