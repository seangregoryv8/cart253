/**
 * Bouncy Ball Ball Bonanza
 * Pippin Barr
 * 
 * The starting point for a ball-bouncing experience of
 * epic proportions!
 */

"use strict";

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomColor() {
    const r = Math.floor(Math.random() * 256); // Random red value (0-255)
    const g = Math.floor(Math.random() * 256); // Random green value (0-255)
    const b = Math.floor(Math.random() * 256); // Random blue value (0-255)
    return `rgb(${r}, ${g}, ${b})`;
}

// Our paddle
const paddle = {
    x: 300,
    y: 280,
    width: 200,
    height: 10
};

let balls = [];

for (let i = 0; i < 5; i++) {
    let ball = {
        x: getRandomInt(200, 400),
        y: getRandomInt(20, 50),
        width: 10,
        height: 10,
        velocity: {
            x: 0,
            y: 10
        },
        acceleration: 0,
        colour: getRandomColor()
    };
    balls.push(ball);
}
/**
 * Create the canvas
*/
function setup() {
    createCanvas(600, 300);
}


/**
 * Move and display the ball and paddle
*/
function draw() {
    background("#87ceeb");

    
    for (let i = 0; i < balls.length; i++)
    {
        moveBall(balls[i]);
        handleBounce(balls[i], paddle);
        drawBall(balls[i]);
    }
    
    movePaddle(paddle);
    drawPaddle(paddle);
}

let keyState = {
    a: false,
    d: false,
    A: false,
    D: false
}

/**
 * Moves the paddle
 */
function movePaddle(paddle)
{
    if (keyState.a || keyState.A)
        if (paddle.x - paddle.width / 2 > 0)
        {
            if (keyState.a) paddle.x -= 1;
            if (keyState.A) paddle.x -= 3;
        }

    if (keyState.d || keyState.D)
        if (paddle.x + paddle.width / 2 < 600)
        {
            if (keyState.d) paddle.x += 1;
            if (keyState.D) paddle.x += 3;
        }
}

/**
 * This handles when specifically the spacebar is pressed
 */
function keyPressed()
{
    if ((keyState.a || keyState.A) && (keyState.d || keyState.D)) return;
    if (key === "Shift")
    {
        if (keyState.a && keyState.d)
        {
            keyState.a = true;
            keyState.d = false;
        }
        if (keyState.a) keyState.A = true;
        if (keyState.d) keyState.D = true;
    }
    else keyState[key] = true;
}

function keyReleased()
{
    if (key === "Shift")
    {
        if (keyState.A)
        {
            keyState.A = false;
            keyState.a = true;
        }
        if (keyState.D)
        {
            keyState.D = false;
            keyState.d = true;
        }
    }
    else keyState[key] = false;
}

/**
 * Moves the ball passed in as a parameter
 */
function moveBall(ball) {
    ball.y -= ball.acceleration;
    ball.acceleration -= 0.2
}

/**
 * Bounces the provided ball off the provided paddle
 */
function handleBounce(ball, paddle) {
    if (checkOverlap(ball, paddle))
    {
        ball.colour = getRandomColor();
        ball.acceleration += 0.2
        ball.acceleration = -ball.acceleration;
    }
}

/**
 * Draws the specified paddle on the canvas
 */
function drawPaddle(paddle) {
    push();
    rectMode(CENTER);
    noStroke();
    fill("pink");
    rect(paddle.x, paddle.y, paddle.width, paddle.height);
    pop();
}

/**
 * Draws the specified ball on the canvas
 */
function drawBall(ball) {
    push();
    rectMode(CENTER);
    noStroke();
    fill(ball.colour);
    rect(ball.x, ball.y, ball.width, ball.height);
    pop();
}

/**
 * Returns true if rectA and rectB overlap, and false otherwise
 * Assumes rectA and rectB have properties x, y, width and height to describe
 * their rectangles, and that rectA and rectB are displayed CENTERED on their
 * x,y coordinates.
 */
function checkOverlap(rectA, rectB) {
  return (rectA.x + rectA.width/2 > rectB.x - rectB.width/2 &&
          rectA.x - rectA.width/2 < rectB.x + rectB.width/2 &&
          rectA.y + rectA.height/2 > rectB.y - rectB.height/2 &&
          rectA.y - rectA.height/2 < rectB.y + rectB.height/2);
}
