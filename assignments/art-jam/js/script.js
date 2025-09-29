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

function pixel(s) { return s * 20; }
function locX(x) { return x * 20;}
function locY(y) { return y * 20; }

function symmRectX(x, y, w, h)
{
    rect(locX(x), locY(y), pixel(w), pixel(h));
    let totalCols = WIDTH / 20; // 28
    let mirrorX = (totalCols - w) - x;
    rect(locX(mirrorX), locY(y), pixel(w), pixel(h));
}
function symmetryX(x)
{
    return (WIDTH / 20) - (x * 2);
}

function symmetryY(y)
{
    return (HEIGHT / 20) - (y * 2);
}
function drawOutline()
{
    fill(0);
    rect(locX(8), 0, pixel(symmetryX(8)), pixel(1))
    symmRectX(6, 1, 1, 1);
    symmRectX(7, 1, 1, 1);
    symmRectX(5, 2, 1, 1);
    symmRectX(4, 3, 1, 2);
    symmRectX(3, 4, 1, 1);
    symmRectX(2, 5, 1, 2);
    symmRectX(1, 7, 1, 9);
    symmRectX(0, 16, 1, 6);
    symmRectX(1, 22, 3, 1);
    symmRectX(3, 21, 1, 5);
    symmRectX(4, 26, 1, 2);
    symmRectX(5, 28, 1, 1);
    symmRectX(6, 29, 1, 1);
    symmRectX(7, 30, 1, 1);
    symmRectX(8, 31, 1, 1);
    symmRectX(9, 32, 2, 1);
    rect(locX(11), locY(HEIGHT / 20 - 1), pixel(symmetryX(11)), pixel(1));
}
function drawExampleFace()
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
    drawOutline();
    //drawExampleFace();
}

