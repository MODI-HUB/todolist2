const addTaskForm = document.querySelector(".add-task-form");
const taskInput = document.querySelector("#task-input");
const taskListContainer = document.querySelector("#task-list-container");
const showAllBtn = document.querySelector(".show-all-btn");
const showCompletedBtn = document.querySelector(".show-completed-btn");
const showIncompleteBtn = document.querySelector(".show-incomplete-btn");
const addTaskButton = document.getElementById("add-task-btn");
const deleteAllTasks=document.querySelector(".delete-all-btn");

// let tasks = [{
//   name: "die",
//   completed: false,
//   date: new Date().toLocaleDateString(),
// }];

if (JSON.parse(localStorage.getItem('tasks')) == undefined){
  tasks = []
}
else {
  tasks = JSON.parse(localStorage.getItem('tasks'));
}
localStorage.setItem("tasks",JSON.stringify(tasks))

renderTasks(tasks);

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
  localStorage.setItem("tasks",JSON.stringify(tasks));
  console.log(tasks)
  taskInput.value = "";
  renderTasks(tasks);
}

function renderTasks(tasks) {
  taskListContainer.innerHTML = "";
  tasks.forEach((task, index) => {
    const taskItem = document.createElement("li");
    taskItem.classList.add("task-item");
    taskItem.innerHTML = `
            <span class="task-name" data-index="${index}">${task.name}</span>
            <input class="edit-task">
            <span class="task-date">${task.date}</span>
            <span class="task-completed-date"></span>
            <button class="complete-btn" data-index="${index}">Complete</button>
            <button class="delete-btn" data-index="${index}">Delete</button>
            <button class="edit-btn" data-index=" ${index}" >Edit </button>
            <button class="save" data-index=" ${index}" >Save </button>
        `;
    taskListContainer.appendChild(taskItem);
    if (task.completed) {
      taskItem.style.backgroundColor = "greenyellow";
      

    }
  });

  // updateButtons();
}

taskListContainer.addEventListener("click", (e) => {
  const editBtn = document.querySelector('.edit-btn')
  const editInput = document.querySelector('.edit-task')
  const taskName = document.querySelector('.task-name')
  // const saveBtn = document.querySelector('.save')
  if (e.target.matches(".delete-btn")) {
    const index = e.target.dataset.index;
    tasks.splice(index, 1);
    localStorage.setItem("tasks",JSON.stringify(tasks));
    renderTasks(tasks);
  } else if (e.target.matches(".complete-btn")) {
    const index = e.target.dataset.index;
    tasks[index].completed = true;
    localStorage.setItem("tasks",JSON.stringify(tasks));
    console.log(tasks);
    renderTasks(tasks);
  }
  else if (e.target.matches( ".edit-btn")){
  editInput.style.display = "flex";
  const index = e.target.dataset.index;
  editInput.value = taskName.innerText;
  taskName.style.display = "none";
  }
  else if (e.target.matches( ".save")){
    console.log("clicked")
    let value = editInput.value;
    console.log(value)
    let index = e.target.dataset.index;
    console.log(index)
    // tasks[index].name = value;
    console.log(tasks[index])
    localStorage.setItem("tasks",JSON.stringify(tasks));
    taskName.innerText = value;
    taskName.style.display ="flex"
    editInput.style.display="none"

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

deleteAllTasks.addEventListener("click", () => {
  tasks = [];
  renderTasks(tasks);
  localStorage.clear()
})

const menuContainer = document.getElementById("hamburger-menu-container");
const menu = document.getElementById("menu");

var state = false;
menu.style.transform = "translateX(+160px)";
menuContainer.addEventListener("click", ()=>{
  if (!state){
    menu.style.transform = "translateX(-160px)";
    // menu.style.backgroundColor= "red"
    state = true;
  }
  else {
    menu.style.transform = "translateX(+160px)";
    // menu.style.backgroundColor = "greenyellow"
    state = false;
  }
})

