/**
 * The Pixelated Artist
 * Sean Gregory
 * 
 * This will, for now, draw a pixelated face.
 */
/// <reference path="path-to/p5.global-mode.d.ts" />
"use strict";

const WIDTH = 560;
const HEIGHT = 680;
/**
 * This sets up the grid in a 20x20 pixel art style.
*/
function setup() {
    createCanvas(WIDTH, HEIGHT);
    // 28x34 grid
    background(220);
}

function drawGrid()
{
    fill(230);
    // This is for the grid for the pixel art
    // This is for the vertical lines at 34 pixels
    for (let x = 0; x <= WIDTH; x += 20)
    {
        rect(x, 0, 20, 20);
        // This is for the horizontal lines at 28 pixels
        for (let y = 0; y <= HEIGHT; y += 20)
            rect(x, y, 20, 20);
    }
}

function pixel(s)
{
    return s * 20;
}

function locX(x)
{
    return x * 20;
}

function locY(y)
{
    return y * 20;
}

function drawFace()
{
    // This is for the face
    fill(255, 224, 189);
    rect(locX(10), locY(7), pixel(8), pixel(8));
    // This is for the eyes
    fill(0);
    rect(locX(12), locY(9), pixel(1), pixel(1));
    rect(locX(15), locY(9), pixel(1), pixel(1));
    // This is for the mouth
    fill(255, 0, 0);
    rect(locX(13), locY(12), pixel(2), pixel(1));
}

/**
 * This will be drawing the beautiful pixel art!
*/
function draw() {
    drawGrid();
    drawFace();
}

