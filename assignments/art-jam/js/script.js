/**
 * The Pixelated Artist
 * Sean Gregory
 * 
 * This draws the pixelated face, complete with plenty of features!
 * 
 * Controls:
 * - Click on parts of the face to change it
 * - Move the mouse to activate some hidden features
 * - Press spacebar to randomize the entire face
 * - Click on buttons to change skin and hair colour
 * 
 * Uses:
 * p5.js
 * https://p5js.org
 */
/// <reference path="path-to/p5.global-mode.d.ts" />
"use strict";

// default skin colour
let skin = {
    "name": "Light",
    "rgb": [255,205,148]
};

// default hair colour
let hair = {
    "name": "Chestnut",
    "rgb": [150,75,0]
};

let mainCanvas;
let blinkController;

let currentQuadrant = {col: 3, row: 1};
let rows = 3;
let cols = 3;
let quadWidth = WIDTH / cols;
let quadHeight = HEIGHT / rows;

/**
 * This sets up the grid in a 20x20 pixel art style.
*/
function setup()
{
    mainCanvas = createCanvas(WIDTH, HEIGHT);
    // 28x34 grid
    //background(220);
    
    blinkController = new BlinkController();
}

/**
 * This will be drawing the beautiful pixel art!
*/
function draw() {
    drawGrid();
    colorSkin(skin.rgb);
    colorHair(hair.rgb);
    drawOutline();
    drawHair();
    drawMouth();
    drawEars();
    drawEye(6, 15, leftEyeEmotion);
    drawEye(15, 15, rightEyeEmotion);
    drawEyebrows(6, 15);

    const updated = blinkController.update(leftEyeEmotion, rightEyeEmotion);
    leftEyeEmotion = updated.left;
    rightEyeEmotion = updated.right;

    if (!dizzy && frameCount % 400 === 0)
        randomizeEmotions(true, true, false);

    for (let r = 0; r < rows; r++)
        for (let c = 0; c < cols; c++)
            if (mouseOverQuadrant(c, r))
                currentQuadrant = {col: c, row: r};
    
    updateSpin();
}

/**
 * This handles when the mouse is pressed
 */
function mousePressed()
{
    if (!dizzy) handleClick();
}

/**
 * This handles when specifically the spacebar is pressed
 */
function keyPressed()
{
    if (!dizzy && key === ' ') randomizeEmotions();
}

/**
 * It's hidden right now, but this draws a grid that was mainly used as reference for me to get the pixel art right
 */
function drawGrid()
{
    stroke(0);
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
    noStroke();
}

// These functions help with the pixel art drawing
function pixel(s) { return s * 20; }
function locX(x) { return x * 20;}
function locY(y) { return y * 20; }

// This draws a rectangle and its mirrored counterpart
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

// These functions draw the facial outline for the pixel art
function drawOutline()
{
    noStroke();
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

/**
 * These functions draw the facial features for the pixel art
 */
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

/**
 * Colors the hair of the pixel art
 * @param {*} rgb An object containing the RGB values for the hair color
 */
function colorHair(rgb)
{
    fill(rgb[0], rgb[1], rgb[2]);
    rect(locX(8), locY(1), pixel(symmetryX(8)), pixel(symmetryY(14)));
    rect(locX(6), locY(2), pixel(symmetryX(6)), pixel(symmetryY(14.5)));
    symmRectX(5, 3, 3, 5);
    symmRectX(3, 5, 3, 4);
    symmRectX(2, 7, 3, 6);
    symmRectX(2, 13, 2, 2);
    symmRectX(3, 15, 1, 1);
}

/**
 * Colors the skin of the pixel art
 * @param {*} rgb An object containing the RGB values for the skin
 */
function colorSkin(rgb)
{
    fill(rgb[0], rgb[1], rgb[2]);
    rect(locX(8), locY(8), pixel(symmetryX(8)), pixel(symmetryY(5)));
    rect(locX(1), locY(16), pixel(symmetryX(1)), pixel(symmetryY(13.5)));
    symmRectX(6, 9, 2, 21);
    symmRectX(5, 13, 1, 15);
    symmRectX(11, 32, 5, 1);
}

/**
 * This draws the little nubs at the end of the ears
 */
function drawEars()
{
    fill(0);
    symmRectX(2, 18, 1, 1);
    symmRectX(3, 19, 1, 2);
}