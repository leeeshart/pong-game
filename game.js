const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');

const PADDLE_WIDTH = 15;
const PADDLE_HEIGHT = 100;
const BALL_RADIUS = 10;
const PLAYER_X = 30;
const AI_X = canvas.width - 30 - PADDLE_WIDTH;

let playerY = (canvas.height - PADDLE_HEIGHT) / 2;
let aiY = (canvas.height - PADDLE_HEIGHT) / 2;

let ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    vx: 6 * (Math.random() > 0.5 ? 1 : -1),
    vy: 3 * (Math.random() > 0.5 ? 1 : -1)
};

let playerScore = 0;
let aiScore = 0;

// Mouse controls: move player paddle
canvas.addEventListener('mousemove', function(e) {
    const rect = canvas.getBoundingClientRect();
    let mouseY = e.clientY - rect.top;
    playerY = mouseY - PADDLE_HEIGHT / 2;

    // Clamp paddle position
    playerY = Math.max(0, Math.min(canvas.height - PADDLE_HEIGHT, playerY));
});

function drawRect(x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
}

function drawCircle(x, y, r, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
}

function drawNet() {
    ctx.strokeStyle = "#fff";
    ctx.setLineDash([8, 16]);
    ctx.beginPath();
    ctx.moveTo(canvas.width/2, 0);
    ctx.lineTo(canvas.width/2, canvas.height);
    ctx.stroke();
    ctx.setLineDash([]);
}

function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.vx = 6 * (Math.random() > 0.5 ? 1 : -1);
    ball.vy = 3 * (Math.random() > 0.5 ? 1 : -1);
}

function updateAI() {
    // Simple AI: move toward the ball with some speed limit
    let centerAI = aiY + PADDLE_HEIGHT / 2;
    if (centerAI < ball.y - 10) {
        aiY += 4;
    } else if (centerAI > ball.y + 10) {
        aiY -= 4;
    }
    // Clamp AI paddle position
    aiY = Math.max(0, Math.min(canvas.height - PADDLE_HEIGHT, aiY));
}

function checkCollision(px, py) {
    // px, py are paddle's top-left coordinates
    let paddleTop = py;
    let paddleBottom = py + PADDLE_HEIGHT;
    let paddleLeft = px;
    let paddleRight = px + PADDLE_WIDTH;

    let ballTop = ball.y - BALL_RADIUS;
    let ballBottom = ball.y + BALL_RADIUS;
    let ballLeft = ball.x - BALL_RADIUS;
    let ballRight = ball.x + BALL_RADIUS;

    return (
        ballRight > paddleLeft &&
        ballLeft < paddleRight &&
        ballBottom > paddleTop &&
        ballTop < paddleBottom
    );
}

function update() {
    // Move ball
    ball.x += ball.vx;
    ball.y += ball.vy;

    // Wall collision
    if (ball.y - BALL_RADIUS < 0 || ball.y + BALL_RADIUS > canvas.height) {
        ball.vy *= -1;
    }

    // Player paddle collision
    if (checkCollision(PLAYER_X, playerY)) {
        ball.vx = Math.abs(ball.vx);
        // Adjust ball velocity based on where it hit the paddle
        let hitPoint = (ball.y - (playerY + PADDLE_HEIGHT/2)) / (PADDLE_HEIGHT/2);
        ball.vy += hitPoint * 2;
    }

    // AI paddle collision
    if (checkCollision(AI_X, aiY)) {
        ball.vx = -Math.abs(ball.vx);
        let hitPoint = (ball.y - (aiY + PADDLE_HEIGHT/2)) / (PADDLE_HEIGHT/2);
        ball.vy += hitPoint * 2;
    }

    // Score check
    if (ball.x - BALL_RADIUS < 0) {
        aiScore++;
        document.getElementById('aiScore').textContent = aiScore;
        resetBall();
    }
    if (ball.x + BALL_RADIUS > canvas.width) {
        playerScore++;
        document.getElementById('playerScore').textContent = playerScore;
        resetBall();
    }

    updateAI();
}

function draw() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw net
    drawNet();

    // Draw paddles
    drawRect(PLAYER_X, playerY, PADDLE_WIDTH, PADDLE_HEIGHT, "#0f0");
    drawRect(AI_X, aiY, PADDLE_WIDTH, PADDLE_HEIGHT, "#f00");

    // Draw ball
    drawCircle(ball.x, ball.y, BALL_RADIUS, "#fff");
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

// Initialize scores
document.getElementById('playerScore').textContent = playerScore;
document.getElementById('aiScore').textContent = aiScore;

gameLoop();
