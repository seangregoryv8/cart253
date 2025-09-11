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
    background(0, 0, 255);
}

/**
 * This calls all the functions that will draw all the portions of the assignment
*/
function draw()
{
    noStroke();
    drawSky();
    drawLand();
    drawSun();
    drawBird(150, 100);
    drawBird(250, 100);
    drawBird(200, 125);
    drawBird(500, 110);
    drawBird(300, 135);
    drawGuy(100, 220, 1);
    drawGuy(450, 310, 1);
    drawHouse();
    drawHills();
}

function drawLand()
{
    let w = 1000;
    let h = 225;
    fill(0, 150, 0);
    ellipse(500, 300, w, h);
    fill(0, 175, 0);
    ellipse(0, 300, w, h);
    ellipse(1000, 300, w, h);
    fill(0, 225, 0);
    ellipse(400, 450, 1400, 400)
    //rect(0, 250, 800, 400);
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

function drawGuy(x, y, mult)
{
    fill(ranInt(0, 150), ranInt(0, 150), ranInt(0, 150));
    noStroke();
    arc(x, y, 30 * mult, 75 * mult, radians(180), 0)
    circle(x, y - 45, 25 * mult)
    circle(x - 20, y - 25, 10 * mult)
    circle(x + 20, y - 25, 10 * mult)
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
    fill(ranInt(0, 150), ranInt(0, 150), ranInt(0, 150));
    noStroke();
    triangle(x - 10, y, x + (w / 2), y - (h / 2), x + w + 10, y);
    fill(130, 130, 255);
    rect(x + 60, y + 30, w / 4, h / 4)
    fill(100, 50, 0);
    rect(x + 20, y + 30, w / 3, h - 30)
    rect
}

function ranInt(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}