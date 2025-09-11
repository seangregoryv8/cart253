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
    drawBirds();
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

function drawBirds()
{

}

function drawLandCreatures()
{

}

function drawHouses()
{

}