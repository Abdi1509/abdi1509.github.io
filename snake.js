// === Snake-spill ===
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const startBtn = document.getElementById("startBtn");
const scoreDisplay = document.getElementById("scoreDisplay");

let snake = [];
let direction = { x: 20, y: 0 };
let food = {};
let gameInterval;
let score = 0;
let playing = false;

// Størrelse på slange/mat
const blockSize = 20;

// Farger
const snakeBodyColor = "#facc15";
const snakeHeadColor = "#d97706";
const foodColor = "#f472b6";

// === Funksjoner ===
function resetGame() {
  snake = [{ x: Math.floor(canvas.width / 2 / blockSize) * blockSize, 
             y: Math.floor(canvas.height / 2 / blockSize) * blockSize }];
  direction = { x: blockSize, y: 0 };
  food = randomFood();
  score = 0;
  updateScore();
  clearInterval(gameInterval);
  draw();
}

function randomFood() {
  const cols = canvas.width / blockSize;
  const rows = canvas.height / blockSize;
  let x, y;
  do {
    x = Math.floor(Math.random() * cols) * blockSize;
    y = Math.floor(Math.random() * rows) * blockSize;
  } while (snake.some(segment => segment.x === x && segment.y === y));
  return { x, y };
}

function draw() {
  // Bakgrunn
  ctx.fillStyle = "#fff8dc";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Mat
  ctx.fillStyle = foodColor;
  ctx.fillRect(food.x, food.y, blockSize, blockSize);

  // Slange
  snake.forEach((segment, index) => {
    ctx.fillStyle = index === 0 ? snakeHeadColor : snakeBodyColor;
    ctx.fillRect(segment.x, segment.y, blockSize, blockSize);
  });
}

function updateScore() {
  scoreDisplay.textContent = `Score: ${score}`;
}

function update() {
  if (!playing) return;

  const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

  // Kollisjon med vegg eller egen kropp
  if (
    head.x < 0 || head.x >= canvas.width ||
    head.y < 0 || head.y >= canvas.height ||
    snake.some(segment => segment.x === head.x && segment.y === head.y)
  ) {
    stopGame();
    return;
  }

  snake.unshift(head);

  // Spis mat
  // Spis mat
    if (head.x === food.x && head.y === food.y) {
    score++;
    updateScore();
    spawnConfetti(food.x, food.y); // <-- konfetti her
    food = randomFood();
    } else {
    snake.pop();
    }


  draw();
}

function gameLoop() {
  update();
}

function startGame() {
  if (playing) return;
  playing = true;
  resetGame();
  startBtn.textContent = startBtn.getAttribute("data-en") || "Stop Game";
  gameInterval = setInterval(gameLoop, 150);
  window.addEventListener("keydown", preventScroll, { passive: false });
}

function stopGame() {
  playing = false;
  clearInterval(gameInterval);
  startBtn.textContent = startBtn.getAttribute("data-no") || "Start spillet";
  window.removeEventListener("keydown", preventScroll);
}

function preventScroll(e) {
  if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(e.key)) e.preventDefault();
}

// Tastaturkontroller
window.addEventListener("keydown", e => {
  if (!playing) return;
  switch (e.key) {
    case "ArrowUp":
      if (direction.y === 0) direction = { x: 0, y: -blockSize };
      break;
    case "ArrowDown":
      if (direction.y === 0) direction = { x: 0, y: blockSize };
      break;
    case "ArrowLeft":
      if (direction.x === 0) direction = { x: -blockSize, y: 0 };
      break;
    case "ArrowRight":
      if (direction.x === 0) direction = { x: blockSize, y: 0 };
      break;
  }
});

// Start-knapp
startBtn.addEventListener("click", () => {
  if (playing) stopGame();
  else startGame();
});

// === Konfetti ===
function spawnConfetti(x, y) {
  for (let i = 0; i < 10; i++) {
    const conf = document.createElement("div");
    conf.className = "confetti";
    conf.style.left = `${canvas.offsetLeft + x + Math.random() * blockSize}px`;
    conf.style.top = `${canvas.offsetTop + y + Math.random() * blockSize}px`;
    conf.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 60%)`;
    document.body.appendChild(conf);
    setTimeout(() => conf.remove(), 1000); // fjerner konfetti etter 1 sekund
  }
}


// Init
resetGame();


// === Språkbytte ===
let currentLang = "no";
const toggleBtn = document.getElementById("lang-toggle");

toggleBtn.addEventListener("click", () => {
  currentLang = currentLang === "no" ? "en" : "no";

  document.querySelectorAll("[data-no]").forEach(el => {
    if (el.id !== "startBtn" && el.id !== "scoreDisplay") {
      el.innerHTML = el.getAttribute(`data-${currentLang}`);
    }
  });

  document.documentElement.lang = currentLang;
});
