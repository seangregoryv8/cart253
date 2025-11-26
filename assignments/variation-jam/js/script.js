/**
 * Title of Project
 * Author Name
 * 
 * HOW EMBARRASSING! I HAVE NO DESCRIPTION OF MY PROJECT!
 * PLEASE REMOVE A GRADE FROM MY WORK IF IT'S GRADED!
 */

"use strict";

let enemies = []
let WIDTH = 300;
let HEIGHT = 400;

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
    drawPaddle();
    drawBall();

    if (ball.state == ballState.START && keyState.space)
    {
        ball.state = ballState.LAUNCHED;
        ball.directionY = directions.UP;
        ball.directionX = ranInt(0, 1) == 0 ? directions.LEFT : directions.RIGHT;
    }
    for (let enemy of enemies)
    {
        drawEnemy(enemy);
    }

    if (TESTSTOP == 0)
    {
        movePaddle();
        moveBall();
    
        ballPaddleCollision();
    
        ballEnemyCollision();
        ballWallCollision();
    }
    else
    {
        TESTSTOP--;
    }

    if (keyState.escape)
    {
        TESTSTOP++;
    }

    if (ball.invincible > 0)
        ball.invincible--;
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
    rect(enemy.x, enemy.y, enemy.width, enemy.height)
}

let TESTONEENEMY = false;
function drawLevel()
{
    noStroke();
    fill(60);
    for (let x = px(5); x <= WIDTH; x += px(3))
    {
        for (let y = 0; y <= HEIGHT - px(10); y += px(1))
        {
           // if (!TESTONEENEMY)
           if (ranInt(0, 100) > 50)
            {
                enemies.push({
                    health: ranInt(1, 3),
                    maxHealth: ranInt(1, 3),
                    x: x - px(1),
                    y: y,
                    width: px(3),
                    height: px(1)
                })
                //TESTONEENEMY = true;
            }
        }
    }
}

let TESTSTOP = 0;

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
    size: px(1),
    state: ballState.START,
    directionX: "",
    directionY: "",
    speed: 2,
    invincible: 0
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
    width: px(3),
    height: px(1)
}

function ballWallCollision()
{
    if (ball.x <= 0)
    {
        ball.directionX = directions.RIGHT;
    }
    if (ball.x + px(1) >= WIDTH)
    {
        ball.directionX = directions.LEFT;
    }
    if (ball.y <= 0)
    {
        ball.directionY = directions.DOWN;
    }
}

function ballEnemyCollision()
{
    for (let i = 0; i < enemies.length; i++)
    {
        let enemy = enemies[i];
    
        let ballXLeft = ball.x;
        let ballXRight = ball.x + ball.size;
        let ballXHalf = ball.x + (ball.size / 2)
        
        let enemyXLeft = enemy.x;
        let enemyXRight = enemy.x + enemy.width;
        let enemyXHalf = enemy.x + (enemy.width / 2);

        let ballYUp = ball.y;
        let ballYDown = ball.y + ball.size;
        let ballYHalf = ball.y + (ball.size / 2)

        let enemyYUp = enemy.y;
        let enemyYDown = enemy.y + enemy.height;
        let enemyYHalf = enemy.y + (enemy.height / 2);

        let detectionX = ballXRight >= enemyXLeft && ballXLeft <= enemyXRight;
        let detectionY = ballYDown >= enemyYUp && ballYUp <= enemyYDown;

        if (detectionX && detectionY && ball.invincible == 0)
        {
            let cornerR = ballXLeft == enemyXRight;
            let cornerL = ballXRight == enemyXLeft;
            ball.invincible = 5;
            enemy.health--;
            if (cornerR)
            {
                //console.log("HIT FROM RIGHT")
                ball.directionX = directions.RIGHT;
            }
            else if (cornerL)
            {
                //console.log("HIT FROM LEFT")
                ball.directionX = directions.LEFT;
            }
            else
            {
                if (ballYHalf >= enemyYHalf)
                {
                    //console.log("HIT FROM TOP")
                    ball.directionY = directions.DOWN;
                }
                else
                {
                    //console.log("HIT FROM BOTTOM")
                    ball.directionY = directions.UP;
                }
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

function checkTarget(ball, enemy)
{
    let d = dist(ball.x, ball.y, enemy.x, enemy.y);

    let overlap = (d < px(1) / 2 + enemy.size / 2);

    return overlap;
}