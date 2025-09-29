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

/**
 * This will be drawing the beautiful pixel art!
*/
function draw() {
    drawGrid();
    drawOutline();
    drawHair();
    drawSmile();
    drawEars();
    drawEyes();
    //drawExampleFace();
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
    symmRectX(1, 22, 1, 1);
    symmRectX(2, 23, 3, 1);
    symmRectX(4, 22, 1, 5);
    symmRectX(5, 27, 1, 2);
    symmRectX(6, 29, 1, 1);
    symmRectX(7, 30, 1, 1);
    symmRectX(8, 31, 1, 1);
    symmRectX(9, 32, 2, 1);
    rect(locX(11), locY(HEIGHT / 20 - 1), pixel(symmetryX(11)), pixel(1));
}

function drawHair()
{
    fill(0);
    rect(locX(8), locY(7), pixel(symmetryX(8)), pixel(1))
    symmRectX(6, 8, 2, 1);
    symmRectX(5, 9, 1, 4);
    symmRectX(4, 13, 1, 3);
    symmRectX(3, 16, 1, 1);
    symmRectX(2, 15, 1, 1);
}

function drawSmile()
{
    fill(0);
    symmRectX(11, 27, 1, 2);
    rect(locX(12), locY(29), pixel(symmetryX(12)), pixel(1));
}

function drawEars()
{
    fill(0);
    symmRectX(2, 18, 1, 1);
    symmRectX(3, 19, 1, 2);
}

function drawEyes()
{
    pixel3Circle(6, 17);
    pixel3Circle(15, 17);
}

function pixel3Circle(x, y)
{
    rect(locX(x + 2), locY(y), pixel(3), pixel(1));
    rect(locX(x), locY(y + 2), pixel(1), pixel(3));
    rect(locX(x + 2), locY(y + 6), pixel(3), pixel(1));
    rect(locX(x + 6), locY(y + 2), pixel(1), pixel(3));
    rect(locX(x + 1), locY(y + 1), pixel(1), pixel(1));
    rect(locX(x + 5), locY(y + 1), pixel(1), pixel(1));
    rect(locX(x + 1), locY(y + 5), pixel(1), pixel(1));
    rect(locX(x + 5), locY(y + 5), pixel(1), pixel(1));
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