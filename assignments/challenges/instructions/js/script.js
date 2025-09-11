/**
 * Instructions Challenge: Field of Dreams
 * Sean Gregory
 * 
 * If you build it, they will come
 * This creates the field of dreams, a proper baseball diamond (hopefully) with birds and a night sky.
 * Its a beautiful thing, really
 */

"use strict";

/**
 * This will set up the dimensions of the canvas
*/
function setup()
{
    createCanvas(800, 400);
}

/**
 * This calls all the functions that will draw all the portions of the assignment
*/
function draw()
{
    drawLand();
    drawSky();
    drawSun();
    drawBird(150, 100);
    drawBird(250, 100);
    drawBird(200, 125);
    drawBird(500, 110);
    drawBird(300, 135);
    drawHouse();
}

function drawLand()
{
    background(0, 225, 0);
}

function drawSky()
{
    fill(0, 0, 255);
    noStroke();
    rect(0, 0, 800, 250);
}

function drawSun()
{
    let radius = 30;
    fill(200, 200, 200)
    circle(radius + 60, radius + 40, radius * 2);
}

function drawBird(x, y)
{
    let size = 25;
    stroke(0);
    noFill();
    arc(x, y, size, size, radians(210), 0);
    arc(x + size, y, size, size, radians(180), radians(-30));
}

function drawLandCreatures()
{

}

function drawHouse()
{
    let x = 500;
    let y = 210;
    let w = 100;
    let h = 100;
    fill(200, 125, 0);
    noStroke();
    rect(x, y, w, h);
    fill(255, 0, 0);
    noStroke();
    triangle(x - 10, y, x + (w / 2), y - (h / 2), x + w + 10, y);
    fill(130, 130, 255);
    rect(x + 60, y + 30, w / 4, h / 4)
    fill(100, 50, 0);
    rect(x + 20, y + 30, w / 3, h - 30)
    rect
}