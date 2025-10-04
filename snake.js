const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const startBtn = document.getElementById("startBtn");
const scoreDisplay = document.getElementById("scoreDisplay");

let snake, direction, food, gameInterval, score, playing = false;

// Farger
const snakeBodyColor = "#facc15"; // slange kroppen - gul/sandaktig
const snakeHeadColor = "#fff8dc"; // slangehodet - hvit-sandfarge

function resetGame() {
  snake = [{ x: 150, y: 150 }];
  direction = { x: 10, y: 0 };
  food = randomFood();
  score = 0;
  updateScore();
  clearInterval(gameInterval);
  draw();
}

function randomFood() {
  return {
    x: Math.floor(Math.random() * 30) * 10,
    y: Math.floor(Math.random() * 30) * 10,
  };
}

function draw() {
  ctx.fillStyle = "#1e293b";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Mat
  ctx.fillStyle = "#f472b6";
  ctx.fillRect(food.x, food.y, 10, 10);

  // Slange
  snake.forEach((s, index) => {
    ctx.fillStyle = index === 0 ? snakeHeadColor : snakeBodyColor;
    ctx.fillRect(s.x, s.y, 10, 10);
  });
}

function update() {
  const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

  // Kollisjon med vegger eller seg selv
  if (
    head.x < 0 || head.x >= canvas.width ||
    head.y < 0 || head.y >= canvas.height ||
    snake.some(s => s.x === head.x && s.y === head.y)
  ) {
    stopGame();
    return;
  }

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score++;
    updateScore();
    food = randomFood();
  } else {
    snake.pop();
  }

  draw();
}

function updateScore() {
  scoreDisplay.textContent = `Score: ${score}`;
}

function gameLoop() {
  update();
}

function startGame() {
  if (playing) return;
  playing = true;
  startBtn.textContent = "Slutt spillet";
  resetGame();
  gameInterval = setInterval(gameLoop, 100);
  window.addEventListener("keydown", preventScroll, { passive: false });
}

function stopGame() {
  playing = false;
  clearInterval(gameInterval);
  startBtn.textContent = "Start spillet";
  window.removeEventListener("keydown", preventScroll);
}

function preventScroll(e) {
  if (["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"," "].includes(e.key)) {
    e.preventDefault();
  }
}

startBtn.addEventListener("click", () => {
  if (playing) stopGame();
  else startGame();
});

window.addEventListener("keydown", (e) => {
  if (!playing) return;
  switch (e.key) {
    case "ArrowUp": if (direction.y === 0) direction = { x: 0, y: -10 }; break;
    case "ArrowDown": if (direction.y === 0) direction = { x: 0, y: 10 }; break;
    case "ArrowLeft": if (direction.x === 0) direction = { x: -10, y: 0 }; break;
    case "ArrowRight": if (direction.x === 0) direction = { x: 10, y: 0 }; break;
  }
});
