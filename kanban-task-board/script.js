// === DRAG & DROP SETUP ===
const cards = document.querySelectorAll(".card");
const lists = document.querySelectorAll(".list");

// Attach drag events to all cards
for (const card of cards) {
  card.addEventListener("dragstart", dragStart);
  card.addEventListener("dragend", dragEnd);
}

// Attach drop-related events to all lists
for (const list of lists) {
  list.addEventListener("dragover", dragOver);
  list.addEventListener("dragenter", dragEnter);
  list.addEventListener("dragleave", dragLeave);
  list.addEventListener("drop", dragDrop);
}

// Drag event handlers
function dragStart(e) {
  e.dataTransfer.setData("text/plain", this.id);
}

function dragEnd() {
  console.log("Drag ended");
}

function dragOver(e) {
  e.preventDefault(); // Allow dropping
}

function dragEnter(e) {
  e.preventDefault();
  this.classList.add("over");
}

function dragLeave(e) {
  this.classList.remove("over");
}

function dragDrop(e) {
  const id = e.dataTransfer.getData("text/plain");
  const card = document.getElementById(id);
  this.appendChild(card);
  this.classList.remove("over");
}

// === TASK ADDITION & STORAGE ===

// Load saved tasks on page load
window.addEventListener("DOMContentLoaded", loadTasksFromStorage);

// Handle "+" button click to add a task
document.querySelectorAll(".add-btn").forEach(button => {
  button.addEventListener("click", () => {
    const listId = button.dataset.list;
    const taskText = prompt("Enter task:");
    if (taskText) {
      const cardId = "card" + Date.now();

      const card = document.createElement("div");
      card.className = "card";
      card.id = cardId;
      card.draggable = true;
      card.textContent = taskText;

      // Attach drag events to new card
      card.addEventListener("dragstart", dragStart);
      card.addEventListener("dragend", dragEnd);

      document.getElementById(listId).appendChild(card);
      saveTaskToStorage(listId, cardId, taskText);
    }
  });
});

// Save a task to localStorage
function saveTaskToStorage(listId, cardId, taskText) {
  const tasks = JSON.parse(localStorage.getItem("kanban-tasks") || "{}");
  if (!tasks[listId]) tasks[listId] = [];
  tasks[listId].push({ id: cardId, text: taskText });
  localStorage.setItem("kanban-tasks", JSON.stringify(tasks));
}

// Load tasks from localStorage and render them
function loadTasksFromStorage() {
  const tasks = JSON.parse(localStorage.getItem("kanban-tasks") || "{}");

  for (const listId in tasks) {
    tasks[listId].forEach(({ id, text }) => {
      const card = document.createElement("div");
      card.className = "card";
      card.id = id;
      card.draggable = true;
      card.textContent = text;

      card.addEventListener("dragstart", dragStart);
      card.addEventListener("dragend", dragEnd);

      document.getElementById(listId).appendChild(card);
    });
  }
}
