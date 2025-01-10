document.getElementById("title").addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    document.getElementById("description").focus();
  }
});
document
  .getElementById("description")
  .addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      addTodo();
    }
  });
async function fetchTodos() {
  const res = await fetch("http://localhost:1234/api/todos");
  const data = await res.json();
  const container = document.getElementById("container");
  container.innerHTML = "";
  data.forEach((todo) => {  
    container.appendChild(createTodoElement(todo));
  });
}

function createTodoElement({ title, description, id }) {
  const child = document.createElement("div");
  const titleDiv = document.createElement("div");

  titleDiv.innerHTML = title;
  titleDiv.setAttribute("class", "title-child");
  titleDiv.setAttribute("id", `title-${id}`);

  const descDiv = document.createElement("div");
  descDiv.innerHTML = description;
  descDiv.setAttribute("class", "description-child");
  descDiv.setAttribute("id", `desc-${id}`);

  const doneButton = document.createElement("button");
  doneButton.innerHTML = "Mark as Done";
  doneButton.setAttribute("class", "done-btn");
  doneButton.onclick = () => deleteTodo(id, child);

  const editButton = document.createElement("button");
  editButton.innerHTML = "Edit";
  editButton.setAttribute("class", "edit-button");
  editButton.onclick = () => editTodo(id, title, description);

  child.appendChild(titleDiv);
  child.appendChild(descDiv);
  child.appendChild(doneButton);
  child.appendChild(editButton);
  child.setAttribute("class", "todo");

  child.setAttribute("id", id);

  return child;
}

async function addTodo() {
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  if (!title || !description) {
    alert("Title and Description are required!");
    return;
  }
  await fetch("http://localhost:1234/api/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, description }),
  });

  fetchTodos();
}

async function deleteTodo(todoId, todoElement) {
  const res = await fetch(`http://localhost:1234/api/todos/${todoId}`, {
    method: "DELETE",
  });
  if (res.ok) {
    todoElement.remove();
  } else {
    alert("Failed to delete the todo!");
  }
}

async function editTodo(todoId, currentTitle, currentDescription) {
  const newTitle = prompt("Edit Title", currentTitle);
  const newDescription = prompt("Edit Description", currentDescription);

  if (!newTitle || !newDescription) {
    alert("Title and Description are required!");
    return;
  }

  fetch(`http://localhost:1234/api/todos/${todoId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: newTitle,
      description: newDescription,
    }),
  })
    .then((res) => {
      if (res.ok) {
        document.getElementById(`title-${todoId}`).innerHTML = newTitle;
        document.getElementById(`desc-${todoId}`).innerHTML =
          newDescription;
      } else {
        alert("Failed to update the todo!");
      }
    })
    .catch((err) => console.error(err));
}

fetchTodos();