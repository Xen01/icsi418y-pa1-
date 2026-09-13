// Get references to the HTML elements we need.
const form = document.querySelector("#task-form");
const taskInput = document.querySelector("#task-input");
const priorityInput = document.querySelector("#priority");
const taskList = document.querySelector("#task-list");
const errorMessage = document.querySelector("#error-message");

// This array stores all tasks while the page is open.
const tasks = [];

// This function redraws the task list on the page.
function displayTasks() {
  taskList.innerHTML = "";

  tasks.forEach(function (task, index) {
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task");
    taskDiv.classList.add(task.priority);

    if (task.completed) {
      taskDiv.classList.add("completed");
    }

    const nameSpan = document.createElement("span");
    nameSpan.textContent = task.name;
    nameSpan.classList.add("task-name");

    const prioritySpan = document.createElement("span");
    prioritySpan.textContent = task.priority;
    prioritySpan.classList.add("priority", task.priority);

    const completeButton = document.createElement("button");
    completeButton.textContent = task.completed ? "Undo" : "Complete";
    completeButton.addEventListener("click", function () {
      task.completed = !task.completed;
      displayTasks();
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-btn");
    deleteButton.addEventListener("click", function () {
      tasks.splice(index, 1);
      displayTasks();
    });

    taskDiv.appendChild(nameSpan);
    taskDiv.appendChild(prioritySpan);
    taskDiv.appendChild(completeButton);
    taskDiv.appendChild(deleteButton);

    taskList.appendChild(taskDiv);
  });
}

// Listen for the form submit event.
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const taskName = taskInput.value.trim();
  const taskPriority = priorityInput.value;

  if (taskName === "") {
    errorMessage.textContent = "Please enter a task name.";
    return;
  }

  errorMessage.textContent = "";

  const task = {
    name: taskName,
    priority: taskPriority,
    completed: false,
  };

  tasks.push(task);
  taskInput.value = "";
  displayTasks();
});

// Show the initial empty task list when the page loads.
displayTasks();