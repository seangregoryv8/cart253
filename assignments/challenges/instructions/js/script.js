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
    fill(0, 0, 0);
    rect(500, 210, 100, 100);
    triangle(1, 1, 2, 2, 3, 3);
}