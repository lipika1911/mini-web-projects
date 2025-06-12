const API_BASE_URL = "https://quiz-api-e8lf.onrender.com/api/quiz";

let category = "";
let difficulty = "";
let questions = [];
let currentIndex = 0;
let score = 0;

const categoryScreen = document.getElementById("category-screen");
const difficultyScreen = document.getElementById("difficulty-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

document.querySelectorAll("#category-buttons button").forEach(btn => {
  btn.addEventListener("click", () => {
    category = btn.dataset.category;
    document.getElementById("selected-category-heading").textContent = `Select Difficulty for ${category.toUpperCase()}`;
    showScreen("difficulty");
  });
});

document.querySelectorAll("#difficulty-buttons button").forEach(btn => {
  btn.addEventListener("click", async () => {
    difficulty = btn.dataset.difficulty;
    await fetchQuestions();
    showQuestion();
    showScreen("quiz");
  });
});

function showScreen(screen) {
  categoryScreen.style.display = screen === "category" ? "block" : "none";
  difficultyScreen.style.display = screen === "difficulty" ? "block" : "none";
  quizScreen.style.display = screen === "quiz" ? "block" : "none";
  resultScreen.style.display = screen === "result" ? "block" : "none";
}

async function fetchQuestions() {
  const res = await fetch(`${API_BASE_URL}/${category}/${difficulty}`);
  const data = await res.json();
  questions = shuffleArray(data).slice(0, 10);
  currentIndex = 0;
  score = 0;
}

function showQuestion() {
  const q = questions[currentIndex];
  document.getElementById("question-number").textContent = `Question ${currentIndex + 1} of ${questions.length}`;
  document.getElementById("question-text").textContent = `Q${currentIndex + 1}: ${q.question}`;
  
  const optionsContainer = document.getElementById("options-container");
  optionsContainer.innerHTML = "";

  q.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.classList.add("option-btn");
    btn.onclick = () => selectAnswer(btn, opt, q.answer);
    optionsContainer.appendChild(btn);
  });

  document.getElementById("score-text").textContent = `Score: ${score} / ${currentIndex}`;
}

function selectAnswer(button, selected, correct) {
  const buttons = document.querySelectorAll(".option-btn");
  buttons.forEach(b => b.disabled = true);

  if (selected === correct) {
    button.classList.add("correct");
    score++;
  } else {
    button.classList.add("wrong");
    buttons.forEach(b => {
      if (b.textContent === correct) b.classList.add("correct");
    });
  }

  setTimeout(() => {
    currentIndex++;
    if (currentIndex < questions.length) {
      showQuestion();
    } else {
      showResult();
    }
  }, 1000);
}

function showResult() {
  showScreen("result");
  document.getElementById("result-category").textContent = `Category: ${category.toUpperCase()}`;
  document.getElementById("result-difficulty").textContent = `Difficulty: ${difficulty.toUpperCase()}`;
  document.getElementById("final-score").textContent = `Final Score: ${score} / ${questions.length}`;
}

function startOver() {
  showScreen("category");
}

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

// Initial setup
showScreen("category");
