const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const startBtn = document.getElementById("startBtn");
const scoreDisplay = document.getElementById("scoreDisplay");

let snake, direction, food, gameInterval, score;

function resetGame() {
  snake = [{ x: 150, y: 150 }];
  direction = { x: 10, y: 0 };
  food = randomFood();
  score = 0;
  scoreDisplay.textContent = "Score: 0";
  clearInterval(gameInterval);
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

  // food
  ctx.fillStyle = "#facc15";
  ctx.fillRect(food.x, food.y, 10, 10);

  // snake
  ctx.fillStyle = "#38bdf8";
  snake.forEach((s) => ctx.fillRect(s.x, s.y, 10, 10));
}

function update() {
  const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

  // vegg-kollisjon
  if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
    resetGame();
    return;
  }

  // spiser seg selv
  if (snake.some((s) => s.x === head.x && s.y === head.y)) {
    resetGame();
    return;
  }

  snake.unshift(head);

  // spiser mat
  if (head.x === food.x && head.y === food.y) {
    score++;
    scoreDisplay.textContent = `Score: ${score}`;
    food = randomFood();
  } else {
    snake.pop();
  }

  draw();
}

function gameLoop() {
  update();
}

startBtn.addEventListener("click", () => {
  resetGame();
  gameInterval = setInterval(gameLoop, 100);
});

window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp":
      if (direction.y === 0) direction = { x: 0, y: -10 };
      break;
    case "ArrowDown":
      if (direction.y === 0) direction = { x: 0, y: 10 };
      break;
    case "ArrowLeft":
      if (direction.x === 0) direction = { x: -10, y: 0 };
      break;
    case "ArrowRight":
      if (direction.x === 0) direction = { x: 10, y: 0 };
      break;
  }
});
