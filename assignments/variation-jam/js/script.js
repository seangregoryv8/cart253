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
    drawGrid();
    drawLevel();
}


/**
 * OOPS I DIDN'T DESCRIBE WHAT MY DRAW DOES!
*/
function draw()
{
    for (let enemy of enemies)
    {
        drawEnemy(enemy);
    }
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
    rect(enemy.x - px(1), enemy.y, px(3), 20)
}
function drawLevel()
{
    noStroke();
    fill(60);
    for (let x = px(1); x <= WIDTH; x += px(3))
    {
        for (let y = 0; y <= HEIGHT - 200; y += px(1))
        {
            if (ranInt(0, 100) > 60)
            {
                enemies.push({
                    health: ranInt(1, 3),
                    maxHealth: ranInt(1, 3),
                    x: x,
                    y: y})
            }
        }
    }
}

let paddle = {
    x: WIDTH / 2,
    y: HEIGHT - 100
}

function drawPaddle()
{
    rect(paddle.x, paddle.y, pixel(5), )
}

function drawBall()
{

}

function drawGrid()
{
    stroke(0);
    fill(230);
    // This is for the grid for the pixel art
    // This is for the vertical lines at 34 pixels
    for (let x = 0; x <= WIDTH; x += 20)
    {
        rect(x, 0, px(1), px(1));
        // This is for the horizontal lines at 28 pixels
        for (let y = 0; y <= HEIGHT; y += 20)
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