const projects = [
  {
    title: "Github User Finder",
    image: "images/image-github-user-finder.png",
    liveLink: "https://lipika1911.github.io/mini-web-projects/github-finder",
    githubLink: "https://github.com/lipika1911/mini-web-projects/tree/main/github-finder"
  },
  {
    title: "Magic Mirror",
    image: "images/image-magic-mirror.png",
    liveLink: "https://lipika1911.github.io/mini-web-projects/magic-mirror",
    githubLink: "https://github.com/lipika1911/mini-web-projects/tree/main/magic-mirror"
  },
  {
    title: "Password Generator",
    image: "images/image-password-generator.png",
    liveLink: "https://lipika1911.github.io/mini-web-projects/password-generator",
    githubLink: "https://github.com/lipika1911/mini-web-projects/tree/main/password-generator"
  },
  {
    title: "Kanban Task Board",
    image: "images/image-kanban-task-board.png",
    liveLink: "https://lipika1911.github.io/mini-web-projects/kanban-task-board",
    githubLink: "https://github.com/lipika1911/mini-web-projects/tree/main/github-finder"
  },
  {
    title: "Space Invaders",
    image: "images/image-space-invaders.png",
    liveLink: "https://lipika1911.github.io/mini-web-projects/space-invaders",
    githubLink: "https://github.com/lipika1911/mini-web-projects/tree/main/space-invaders"
  },
  {
    title: "Mood Tracker",
    image: "images/image-mood-tracker.png",
    liveLink: "https://lipika1911.github.io/mini-web-projects/mood-tracker",
    githubLink: "https://github.com/lipika1911/mini-web-projects/tree/main/mood-tracker"
  },
  {
    title: "Currency Converter",
    image: "images/image-currency-converter.png",
    liveLink: "https://lipika1911.github.io/mini-web-projects/currency-converter",
    githubLink: "https://github.com/lipika1911/mini-web-projects/tree/main/currency-converter"
  },
  {
    title: "Quiz App",
    image: "images/image-quiz-app.png",
    liveLink: "https://lipika1911.github.io/mini-web-projects/quiz-app",
    githubLink: "https://github.com/lipika1911/mini-web-projects/tree/main/quiz-app"
  },
  {
    title: "Expense Tracker",
    image: "images/image-expense-tracker.png",
    liveLink: "https://lipika1911.github.io/mini-web-projects/expense-tracker",
    githubLink: "https://github.com/lipika1911/mini-web-projects/tree/main/expense-tracker"
  },
  {
    title: "Flappy Bird",
    image: "images/image-flappy-bird.png",
    liveLink: "https://lipika1911.github.io/mini-web-projects/flappy-bird",
    githubLink: "https://github.com/lipika1911/mini-web-projects/tree/main/flappy-bird"
  },
  {
    title: "Clock Centre",
    image: "images/image-clocks.png",
    liveLink: "https://lipika1911.github.io/mini-web-projects/clocks",
    githubLink: "https://github.com/lipika1911/mini-web-projects/tree/main/clocks"
  },
  {
    title: "Weather App",
    image: "images/image-weather-app.png",
    liveLink: "https://lipika1911.github.io/mini-web-projects/weather-app",
    githubLink: "https://github.com/lipika1911/mini-web-projects/tree/main/weather-app"
  }
];

const container = document.getElementById("projects-container");

projects.forEach(project => {
  const card = document.createElement("div");
  card.className = "card";

  card.innerHTML = `
    <img src="${project.image}" alt="${project.title} Preview" class="card-img"/>
    <div class="card-content">
      <h2>${project.title}</h2>
      <div class="links">
        <a href="${project.liveLink}" target="_blank">Live Demo <i class="fa-solid fa-square-arrow-up-right"></i></a>
        <a href="${project.githubLink}" target="_blank"><i class="fab fa-github"></i> GitHub</a>
      </div>
    </div>
  `;

  container.appendChild(card);
});
