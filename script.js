const addTaskForm = document.querySelector(".add-task-form");
const taskInput = document.querySelector("#task-input");
const taskListContainer = document.querySelector("#task-list-container");
const showAllBtn = document.querySelector(".show-all-btn");
const showCompletedBtn = document.querySelector(".show-completed-btn");
const showIncompleteBtn = document.querySelector(".show-incomplete-btn");
const addTaskButton = document.getElementById("add-task-btn");

let tasks = [];

function addTask(e) {
  e.preventDefault();
  if (taskInput.value === "") {
    alert("Please enter a task");
    return;
  }

  const task = {
    name: taskInput.value,
    completed: false,
    date: new Date().toLocaleDateString(),
  };

  tasks.push(task);
  taskInput.value = "";
  renderTasks(tasks);
}

function renderTasks(tasks) {
  taskListContainer.innerHTML = "";
  tasks.forEach((task, index) => {
    const taskItem = document.createElement("li");
    taskItem.classList.add("task-item");
    taskItem.innerHTML = `
            <span class="task-name">${task.name}</span>
            <span class="task-date">${task.date}</span>
            <span class="task-completed-date"></span>
            <button class="complete-btn" data-index="${index}">Complete</button>
            <button class="delete-btn" data-index="${index}">Delete</button>
        `;
    taskListContainer.appendChild(taskItem);
    if (task.completed) {
      taskItem.style.backgroundColor = "greenyellow";
      

    }
  });

  // updateButtons();
}

taskListContainer.addEventListener("click", (e) => {
  if (e.target.matches(".delete-btn")) {
    const index = e.target.dataset.index;
    tasks.splice(index, 1);
    renderTasks(tasks);
  } else if (e.target.matches(".complete-btn")) {
    const index = e.target.dataset.index;
    tasks[index].completed = true;
    renderTasks(tasks);
    // const parent = e.target.parentNode;
    // console.log(parent)
    // const completedDate = parent.children[2];
    // console.log(completedDate)
    // // const completedDate = document.querySelector(".task-completed-date")
    // const currentDate= new Date().toLocaleDateString();
    // console.log(currentDate)
    // completedDate.innerText = currentDate;
  }
});

// function updateButtons() {
//   const completedTasks = tasks.filter((task) => task.completed);
// }

addTaskButton.addEventListener("click", addTask);

showAllBtn.addEventListener("click", () => {
  taskListContainer.innerHTML = "";
  renderTasks(tasks);
});

showCompletedBtn.addEventListener("click", () => {
  const t = tasks.filter((t) => t.completed);
  renderTasks(t);
});

showIncompleteBtn.addEventListener("click", () => {
  const t = tasks.filter((t) => t.completed != true);
  renderTasks(t);
});
