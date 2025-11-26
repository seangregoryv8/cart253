"use strict";

let enemies = []
let WIDTH = 300;
let HEIGHT = 400;

let directions = {
    LEFT: "left",
    RIGHT: "right",
    UP: "up",
    DOWN: "down"
}

let ballState = {
    START: "start",
    LAUNCHED: "launched"
}

let paddle = {
    x: WIDTH / 2,
    y: HEIGHT - px(1),
    size: px(5),
    speed: 5
}

let ballStartY = HEIGHT - px(2);
let ball = {
    x: WIDTH / 2 + px(2),
    y: HEIGHT - px(2),
    size: px(1),
    state: ballState.START,
    directionX: "",
    directionY: "",
    speedX: 4,
    speedY: 4,
    velocityX: 0,  // Velocity components for physics
    velocityY: 0,  // Velocity components for physics
    invincible: 0
}

let enemy = {
    health: ranInt(1, 3),
    maxHealth: ranInt(1, 3),
    x: x,
    y: y,
    width: px(3),
    height: px(1)
}

/**
 * Setup game
 */
function setup() {
    createCanvas(WIDTH, HEIGHT);
    background(0);
    drawLevel();
}

/**
 * Main game loop
 */
function draw() {
    drawGrid();
    drawPaddle();
    drawBall();

    if (ball.state == ballState.START && keyState.space) {
        ball.state = ballState.LAUNCHED;
        ball.directionY = directions.UP;
        ball.directionX = ranInt(0, 1) == 0 ? directions.LEFT : directions.RIGHT;
        ball.velocityX = random(2, 4); // Random velocity for the ball
        ball.velocityY = 4; // Initial velocity
    }

    // Draw all enemies (bricks)
    for (let enemy of enemies) {
        drawEnemy(enemy);
    }

    movePaddle();
    moveBall();
    ballPaddleCollision();
    ballEnemyCollision();
    ballWallCollision();

    if (keyState.escape) {
        TESTSTOP++;
    }

    if (ball.invincible > 0) {
        ball.invincible--;
    }
}

/**
 * Draw enemy (brick) based on health
 */
function drawEnemy(enemy) {
    switch (enemy.health) {
        case 1:
            fill(255, 0, 0); // Red for low health
            break;
        case 2:
            fill(0, 255, 0); // Green for mid health
            break;
        case 3:
            fill(0, 0, 255); // Blue for full health
            break;
    }
    rect(enemy.x, enemy.y, enemy.width, enemy.height);
}

/**
 * Draw the level (bricks)
 */
function drawLevel() {
    noStroke();
    fill(60);
    for (let x = px(5); x <= WIDTH; x += px(3))
    {
        for (let y = 0; y <= HEIGHT - px(10); y += px(1))
        {
            if (ranInt(0, 100) > 50)
            {
                enemies.push({
                    health: ranInt(1, 3),
                    maxHealth: ranInt(1, 3),
                    x: x - px(1),
                    y: y,
                    width: px(3),
                    height: px(1)
                });
            }
        }
    }
}

/**
 * Draw the paddle
 */
function drawPaddle()
{
    fill(0);
    rect(paddle.x, paddle.y, paddle.size, px(1), 10);
}

/**
 * Move the ball
 */
function moveBall()
{
    if (ball.state == ballState.LAUNCHED)
    {
        ball.x += ball.velocityX * (ball.directionX == directions.RIGHT ? 1 : -1);
        ball.y += ball.velocityY * (ball.directionY == directions.UP ? -1 : 1);
    }
}

/**
 * Handle ball collision with paddle
 */
function ballPaddleCollision()
{
    if (ball.y + px(1) >= paddle.y && ball.y <= paddle.y + px(1)) {
        if (ball.x + px(1) >= paddle.x && ball.size <= paddle.x + px(5)) {
            ball.directionY = directions.UP;
            ball.velocityY *= 1.05;  // Increase speed after paddle collision
            ball.velocityX += random(-0.5, 0.5);  // Add a little random variation to the ball's x velocity
        }
    }
}

/**
 * Handle ball collision with walls
 */
function ballWallCollision() {
    if (ball.x <= 0)
        ball.directionX = directions.RIGHT;
    if (ball.x + px(1) >= WIDTH)
        ball.directionX = directions.LEFT;
    if (ball.y <= 0)
        ball.directionY = directions.DOWN;
    if (ball.y >= HEIGHT)
    {
        ball.y = ballStartY;
        ball.x = paddle.x + (paddle.size / 2);
        ball.state = ballState.START;
    }
}

/**
 * Handle ball collision with enemies (bricks)
 */
function ballEnemyCollision() {
    for (let i = 0; i < enemies.length; i++) {
        let enemy = enemies[i];

        let ballXLeft = ball.x;
        let ballXRight = ball.x + ball.size;

        let enemyXLeft = enemy.x;
        let enemyXRight = enemy.x + enemy.width;

        let ballYUp = ball.y;
        let ballYDown = ball.y + ball.size;

        let enemyYUp = enemy.y;
        let enemyYDown = enemy.y + enemy.height;

        let detectionX = ballXRight >= enemyXLeft && ballXLeft <= enemyXRight;
        let detectionY = ballYDown >= enemyYUp && ballYUp <= enemyYDown;

        if (detectionX && detectionY && ball.invincible == 0) {
            let cornerR = ballXLeft == enemyXRight;
            let cornerL = ballXRight == enemyXLeft;
            ball.invincible = 5;
            enemy.health--;
            if (enemy.health <= 0) {
                // Remove the enemy from the array when its health reaches 0
                enemies.splice(i, 1);
                i--;  // Adjust the index since we removed an element
            }
            if (cornerR) {
                ball.directionX = directions.RIGHT;
            } else if (cornerL) {
                ball.directionX = directions.LEFT;
            } else {
                if (ball.y + ball.size / 2 >= enemy.y + enemy.height / 2) {
                    ball.directionY = directions.DOWN;
                } else {
                    ball.directionY = directions.UP;
                }
            }
        }
    }
}

/**
 * Move the paddle based on user input
 */
function movePaddle() {
    if (keyState.a && paddle.x >= 0)
    {
        paddle.x -= paddle.speed;
        if (ball.state == ballState.START)
        {
            console.log("HI")
            ball.x -= paddle.speed;
        }
    }
    else if (keyState.d && paddle.x + paddle.size <= WIDTH)
    {
        paddle.x += paddle.speed;
        if (ball.state == ballState.START)
        {
            ball.x += paddle.speed;
        }
    }
}

/**
 * Draw the ball
 */
function drawBall() {
    stroke(0);
    fill(50);
    rect(ball.x, ball.y, px(1), px(1), 20);
}

/**
 * Draw grid for pixel art effect
 */
function drawGrid() {
    stroke(0);
    fill(230);
    for (let x = 0; x <= WIDTH; x += px(1)) {
        rect(x, 0, px(1), px(1));
        for (let y = 0; y <= HEIGHT; y += px(1))
            rect(x, y, px(1), px(1));
    }
    noStroke();
}

function px(s) { return s * 20; }

/**
 * Little function I made to make a random integer
 * @param {*} min 
 * @param {*} max 
 * @returns 
 */
function ranInt(min, max)
{
    return Math.round(random(min, max))
}

function checkTarget(ball, enemy)
{
    let d = dist(ball.x, ball.y, enemy.x, enemy.y);

    let overlap = (d < px(1) / 2 + enemy.size / 2);

    return overlap;
}