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

// This is a simple function to detect if the mouse is over a rectangle, using my pixel art detection system
function isMouseOver(x, y, w, h) { return mouseX >= locX(x) && mouseX <= locX(x + w) && mouseY >= locY(y) && mouseY <= locY(y + h); }

// This is a list of feature boxes for the eyes, mouth, eyebrows, and ears, detecting where they are in the portrait
const featureBoxes = {
    leftEye: [6, 15, 7, 7],
    rightEye: [15, 15, 7, 7],
    mouth: [10, 26, 8, 5],
    leftEyebrow: [6, 10, 16, 5],
    leftEar: [1, 18, 3, 4],
    rightEar: [24, 18, 3, 4]
};

// This is a map of features to their corresponding emotion-changing functions
const featureMap = {
    leftEye: () => leftEyeEmotion = random(eyeEmotions),
    rightEye: () => rightEyeEmotion = random(eyeEmotions),
    mouth: () => {
        let newMouth;
        do { newMouth = random(mouthEmotions); } while(newMouth === mouthEmotion);
        mouthEmotion = newMouth;
    },
    leftEyebrow: () => {
        let newBrow;
        do { newBrow = random(browEmotions); } while(newBrow === browEmotion);
        browEmotion = newBrow;
    }
};

// This function detects which feature the mouse is currently over, if any
function detectFeature()
{
    for (let feature in featureBoxes)
    {
        let box = featureBoxes[feature];
        if (isMouseOver(box[0], box[1], box[2], box[3]))
            return feature;
    }
    return null; // mouse is not over any feature
}

/**
 * This will be drawing the beautiful pixel art!
*/
function draw() {
    drawGrid();
    colorSkin(255, 224, 189);
    colorHair(150, 75, 0);
    drawOutline();
    drawHair();
    drawMouth(mouthEmotion);
    drawEars();
    drawEye(6, 15, leftEyeEmotion);
    drawEye(15, 15, rightEyeEmotion);
    drawEyebrows(6, 15);
}

function mousePressed()
{
    for (let feature in featureBoxes)
    {
        let box = featureBoxes[feature];
        if (isMouseOver(box[0], box[1], box[2], box[3]))
        {
            featureMap[feature]();
            break;
        }
    }
}

function randomizeEmotions()
{
    let newBrowEmotion;
    do { newBrowEmotion = random(browEmotions); } while (newBrowEmotion === browEmotion); // This repeats until a new emotion has been selected
    browEmotion = newBrowEmotion;

    let newMouthEmotion;
    do { newMouthEmotion = random(mouthEmotions); } while (newMouthEmotion === mouthEmotion); // This repeats until a new emotion has been selected
    mouthEmotion = newMouthEmotion;
    
    leftEyeEmotion = random(eyeEmotions);
    rightEyeEmotion = random(eyeEmotions);
}

function mouseClick()
{

}

function keyPressed()
{
    if (key === ' ')
    {
        randomizeEmotions();
    }
}

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
 * @param {*} r Red value 
 * @param {*} g Green value
 * @param {*} b Blue value
 */
function colorHair(r, g, b)
{
    fill(r, g, b);
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
 * @param {*} r Red value 
 * @param {*} g Green value
 * @param {*} b Blue value
 */
function colorSkin(r, g, b)
{
    fill(r, g, b);
    rect(locX(8), locY(8), pixel(symmetryX(8)), pixel(symmetryY(5)));
    rect(locX(1), locY(16), pixel(symmetryX(1)), pixel(symmetryY(13.5)));
    symmRectX(6, 9, 2, 21);
    symmRectX(5, 13, 1, 15);
    symmRectX(11, 32, 5, 1);
}

let mouthEmotion;
const mouthEmotions = ["smallSmile", "bigSmile", "frown", "bigFrown", "cat", "surprised"];

/**
 * This draws the mouth of the pixel art, and picks from a variety of emotions
 * @param {*} mouthEmotion 
 */
function drawMouth(mouthEmotion)
{
    fill(0);
    switch (mouthEmotion)
    {
        case "frown":
            symmRectX(11, 28, 1, 1);
            rect(locX(12), locY(27), pixel(symmetryX(12)), pixel(1));
            break;
        case "bigFrown":
            fill(255, 100, 100);
            rect(locX(11), locY(27), pixel(symmetryX(11)), pixel(3));
            fill(255, 192, 203);
            rect(locX(12), locY(29), pixel(symmetryX(12)), pixel(1));
            fill(0);
            symmRectX(10, 27, 1, 4);
            rect(locX(11), locY(30), pixel(symmetryX(11)), pixel(1));
            rect(locX(11), locY(26), pixel(symmetryX(11)), pixel(1));
            break;
        case "cat":
            symmRectX(10, 26, 1, 2);
            symmRectX(11, 28, 2, 1);
            rect(locX(13), locY(27), pixel(symmetryX(13)), pixel(1));
            break;
        case "bigSmile":
            fill(255, 100, 100);
            rect(locX(11), locY(27), pixel(symmetryX(11)), pixel(3));
            fill(255, 192, 203);
            rect(locX(12), locY(29), pixel(symmetryX(12)), pixel(1));
            fill(0);
            symmRectX(10, 26, 1, 4);
            rect(locX(11), locY(30), pixel(symmetryX(11)), pixel(1));
            rect(locX(11), locY(26), pixel(symmetryX(11)), pixel(1));
            break;
        case "surprised":
            fill(255, 100, 100);
            rect(locX(11), locY(26), pixel(symmetryX(11)), pixel(3));
            fill(255, 192, 203);
            rect(locX(12), locY(28), pixel(symmetryX(12)), pixel(1));
            fill(0);
            rect(locX(12), locY(25), pixel(symmetryX(12)), pixel(1));
            symmRectX(11, 26, 1, 3);
            rect(locX(12), locY(29), pixel(symmetryX(12)), pixel(1));
        case "smallSmile":
        default:
            symmRectX(11, 27, 1, 2);
            rect(locX(12), locY(29), pixel(symmetryX(12)), pixel(1));
            break;
    }
}

function drawEars()
{
    fill(0);
    symmRectX(2, 18, 1, 1);
    symmRectX(3, 19, 1, 2);
}

let browEmotion;
const browEmotions = ["normal", "sad", "angry", "surprised"];

function drawEyebrows(x, y)
{
    fill(0);
    switch(browEmotion)
    {
        case "sad":
            symmRectX(x + 1, y - 2, 3, 1);
            symmRectX(x + 2, y - 3, 3, 1);
            break;
        case "angry":
            symmRectX(x + 4, y - 2, 2, 1);
            symmRectX(x + 3, y - 3, 2, 1);
            break;
        case "surprised":
            symmRectX(x, y - 2, 1, 1);
            symmRectX(x + 6, y - 2, 1, 1);
            symmRectX(x + 1, y - 3, 1, 1);
            symmRectX(x + 5, y - 3, 1, 1);
            symmRectX(x + 2, y - 4, 3, 1);
            break;
        case "normal":
        default:
            symmRectX(x, y - 2, 1, 1);
            symmRectX(x + 6, y - 2, 1, 1);
            symmRectX(x + 1, y - 3, 5, 1);
            break;
    }
}

let leftEyeEmotion;
let rightEyeEmotion;

let eyeEmotions = ["regular", "closed", "sadClosed", "sad", "squint", "happy", "dead"];

/**
 * Combines the eye coloring and the eye drawing functions
 * @param {*} x Position x
 * @param {*} y Position y
 */
function drawEye(x, y, eyeEmotion)
{
    switch (eyeEmotion)
    {
        case "closed":
            fill(0);
            rect(locX(x), locY(y + 3), pixel(7), pixel(1));
            break;
        case "sadClosed":
            fill(0);
            rect(locX(x + 1), locY(y + 3), pixel(5), pixel(1));
            fill(150, 150, 255);
            rect(locX(x + 1), locY(y + 4), pixel(5), pixel(1));
            fill(200, 200, 255);
            rect(locX(x + 1), locY(y + 5), pixel(5), pixel(4));
            break;
        case "sad":
            colorEyes(80, x, y);
            fill(0);
            pixel3Circle(x, y);
            rect(locX(x + 2), locY(y + 5), pixel(3), pixel(1));
            fill(150, 150, 255);
            rect(locX(x + 1), locY(y + 6), pixel(5), pixel(1));
            fill(200, 200, 255);
            rect(locX(x + 1), locY(y + 7), pixel(5), pixel(4));
            break;
        case "squint":
            colorEyes(80, x, y);
            fill(0);
            rect(locX(x + 2), locY(y), pixel(3), pixel(1));
            rect(locX(x), locY(y + 2), pixel(1), pixel(3));
            rect(locX(x + 6), locY(y + 2), pixel(1), pixel(3));
            rect(locX(x + 1), locY(y + 1), pixel(1), pixel(1));
            rect(locX(x + 5), locY(y + 1), pixel(1), pixel(1));
            rect(locX(x + 1), locY(y + 5), pixel(1), pixel(1));
            rect(locX(x + 5), locY(y + 5), pixel(1), pixel(1));
            rect(locX(x + 2), locY(y + 5), pixel(3), pixel(1));
            break;
        case "happy":
            fill(0);
            rect(locX(x + 2), locY(y + 1), pixel(3), pixel(1));
            rect(locX(x + 1), locY(y + 2), pixel(1), pixel(3));
            rect(locX(x + 5), locY(y + 2), pixel(1), pixel(3));
            break;
        case "dead":
            fill(0);
            for (let i = 1; i <= 5; i++)
            {
                rect(locX(x + i), locY(y + i), pixel(1), pixel(1));
                rect(locX(x + 6 - i), locY(y + i), pixel(1), pixel(1));
            }
            break;
        case "regular":
        default:
            colorEyes(80, x, y);
            fill(0);
            pixel3Circle(x, y);
            break;
    }
}

// This draws a 3x3 circle for the eyes
function pixel3Circle(x, y)
{
    noStroke();
    rect(locX(x + 2), locY(y), pixel(3), pixel(1));
    rect(locX(x), locY(y + 2), pixel(1), pixel(3));
    rect(locX(x + 2), locY(y + 6), pixel(3), pixel(1));
    rect(locX(x + 6), locY(y + 2), pixel(1), pixel(3));
    rect(locX(x + 1), locY(y + 1), pixel(1), pixel(1));
    rect(locX(x + 5), locY(y + 1), pixel(1), pixel(1));
    rect(locX(x + 1), locY(y + 5), pixel(1), pixel(1));
    rect(locX(x + 5), locY(y + 5), pixel(1), pixel(1));
}

/**
 * Colors the eyes of the pixel art
 * @param {*} r Red value 
 * @param {*} g Green value
 * @param {*} b Blue value
 */
function colorEyes(col, x, y)
{
    fill(col);
    rect(locX(x + 1), locY(y + 1), pixel(5), pixel(5));
    //symmRectX(x + 1, y + 1, 5, 5)
    fill(255);
    rect(locX(x + 4), locY(y + 2), pixel(1), pixel(1));
}