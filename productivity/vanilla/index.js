// State management
const state = {
  tasks: [],
  currentView: "today",
  showWelcome: true,
};

// DOM elements
const taskInput = document.getElementById("taskInput");
const readyBtn = document.getElementById("readyBtn");
const welcomeModal = document.getElementById("welcomeModal");
const closeModal = document.getElementById("closeModal");
const noThanks = document.getElementById("noThanks");
const letsGo = document.getElementById("letsGo");
const tasksList = document.getElementById("tasksList");
const emptyState = document.querySelector(".empty-state");
const sidebarItems = document.querySelectorAll(".sidebar-item");

// Show welcome modal on load
if (state.showWelcome) {
  welcomeModal.classList.remove("hidden");
}

// Modal handlers
closeModal.addEventListener("click", () => {
  welcomeModal.classList.add("hidden");
  state.showWelcome = false;
});

noThanks.addEventListener("click", () => {
  welcomeModal.classList.add("hidden");
  state.showWelcome = false;
});

letsGo.addEventListener("click", () => {
  welcomeModal.classList.add("hidden");
  state.showWelcome = false;
  alert("Tour feature would be implemented here!");
});

// Sidebar navigation
sidebarItems.forEach((item) => {
  item.addEventListener("click", () => {
    sidebarItems.forEach((i) => i.classList.remove("active"));
    item.classList.add("active");

    const view = item.dataset.view;
    state.currentView = view;
    document.querySelector(".header-title").textContent =
      item.querySelector("span").textContent;
  });
});

// Task input handler
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && taskInput.value.trim()) {
    addTask(taskInput.value.trim());
    taskInput.value = "";
  }
});

readyBtn.addEventListener("click", () => {
  if (taskInput.value.trim()) {
    addTask(taskInput.value.trim());
    taskInput.value = "";
  }
  renderTasks();
});

// Add task function
function addTask(text) {
  const task = {
    id: Date.now(),
    text: text,
    completed: false,
    createdAt: new Date(),
  };
  state.tasks.push(task);
  renderTasks();
}

// Toggle task completion
function toggleTask(id) {
  const task = state.tasks.find((t) => t.id === id);
  if (task) {
    task.completed = !task.completed;
    renderTasks();
  }
}

// Render tasks
function renderTasks() {
  if (state.tasks.length === 0) {
    emptyState.classList.remove("hidden");
    tasksList.classList.add("hidden");
    return;
  }

  emptyState.classList.add("hidden");
  tasksList.classList.remove("hidden");

  tasksList.innerHTML = state.tasks
    .map(
      (task) => `
        <div class="task-item" data-id="${task.id}">
            <div class="task-checkbox ${task.completed ? "completed" : ""}" 
                 onclick="toggleTask(${task.id})">
            </div>
            <div class="task-text ${task.completed ? "completed" : ""}">
                ${task.text}
            </div>
        </div>
    `
    )
    .join("");
}

// Make toggleTask available globally
window.toggleTask = toggleTask;
