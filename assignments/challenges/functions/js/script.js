/**
 * Bouncy Ball Ball Bonanza
 * Pippin Barr
 * 
 * The starting point for a ball-bouncing experience of
 * epic proportions!
 */

"use strict";

// Our ball
const ball = {
    x: 300,
    y: 20,
    width: 10,
    height: 10,
    velocity: {
        x: 0,
        y: 10
    }
};

// Our paddle
const paddle = {
    x: 300,
    y: 280,
    width: 80,
    height: 10
};

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

    movePaddle(paddle);
    moveBall(ball);

    handleBounce(ball, paddle);

    drawPaddle(paddle);
    drawBall(ball);
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
    if (key === "Shift")
    {
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

}

/**
 * Bounces the provided ball off the provided paddle
 */
function handleBounce(ball, paddle) {

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
    fill("pink");
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
