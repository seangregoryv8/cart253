/**
 * Title of Project
 * Author Name
 * 
 * HOW EMBARRASSING! I HAVE NO DESCRIPTION OF MY PROJECT!
 * PLEASE REMOVE A GRADE FROM MY WORK IF IT'S GRADED!
 */

"use strict";

let enemies = []
let WIDTH = 600;
let HEIGHT = 1000;

/**
 * OH LOOK I DIDN'T DESCRIBE SETUP!!
*/
function setup() {
    createCanvas(WIDTH, HEIGHT);
    background(0);
    drawLevel();
}


/**
 * OOPS I DIDN'T DESCRIBE WHAT MY DRAW DOES!
*/
function draw()
{
    drawGrid();
    movePaddle();
    drawPaddle();
    drawBall();

    if (ball.state == ballState.START && keyState.space)
    {
        ball.state = ballState.LAUNCHED;
        ball.directionY = directions.UP;
        ball.directionX = ranInt(0, 1) == 0 ? directions.LEFT : directions.RIGHT;
    }

    moveBall();

    ballPaddleCollision();

    for (let enemy of enemies)
    {
        drawEnemy(enemy);
    }
    ballEnemyCollision();
    ballWallCollision();
}

let directions = {
    LEFT: "left",
    RIGHT: "right",
    UP: "up",
    DOWN: "down"
}
/**
 * 
 * @param {enemies} enemy 
 */
function drawEnemy(enemy)
{
    switch (enemy.health)
    {
        case 1:
            fill(255, 0, 0);
            break;
        case 2:
            fill(0, 255, 0);
            break;
        case 3:
            fill(0, 0, 255);
            break;
    }
    rect(enemy.x - px(1), enemy.y, enemy.size, px(1))
}
function drawLevel()
{
    noStroke();
    fill(60);
    for (let x = px(1); x <= WIDTH; x += px(3))
    {
        for (let y = 0; y <= HEIGHT - px(10); y += px(1))
        {
            if (ranInt(0, 100) > 60)
            {
                enemies.push({
                    health: ranInt(1, 3),
                    maxHealth: ranInt(1, 3),
                    x: x,
                    y: y,
                    size: px(3)
                })
            }
        }
    }
}

let ballState = {
    START: "start",
    LAUNCHED: "launched"
}
let paddle = {
    x: WIDTH / 2,
    y: HEIGHT - px(1)
}

let ball = {
    x: WIDTH / 2 + px(2),
    y: HEIGHT - px(2),
    state: ballState.START,
    directionX: "",
    directionY: "",
    speed: 3
}

function drawPaddle()
{
    fill(0);
    rect(paddle.x, paddle.y, px(5), px(1), 10);
}

function moveBall()
{
    if (ball.state == ballState.LAUNCHED)
    {
        if (ball.directionX == directions.LEFT)
        {
            ball.x -= ball.speed;
        }
        if (ball.directionX == directions.RIGHT)
        {
            ball.x += ball.speed;
        }
        if (ball.directionY == directions.UP)
        {
            ball.y -= ball.speed;
        }
        if (ball.directionY == directions.DOWN)
        {
            ball.y += ball.speed;
        }
    }
}

function ballPaddleCollision()
{
    if (ball.y + px(1) >= paddle.y && ball.y <= paddle.y + px(1))
    {
        //if (ball.x + px(1) >= paddle.x && ball.size <= paddle.x + px(5))
        {
            ball.directionY = directions.UP;
        }
    }
}

let enemy = {
    health: ranInt(1, 3),
    maxHealth: ranInt(1, 3),
    x: x,
    y: y,
    size: px(3)
}

function ballWallCollision()
{
    console.log(ball.x);
    if (ball.x <= 0)
    {
        console.log("HI")
        ball.directionX = directions.RIGHT;
    }
    if (ball.x + px(1) >= WIDTH)
    {
        ball.x = WIDTH - px(1);
        ball.directionX = directions.LEFT;
    }
    if (ball.y <= 0)
    {
        ball.y = 0;
        ball.directionY = directions.DOWN;
    }
}

function ballEnemyCollision()
{
    for (let i = 0; i < enemies.length; i++)
    {
        let enemy = enemies[i];
        
        // Check if the ball is within the bounds of the enemy
        if (ball.x + px(1) >= enemy.x && ball.x <= enemy.x + px(3) && ball.y + px(1) >= enemy.y && ball.y <= enemy.y + px(1)) {
            // Ball hits enemy, reduce health
            enemy.health--;

            // Change ball direction based on where it hit the enemy
            if (ball.directionY === directions.UP || ball.directionY === directions.DOWN) {
                ball.directionY = (ball.directionY === directions.UP) ? directions.DOWN : directions.UP;
            } else {
                ball.directionX = (ball.directionX === directions.LEFT) ? directions.RIGHT : directions.LEFT;
            }

            // If the enemy's health is zero, remove the enemy from the game
            if (enemy.health <= 0) {
                enemies.splice(i, 1);
                i--; // Adjust the index since we removed an enemy
            }
        }
    }
}

function movePaddle()
{
    if (keyState.a)
    {
        paddle.x--;
        if (ball.state == ballState.START)
        {
            ball.x--;
        }
    }
    else if (keyState.d)
    {
        paddle.x++;
        if (ball.state == ballState.START)
        {
            ball.x++;
        }
    }
}

function drawBall()
{
    stroke(0);
    fill(50);
    rect(ball.x, ball.y, px(1), px(1), 20)
}

function drawGrid()
{
    stroke(0);
    fill(230);
    // This is for the grid for the pixel art
    // This is for the vertical lines at 34 pixels
    for (let x = 0; x <= WIDTH; x += px(1))
    {
        rect(x, 0, px(1), px(1));
        // This is for the horizontal lines at 28 pixels
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

